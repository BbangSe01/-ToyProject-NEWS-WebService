export interface sourceType {
  id: string | null;
  name: string;
}
export interface NewsType {
  author: string | null;
  content: string | null;
  description: string | null;
  publishedAt: string;
  source: sourceType;
  title: string;
  url: string;
  urlToImage: string | null;
}

export type useNewsType = Omit<NewsType, "content" | "source">;
