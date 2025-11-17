import { searchNewsData } from "../apis/NewsApis";
import dayjs from "dayjs";
import type { SearchType, NewsType } from "../types";
import { useSearchDataStore } from "../stores/searchData";

export const getSearchData = async ({ keyword, sortBy }: SearchType) => {
  const searchStore = useSearchDataStore();
  console.log(keyword, sortBy);
  let results = await searchNewsData({
    keyword,
    sortBy,
  });
  results = results.map((x: NewsType) => {
    const formattedDate = dayjs(x.publishedAt).format("YYYY-MM-DD");
    return {
      ...x,
      publishedAt: formattedDate,
    };
  });
  searchStore.setSearchData(results);
};
