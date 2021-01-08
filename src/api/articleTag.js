import axiosInstall from './axiosInstance';

export function getArticle(articleTag) {
    return axiosInstall.post('front/article/getArticleTag',articleTag)
}
