import axiosInstance from "./axiosInstance"

const apikey = import.meta.env.VITE_NEWS_API_KEY

export const getHeadLineData = () => {
    try {
        const res = axiosInstance.get(`top-headlines?country=us&pageSize=10&category=business&apikey=${apikey}`)
        console.log('res:',res);
    } catch(err) {
        console.error(err);
    }
    
}