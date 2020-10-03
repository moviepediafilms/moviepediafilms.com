import axios from 'axios';

const token = localStorage.getItem('token') || ''
var headers = {}
if (token) {
    headers['Authorization'] = `Token ${token}`
}

console.log(process.env.VUE_APP_BASE_API_ENDPOINT, "found")

export const backend = axios.create({
    baseURL: process.env.VUE_APP_BASE_API_ENDPOINT,
    headers: headers
})

class BaseService {
    url = undefined
    constructor(url, params) {
        this.url = url;
        this.params = params || {}
    }
    get(params) {
        var all_params = { ...params, ...this.params }
        return backend.get(this.url, { params: all_params }).then(response => {
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

// Third party services
export const location_service = new BaseService("https://revgeocode.search.hereapi.com/v1/revgeocode",
    { apiKey: 'pZa6ldSpU0FJnLGoiOxvPockZxZRQRbiLoKvc0Bl5xw' })

// App backend
export const token_service = new BaseService("v1/auth/")
export const profile_service = new BaseService("v1/profile/")
export const movie_service = new BaseService("v1/movie/")
export const submission_service = new BaseService("v1/submit/")