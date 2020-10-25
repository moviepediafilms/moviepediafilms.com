import Vue from "vue";
import {
    AUTH_LOGOUT,
    PROFILE_REQUEST,
    PROFILE_ERROR,
    PROFILE_SUCCESS,
    FOLLOW_PROFILE,
    UNFOLLOW_PROFILE,
    FOLLOW_DONE
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
    [PROFILE_REQUEST]: ({ commit, dispatch }, id) => {
        return new Promise((resolve, reject) => {
            commit(PROFILE_REQUEST);
            profile_service.get({}, id)
                .then(profile => {
                    commit(PROFILE_SUCCESS, profile);
                    resolve(profile)
                })
                .catch((error) => {
                    commit(PROFILE_ERROR, error);
                    // if resp is unauthorized, logout, to
                    dispatch(`auth/${AUTH_LOGOUT}`, null, { root: true });
                    reject(error)
                });
        })
    },
    [FOLLOW_PROFILE]: ({ commit }, profile) => {
        return new Promise((resolve, reject) => {
            follow_service
                .patch({ follow: true }, profile.profile_id)
                .then((data) => {
                    console.log(data);
                    commit(FOLLOW_DONE, data.follows)
                    resolve(data)
                })
                .catch((error) => {
                    console.log(error)
                    reject(error)
                });
        })

    },
    [UNFOLLOW_PROFILE]: ({ commit }, profile) => {
        return new Promise((resolve, reject) => {
            follow_service
                .patch({ follow: false }, profile.profile_id)
                .then((data) => {
                    console.log(data);
                    commit(FOLLOW_DONE, data.follows)
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
    [PROFILE_REQUEST]: state => {
        state.loading = true;
    },
    [PROFILE_SUCCESS]: (state, profile) => {
        state.loading = false;
        state.error = "";
        localStorage.setItem("profile", JSON.stringify(profile));
        Vue.set(state, "profile", profile);
    },
    [PROFILE_ERROR]: (state, error) => {
        state.loading = false;
        state.error = error;
    },
    [AUTH_LOGOUT]: state => {
        state.profile = {};
        localStorage.removeItem("profile");
    },
    [FOLLOW_DONE]: (state, follows) => {
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