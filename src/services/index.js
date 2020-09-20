import axios from 'axios';

const token = localStorage.getItem('token') || ''
var headers = {}
if (token) {
    headers['Authorization'] = `Token ${token}`
}

export const backend = axios.create({
    baseURL: process.env.BASE_API_ENDPOINT,
    headers: headers
})

class BaseService {
    url = undefined
    constructor(url) {
        this.url = url;
    }
    get(params) {
        return backend.get(this.url, { params: params }).then(response => {
            return Promise.resolve(response.data)
        }).catch(error => {
            return Promise.reject(error)
        })
    }
    post(payload) {
        return backend.post(this.url, payload).then(response => {
            return Promise.resolve(response.data)
        }).catch(error => {
            return Promise.reject(error)
        })
    }
    put(payload) {
        return backend.post(this.url, payload).then(response => {
            return Promise.resolve(response.data)
        }).catch(error => {
            return Promise.reject(error)
        })
    }
    delete() {
        return backend.delete(this.url).then(response => {
            return Promise.resolve(response.data)
        }).catch(error => {
            return Promise.reject(error)
        })
    }
}

export const token_service = new BaseService("/api/auth/")
export const profile_service = new BaseService("/api/profile/")