import axiosInstall from './axiosInstance';

export function login(userName, password) {
    return axiosInstall.post('login',{
        userName: userName,
        password:password
    })
}


export function create(user) {
    return axiosInstall.post('user/create',user)
}


export function del(id) {
    return axiosInstall.post('user/delete?id='+id)
}

export function update(user) {
    console.log('user======')
    console.log(user)
    return axiosInstall.post('user/update',user)
}


export function query(user) {
    return axiosInstall.post('user/query',user)
}


export function detail(id) {
    return axiosInstall.post('user/detail',{
        id: id
    })
}