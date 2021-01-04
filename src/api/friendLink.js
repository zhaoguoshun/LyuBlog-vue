import axiosInstall from './axiosInstance';



export function create(friendLink) {
    return axiosInstall.post('friendLink/create',friendLink)
}


export function del(id) {
    return axiosInstall.post('friendLink/delete?id='+id)
}


export function update(friendLink) {
    console.log('friendLink======')
    console.log(friendLink)
    return axiosInstall.post('friendLink/update',friendLink)
}


export function query(friendLink) {
    return axiosInstall.post('friendLink/query',friendLink)
}


export function getListLink() {
    return axiosInstall.get('friendLink/getListLink')
}


export function tree() {
    return axiosInstall.post('friendLink/tree')
}


export function upload(formData) {
    return axiosInstall.post('uploadFile',formData)
}


export function detail(id) {
    return axiosInstall.post('friendLink/detail?id='+id,)
}