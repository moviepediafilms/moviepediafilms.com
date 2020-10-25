import Vue from "vue";
import {
    AUTH_LOGOUT,
    LOGOUT_,
    REQUEST_,
    ERROR_,
    SUCCESS_,
    PROFILE_FOLLOW_,
    PROFILE_UNFOLLOW_,
    PROFILE_FOLLOW_DONE_
} from "@/store/actions";
import { profile_service, follow_service } from "@/services";

const state = {
    loading: false,
    error: "",
    profile: JSON.parse(localStorage.getItem("profile")) || {}
};

const getters = {

};

const actions = {
    [REQUEST_]: ({ commit, dispatch }, id) => {
        return new Promise((resolve, reject) => {
            commit(REQUEST_);
            profile_service.get({}, id)
                .then(profile => {
                    commit(SUCCESS_, profile);
                    resolve(profile)
                })
                .catch((error) => {
                    commit(ERROR_, error);
                    // if resp is unauthorized, logout, to
                    dispatch(AUTH_LOGOUT, null, { root: true });
                    reject(error)
                });
        })
    },
    [PROFILE_FOLLOW_]: ({ commit }, profile) => {
        return new Promise((resolve, reject) => {
            follow_service
                .patch({ follow: true }, profile.profile_id)
                .then((data) => {
                    console.log(data);
                    commit(PROFILE_FOLLOW_DONE_, data.follows)
                    resolve(data)
                })
                .catch((error) => {
                    console.log(error)
                    reject(error)
                });
        })

    },
    [PROFILE_UNFOLLOW_]: ({ commit }, profile) => {
        return new Promise((resolve, reject) => {
            follow_service
                .patch({ follow: false }, profile.profile_id)
                .then((data) => {
                    console.log(data);
                    commit(PROFILE_FOLLOW_DONE_, data.follows)
                    resolve(data)
                })
                .catch((error) => {
                    console.log(error);
                    reject(error)
                });
        })
    },

};

const mutations = {
    [REQUEST_]: state => {
        state.loading = true;
    },
    [SUCCESS_]: (state, profile) => {
        state.loading = false;
        state.error = "";
        localStorage.setItem("profile", JSON.stringify(profile));
        Vue.set(state, "profile", profile);
    },
    [ERROR_]: (state, error) => {
        state.loading = false;
        state.error = error;
    },
    [LOGOUT_]: state => {
        state.profile = {};
        localStorage.removeItem("profile");
    },
    [PROFILE_FOLLOW_DONE_]: (state, follows) => {
        Vue.set(state.profile, "follows", follows)
        localStorage.setItem("profile", JSON.stringify(state.profile));
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};