import axiosInstall from './axiosInstance';

export function create(comment) {
    return axiosInstall.post('front/article/create',comment)
}


export function del(id) {
    return axiosInstall.post('comment/delete?id='+id)
}


export function query(comment) {
    return axiosInstall.post('comment/query',comment)
}

//查询未审核的评论
export function getStatusComment(comment) {
    return axiosInstall.post('comment/getStatusComment',comment)
}

//分页查询未审核的评论
export function getPageCommentId(pageId) {
    return axiosInstall.get('comment/getPageCommentId?pageId='+pageId)
}
//审核通过

export function getupdateStatus(commentId) {
    return axiosInstall.get('comment/getUpdateStatus?commentId='+commentId)
}

export function detail(id) {
    return axiosInstall.post('comment/detail?id='+id)
}