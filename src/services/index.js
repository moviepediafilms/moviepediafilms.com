import axios from 'axios';
import store from "@/store"
import { AUTH_LOGOUT } from "@/store/actions";

const token = localStorage.getItem('auth_token') || ''
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
    _handle_token_error(error) {
        if (error && error.response && error.response.status == 401 && error.response.data.detail == "Invalid token.") {
            // clear authorization and reload
            store.dispatch(AUTH_LOGOUT);
            console.log("Logged out")
            window.location.reload()
        }
    }
    get(params, url_suffix) {
        var all_params = {...params, ...this.params }
        url_suffix = url_suffix ? `${url_suffix}/` : ''
        return backend.get(this.url + url_suffix, { params: all_params }).then(response => {
            return Promise.resolve(response.data)
        }).catch(error => {
            this._handle_token_error(error)
            return Promise.reject(error)
        })
    }
    post(payload) {
        return backend.post(this.url, payload).then(response => {
            return Promise.resolve(response.data)
        }).catch(error => {
            this._handle_token_error(error)
            return Promise.reject(error)
        })
    }
    put(payload, url_suffix) {
        url_suffix = url_suffix ? `${url_suffix}/` : ''
        return backend.put(this.url + url_suffix, payload).then(response => {
            return Promise.resolve(response.data)
        }).catch(error => {
            this._handle_token_error(error)
            return Promise.reject(error)
        })
    }
    patch(payload, url_suffix) {
        url_suffix = url_suffix ? `${url_suffix}/` : ''
        return backend.patch(this.url + url_suffix, payload).then(response => {
            return Promise.resolve(response.data)
        }).catch(error => {
            this._handle_token_error(error)
            return Promise.reject(error)
        })
    }
    delete(url_suffix) {
        url_suffix = url_suffix ? `${url_suffix}/` : ''
        return backend.delete(this.url + url_suffix).then(response => {
            return Promise.resolve(response.data)
        }).catch(error => {
            this._handle_token_error(error)
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
export const review_like_service = new BaseService("v1/review-like/")
export const recommend_service = new BaseService("v1/recommend/")
export const watchlist_service = new BaseService("v1/watchlist/")
export const list_service = new BaseService("v1/movie-list/")
export const role_service = new BaseService("v1/role/")
export const crew_request_service = new BaseService("v1/crew-member-request/")
export const follow_service = new BaseService("v1/follow/")
export const my_watchlist_service = new BaseService("v1/my-watchlist/")
export const my_recommends_service = new BaseService("v1/my-recommends/")
export const profile_picture_service = new BaseService("v1/profile-image/")
export const alb_service = new BaseService("v1/audience-leaderboard/")
export const flb_service = new BaseService("v1/filmmaker-leaderboard/")
export const contest_service = new BaseService("v1/contest/")
export const movies_by_service = new BaseService("v1/movies-by/")