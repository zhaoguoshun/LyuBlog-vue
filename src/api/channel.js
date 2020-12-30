import axiosInstall from './axiosInstance';



export function create(channel) {
    return axiosInstall.post('channel/create',channel)
}


export function del(id) {
    return axiosInstall.post('channel/delete?id='+id)
}


export function update(channel) {
    console.log('channel======')
    console.log(channel)
    return axiosInstall.post('channel/update',channel)
}


export function query(channel) {
    return axiosInstall.post('channel/query',channel)
}

export function tree() {
    return axiosInstall.post('channel/tree')
}


export function upload(formData) {
    return axiosInstall.post('uploadFile',formData)
}


export function detail(id) {
    return axiosInstall.post('channel/detail?id='+id,)
}