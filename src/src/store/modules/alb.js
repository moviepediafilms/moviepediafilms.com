/** Audience Leaderboard */
import Vue from "vue";
import {
    REQUEST_,
    SUCCESS_,
    ERROR_,
} from "@/store/actions";
import { alb_service } from "@/services";
import { Promise } from "core-js";
const state = {
    loading: false,
    users: JSON.parse(localStorage.getItem("alb_users")) || [],
    count: JSON.parse(localStorage.getItem("alb_count")) || 0,
    last_updated: null,
};

const getters = {

};

const actions = {
    [REQUEST_]: ({ commit, }, params) => {
        return new Promise((resolve, reject) => {
            if (!state.loading) {
                commit(REQUEST_);
                alb_service.get({ offset: params.offset, limit: params.limit }).then(data => {
                    commit(SUCCESS_, data);
                    resolve(data.results)
                }).catch(error => {
                    commit(ERROR_, error);
                    reject(error)
                })
            } else {
                reject({ details: "Leaderboard fetch already in progress" })
            }
        })
    },

};

const mutations = {

    [REQUEST_]: state => {
        state.loading = true
    },
    [SUCCESS_]: (state, data) => {
        state.last_updated = new Date();

        localStorage.setItem("alb_users", JSON.stringify(data.results));
        Vue.set(state, "users", data.results);

        localStorage.setItem("alb_count", JSON.stringify(data.count));
        Vue.set(state, "count", data.count);
        state.loading = false
    },
    [ERROR_]: state => {
        state.loading = false
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};