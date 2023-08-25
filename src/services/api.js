import { Http } from "./Http";
import { getBaseEndpointUrl } from "./config";


/* Banner*/
export const bannerList = (query, page, limit, sortby, order) => {
    const baseUrl = getBaseEndpointUrl();
    return Http.get(baseUrl + "/home/?query=" + query + "&page=" + page + "&limit=" + limit + "&sortby=" + sortby + "&order=" + order, Http.getAuthToken());
};
/* Product*/
export const productList = (query, page, limit, sortby, order) => {
    const baseUrl = getBaseEndpointUrl();
    return Http.get(baseUrl + "/home/products/?query=" + query + "&page=" + page + "&limit=" + limit + "&sortby=" + sortby + "&order=" + order, Http.getAuthToken());
};
/* Category*/
export const categoryList = (query, page, limit, sortby, order) => {
    const baseUrl = getBaseEndpointUrl();
    return Http.get(baseUrl + "/home/category/?query=" + query + "&page=" + page + "&limit=" + limit + "&sortby=" + sortby + "&order=" + order, Http.getAuthToken());
};
/* cardList*/
export const cardList = (query, page, limit, sortby, order) => {
    const baseUrl = getBaseEndpointUrl();
    return Http.get(baseUrl + "/home/cards/?query=" + query + "&page=" + page + "&limit=" + limit + "&sortby=" + sortby + "&order=" + order, Http.getAuthToken());
};

