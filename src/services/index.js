import axios from 'axios';

const token = localStorage.getItem('token') || ''
var headers = {}
if (token) {
    headers['Authorization'] = `Token ${token}`
}

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
    get(params, url_suffix) {
        var all_params = {...params, ...this.params }
        url_suffix = url_suffix ? `${url_suffix}/` : ''
        return backend.get(this.url + url_suffix, { params: all_params }).then(response => {
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
    put(payload, url_suffix) {
        url_suffix = url_suffix ? `${url_suffix}/` : ''
        return backend.put(this.url + url_suffix, payload).then(response => {
            return Promise.resolve(response.data)
        }).catch(error => {
            return Promise.reject(error)
        })
    }
    patch(payload, url_suffix) {
        url_suffix = url_suffix ? `${url_suffix}/` : ''
        return backend.patch(this.url + url_suffix, payload).then(response => {
            return Promise.resolve(response.data)
        }).catch(error => {
            return Promise.reject(error)
        })
    }
    delete(url_suffix) {
        url_suffix = url_suffix ? `${url_suffix}/` : ''
        return backend.delete(this.url + url_suffix).then(response => {
            return Promise.resolve(response.data)
        }).catch(error => {
            return Promise.reject(error)
        })
    }
}

// Third party services
export const location_service = new BaseService("https://revgeocode.search.hereapi.com/v1/revgeocode", { apiKey: 'pZa6ldSpU0FJnLGoiOxvPockZxZRQRbiLoKvc0Bl5xw' })

// App backend
export const token_service = new BaseService("v1/auth/")
export const profile_service = new BaseService("v1/profile/")
export const movie_service = new BaseService("v1/movie/")
export const review_service = new BaseService("v1/review/")
export const submission_service = new BaseService("v1/submit/")
export const payment_service = new BaseService("v1/payment/verify/")