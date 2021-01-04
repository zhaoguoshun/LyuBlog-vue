let token={
    set(token){
        localStorage.setItem('token',token)
    },

    get(){
       return localStorage.getItem('token')
    },

    setUser(user){
        localStorage.setItem('user',JSON.stringify(user))
    },

    getUser(){
        if (localStorage.getItem('user')){
            return JSON.parse(localStorage.getItem('user'))
        }

    },
    clear(){
        localStorage.removeItem('token')
        localStorage.removeItem('user')
    }
}

export default token