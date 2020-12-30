import axiosInstall from './axiosInstance';

export function create(article) {
    return axiosInstall.post('article/create',article)
}


export function del(id) {
    return axiosInstall.post('article/delete?id='+id)
}


export function update(article) {
    console.log('article======')
    console.log(article)
    return axiosInstall.post('article/update',article)
}


export function query(article) {
    return axiosInstall.post('article/query',article)
}


export function upload(formData) {
    return axiosInstall.post('uploadFile',formData)
}



export function detail(id) {
    return axiosInstall.post('article/detail?id='+id)
}