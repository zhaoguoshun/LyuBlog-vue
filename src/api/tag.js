import axiosInstall from './axiosInstance';

export function create(tag) {
    return axiosInstall.post('tag/create',tag)
}


export function del(id) {
    return axiosInstall.post('tag/delete?id='+id)
}


export function update(tag) {
    console.log('tag======')
    console.log(tag)
    return axiosInstall.post('tag/update',tag)
}


export function query(tag) {
    return axiosInstall.post('tag/query',tag)
}


export function getArticle(articleTag) {
    return axiosInstall.post('articleArticleTag/getArticleTag',articleTag)
}

export function all(tag) {
    return axiosInstall.post('/front/article/all',tag)
}

export function detail(id) {
    return axiosInstall.post('tag/detail',{
        id: id
    })
}