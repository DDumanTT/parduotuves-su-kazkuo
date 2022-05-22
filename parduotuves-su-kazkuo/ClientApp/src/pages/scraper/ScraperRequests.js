import { axiosAuth } from "../../api/axios";

const scraperPath = '/scraper';
export const getScrapers = () => axiosAuth.get(scraperPath);
export const deleteScraper = (id) => axiosAuth.delete(`${scraperPath}}/${id}`);
export const getUser = id => axiosAuth.get(`${scraperPath}/${id}`);
// TODO implement by scraper
export const createScraper = (
    path,
    frequecny,
    shopId
) => {
    return axiosAuth.post(`${scraperPath}`, {
        path,
        frequecny,
        shopId
    });
};
