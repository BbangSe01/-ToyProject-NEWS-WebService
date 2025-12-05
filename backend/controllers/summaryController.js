const puppeteer = require("puppeteer-extra"); // Puppeteer 확장 기능 로드
const StealthPlugin = require("puppeteer-extra-plugin-stealth"); // 봇 감지 회피 플러그인
const { Readability } = require("@mozilla/readability"); // 기사 본문 추출
const { JSDOM } = require("jsdom"); // Node.js 환경에서 DOM 객체 생성(readability 사용 시 필요)
const askToGemini = require("../utils/askToGemini");

// stealthPlugin을 적용하여 봇 감지 방지
puppeteer.use(StealthPlugin());

// return summary news
// POST /summary
const summaryNews = async (req, res) => {
  let browser;
  try {
    // --- puppeteer : 기사의 HTML 긁어오기 ---
    const { newsUrl } = req.body;
    browser = await puppeteer.launch({ headless: "new" });

    // 새 Chromium 인스턴스 실행
    const page = await browser.newPage();

    // page.goto를 통해 url을 탐색하여 메인 프레임을 생성하고 초기화 하는 타이밍에 stealthPlugin이 스크립트를 주입하게 되면
    // Error: Requesting main frame too early 에러가 생김. 이를 방지하기 위해 stealthPlugin의 비동기 작업이 끝날 시간을 벌어주기 위한 코드
    await new Promise((resolve) => setTimeout(resolve, 50));

    await page.goto(newsUrl, {
      waitUntil: "domcontentloaded",
      timeout: 10000,
    });
    // 브라우저 뷰포트 설정 (봇처럼 보이지 않도록)
    await page.setViewport({ width: 1280, height: 720 });

    //쿠키/개인정보 보호 배너 처리 (가장 범용적인 XPath 기반)
    // *xPath란 XML/HTML 문서의 특정 부분이나 노드를 탐색하고 선택하기 위한 언어
    const cookieAcceptXPaths = [
      "//button[contains(text(), 'Accept') or contains(text(), 'Agree') or contains(text(), '동의') or contains(text(), '수락')]",
      "//a[contains(text(), 'Accept') or contains(text(), 'Agree') or contains(text(), '동의') or contains(text(), '수락')]",
    ];

    const selectors = cookieAcceptXPaths.map((xpath) =>
      page.waitForSelector(`xpath/${xpath}`, { timeout: 1000 })
    );

    try {
      const buttonHandle = await Promise.race(selectors);
      if (buttonHandle) {
        await buttonHandle.click();
        console.log(`쿠키 버튼 클릭 처리 완료.`);
      }
    } catch (e) {
      console.log(`[SKIP] 버튼 찾기 실패`);
    }

    // --- Readability로 본문(HTML) 구조화 및 추출 ---
    const htmlContent = await page.content();

    // JSDOM을 사용하여 HTML 문자열을 DOM 환경으로 변환 (Readability 요구 사항)
    const doc = new JSDOM(htmlContent, { url: newsUrl });

    // Readability 인스턴스 생성 및 파싱
    const reader = new Readability(doc.window.document);
    const article = reader.parse();

    // --- 5. Readability 실패 시 대체 로직 추가 (성공률 향상) ---
    if (!article) {
      console.warn("Readability 실패! 휴리스틱 대체 분석 시작...");
      const fallbackContentHtml = await page.evaluate(() => {
        let maxTextLength = 0;
        let longestElementHtml = "";
        // 기사 본문일 가능성이 높은 태그 순회, 태그 선택 시 그 내부 태그의 글자수까지 따지므로
        // 제일 길다면 본문 전체일 확률이 매우 높음
        document
          .querySelectorAll('p, div[class*="article"], div[class*="content"]')
          .forEach((element) => {
            const text = element.textContent.trim();
            if (text.length > 200 && text.length > maxTextLength) {
              maxTextLength = text.length;
              longestElementHtml = text;
            }
          });
        return longestElementHtml;
      });

      if (fallbackContentHtml) {
        console.log("휴리스틱 대체 분석 성공!");
        // 대체 콘텐츠로 Readability 객체 구조를 모방
        article = {
          title: await page.title(),
          content: fallbackContentHtml,
          textContent: fallbackContentHtml,
        };
      }
    }

    if (article) {
      // ai 요약 결과값 받아오기
      const summarizedNews = await askToGemini(article.textContent);

      return res.status(200).json({
        success: true,
        content: summarizedNews.candidates[0].content.parts[0].text,
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "본문 추출에 최종적으로 실패했습니다.",
      });
    }
  } catch (error) {
    console.error("크롤링/분석 중 심각한 오류 발생:", error.message);
    return res.status(500).json({
      success: false,
      code: "SERVER_ERROR",
      message: error.message,
    });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};

module.exports = summaryNews;
