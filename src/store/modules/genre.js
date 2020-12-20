import Vue from "vue";
import { REQUEST_, SUCCESS_, ERROR_ } from "@/store/actions";
import decode_error_message from "@/extras/error"
import { genre_service } from "@/services"

const state = {
    loading: "",
    error: "",
    last_updated: null,
    genres: JSON.parse(localStorage.getItem("genres")) || [{
            "id": 7,
            "name": "Animation"
        },
        {
            "id": 2,
            "name": "Crime"
        },
        {
            "id": 6,
            "name": "Documentary"
        },
        {
            "id": 1,
            "name": "Drama"
        },
        {
            "id": 13,
            "name": "Experimental"
        },
        {
            "id": 16,
            "name": "Fantasy"
        },
        {
            "id": 4,
            "name": "Horror"
        },
        {
            "id": 11,
            "name": "Musical"
        },
        {
            "id": 12,
            "name": "Mystery"
        },
        {
            "id": 8,
            "name": "Noir"
        },
        {
            "id": 17,
            "name": "Others"
        },
        {
            "id": 10,
            "name": "Psychological Thriller"
        },
        {
            "id": 9,
            "name": "Romance"
        },
        {
            "id": 5,
            "name": "Science Fiction"
        },
        {
            "id": 15,
            "name": "Silent"
        },
        {
            "id": 14,
            "name": "Sports"
        },
        {
            "id": 3,
            "name": "Thriller"
        }
    ],
};

const getters = {
    getGenres: state => state.genres,
    getState: state => state.loading,
    getError: state => state.error
};

const actions = {
    [REQUEST_]: (state) => {
        return new Promise((resolve, reject) => {
            if (!state.loading) {
                state.commit(REQUEST_);
                genre_service.get({}).then(data => {
                    state.commit(SUCCESS_, data.results);
                    resolve(data.results)
                }).catch(error => {
                    state.commit(ERROR_, decode_error_message(error));
                    resolve(error)
                })
            } else {
                reject({ detail: "Genres fetch already in progress" })
            }
        })
    }
};

const mutations = {
    [REQUEST_]: state => {
        state.loading = true
    },
    [SUCCESS_]: (state, roles) => {
        state.loading = false
        state.last_updated = new Date();
        localStorage.setItem("genres", JSON.stringify(roles));
        Vue.set(state, "genres", roles);
    },
    [ERROR_]: (state, error_msg) => {
        state.loading = false
        state.error = error_msg
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};