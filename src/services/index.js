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
    version = "v1"
    constructor(url, params) {
        this.url = this.version + url;
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
    post(payload, url_suffix) {
        url_suffix = url_suffix ? `${url_suffix}/` : ''
        return backend.post(this.url + url_suffix, payload).then(response => {
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
    delete(payload, url_suffix) {
        url_suffix = url_suffix ? `${url_suffix}/` : ''
        return backend.delete(this.url + url_suffix, { data: payload }).then(response => {
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
export const token_service = new BaseService("/auth/")
export const auth_service = new BaseService("/auth/")
export const profile_service = new BaseService("/profile/")
export const movie_service = new BaseService("/movie/")
export const mp_genre_service = new BaseService("/mpgenre/")
export const review_service = new BaseService("/review/")
export const submission_service = new BaseService("/submit/")
export const payment_service = new BaseService("/payment/verify/")
export const review_like_service = new BaseService("/review-like/")
export const recommend_service = new BaseService("/recommend/")
export const watchlist_service = new BaseService("/watchlist/")
export const curation_service = new BaseService("/movie-list/")
export const role_service = new BaseService("/role/")
export const crew_request_service = new BaseService("/crew-member-request/")
export const follow_service = new BaseService("/follow/")
export const my_watchlist_service = new BaseService("/my-watchlist/")
export const my_recommends_service = new BaseService("/my-recommends/")
export const profile_picture_service = new BaseService("/profile-image/")
export const alb_service = new BaseService("/audience-leaderboard/")
export const flb_service = new BaseService("/filmmaker-leaderboard/")
export const contest_service = new BaseService("/contest/")
export const movies_by_service = new BaseService("/movies-by/")
export const genre_service = new BaseService("/genre/")
export const lang_service = new BaseService("/lang/")
export const account_service = new BaseService("/account/")
export const order_service = new BaseService("/order/")
export const package_service = new BaseService("/package/")