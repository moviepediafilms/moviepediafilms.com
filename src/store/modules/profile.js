import Vue from "vue";
import {
    AUTH_LOGOUT,
    PROFILE_REQUEST,
    PROFILE_ERROR,
    PROFILE_SUCCESS
} from "@/store/actions";
import { profile_service } from "@/services";

const state = {
    loading: false,
    error: "",
    profile: JSON.parse(localStorage.getItem("profile")) || {}
};

const getters = {

};

const actions = {
    [PROFILE_REQUEST]: ({ commit, dispatch }, id) => {
        commit(PROFILE_REQUEST);
        profile_service.get({}, id)
            .then(profile => {
                commit(PROFILE_SUCCESS, profile);
            })
            .catch((error) => {
                commit(PROFILE_ERROR, error);
                // if resp is unauthorized, logout, to
                dispatch(`auth/${AUTH_LOGOUT}`, null, { root: true });
            });
    }
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
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};