export interface sourceType {
    id?: string,
    name: string
}
export interface NewsType {
    author?: string,
    content?: string,
    description?: string,
    publishedAt: string,
    source: sourceType,
    title: string,
    url: string,
    urlToImage?: string
}