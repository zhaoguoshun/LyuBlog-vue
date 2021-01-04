import axiosInstall from './axiosInstance';

export function getArticle(articleTag) {
    return axiosInstall.post('articleArticleTag/getArticleTag',articleTag)
}
