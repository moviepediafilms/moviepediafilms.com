import Vue from "vue";
import {
    REQUEST_,
    SUCCESS_,
    ERROR_,
    LOGOUT_
} from "@/store/actions";
import { follow_service } from "@/services";
import { Promise } from "core-js";
const state = {
    loading: false,
    followers: JSON.parse(localStorage.getItem("followers")) || [],
    following: JSON.parse(localStorage.getItem("following")) || [],
    last_updated: null,
};

const getters = {

};

const actions = {
    [REQUEST_]: ({ commit, }, { profile_id, type }) => {

        return new Promise((resolve, reject) => {
            if (!profile_id)
                reject(new Error("Invalid Profile ID"))
            else {
                commit(REQUEST_);
                follow_service.get({}, `${profile_id}/${type}`).then(data => {
                    if (type === "followers")
                        commit(SUCCESS_, { followers: data.results });
                    else
                        commit(SUCCESS_, { following: data.results });
                    resolve(data.results)
                }).catch(error => {
                    commit(ERROR_, error);
                    reject(error)
                })
            }
        })
    },

};

const mutations = {
    [LOGOUT_]: state => {
        state.loading = false
        state.followers = [];
        state.following = [];
        state.last_updated = null;
        localStorage.removeItem("followers");
        localStorage.removeItem("following");
    },
    [REQUEST_]: state => {
        state.loading = true
    },
    [SUCCESS_]: (state, data) => {
        state.last_updated = new Date();
        if (data.followers) {
            localStorage.setItem("followers", JSON.stringify(data.followers));
            Vue.set(state, "followers", data.followers);
        }
        if (data.following) {
            localStorage.setItem("following", JSON.stringify(data.following));
            Vue.set(state, "following", data.following);
        }
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