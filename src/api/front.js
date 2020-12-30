import axiosInstall from './axiosInstance';



export function queryByPos(pos) {
    return axiosInstall.get('front/channel/queryByPos?pos='+pos,)
}

export function get(id) {
    return axiosInstall.get('front/channel/get?id='+id,)
}

export function getNew() {
    return axiosInstall.get('front/article/getByChannelId');
}


export function getPageList(page) {
    return axiosInstall.get('front/article/getByChannelId?page='+page);
}



export function getTop(channelId, top) {
    return axiosInstall.get('front/article/getByChannelId?channelId='+channelId+'&limit='+top);
}



export function getNewBlogTop() {
    return axiosInstall.get('front/article/Top');
}


export function getArticle(id) {
    return axiosInstall.get('front/article/get?id='+id);
}
//猜你喜欢
export function getLikeArticle(id) {
    return axiosInstall.get('front/article/getLikeArticle?id='+id);
}
//点击排行
export function getOlderByArticle() {
    return axiosInstall.get('front/article/getOlderByArticle');
}


export function getChannelArticle(article) {
    return axiosInstall.post('front/channel/getChannelArticle',article);
}

export function getChannelArticlePos(channelId) {
    return axiosInstall.get('front/channel/getChannelArticlePos?channelId='+channelId);
}

export function getNotice(channelId) {
    return axiosInstall.get('front/article/getNotice?channelId='+channelId);
}


//查询文字的评论
export function getCommentArticle(articleId) {
    return axiosInstall.get('front/article/getCommentArticleId?articleId='+articleId)
}


//查询文字的评论
export function getRandomArticle() {
    return axiosInstall.get('front/article/getRandomArticle')
}


//搜索

export function search(article) {
    return axiosInstall.post('front/article/search',article)
}
