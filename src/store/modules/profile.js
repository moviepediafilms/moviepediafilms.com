import Vue from "vue";
import { PROFILE_REQUEST, PROFILE_ERROR, PROFILE_SUCCESS } from "@/store/actions/profile";
import { profile_service } from "@/services";
import { AUTH_LOGOUT } from "@/store/actions/auth";

const state = { status: "", profile: JSON.parse(localStorage.getItem("profile")) };

const getters = {
    getProfile: state => state.profile,
    isProfileLoaded: state => !!state.profile.name
};

const actions = {
    [PROFILE_REQUEST]: ({ commit, dispatch }, id) => {
        commit(PROFILE_REQUEST);
        profile_service.get({}, id)
            .then(profile => {
                commit(PROFILE_SUCCESS, profile);
            })
            .catch(() => {
                commit(PROFILE_ERROR);
                // if resp is unauthorized, logout, to
                dispatch(AUTH_LOGOUT);
            });
    }
};

const mutations = {
    [PROFILE_REQUEST]: state => {
        state.status = "loading";
    },
    [PROFILE_SUCCESS]: (state, profile) => {
        state.status = "success";
        localStorage.setItem("profile", JSON.stringify(profile));
        Vue.set(state, "profile", profile);
    },
    [PROFILE_ERROR]: state => {
        state.status = "error";
    },
    [AUTH_LOGOUT]: state => {
        state.profile = undefined;
        localStorage.removeItem("profile");
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};