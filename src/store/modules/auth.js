import {
    AUTH_REQUEST,
    AUTH_ERROR,
    AUTH_SUCCESS,
    AUTH_LOGOUT
} from "@/store/actions/auth";
import { PROFILE_REQUEST } from "@/store/actions/profile";
import { LIST_REQUEST } from "@/store/actions/list";
import { backend, token_service } from "@/services";
const state = {
    token: localStorage.getItem("token") || "",
    status: "",
    hasLoadedOnce: false
};

const getters = {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status
};

const actions = {
    [AUTH_REQUEST]: ({ commit, dispatch }, payload) => {

        return new Promise((resolve, reject) => {
            commit(AUTH_REQUEST);
            token_service.post(payload)
                .then(data => {
                    localStorage.setItem("token", data.token);
                    backend.defaults.headers.common['Authorization'] = `Token ${data.token}`
                    commit(AUTH_SUCCESS, data.token);
                    dispatch(PROFILE_REQUEST, data.user_id);
                    dispatch(LIST_REQUEST, data.user_id);
                    resolve(data);
                })
                .catch(err => {
                    commit(AUTH_ERROR, err);
                    localStorage.removeItem("token");
                    reject(err);
                });
        });
    },
    [AUTH_LOGOUT]: ({ commit }) => {
        console.log("AUTH_LOGOUT triggered")
        return new Promise(resolve => {
            commit(AUTH_LOGOUT);
            delete backend.defaults.headers.common['Authorization']
            localStorage.removeItem("token");
            resolve();
        });
    }
};

const mutations = {
    [AUTH_REQUEST]: state => {
        state.status = "loading";
    },
    [AUTH_SUCCESS]: (state, token) => {
        state.status = "success";
        state.token = token;
        state.hasLoadedOnce = true;
    },
    [AUTH_ERROR]: state => {
        state.status = "error";
        state.hasLoadedOnce = true;
    },
    [AUTH_LOGOUT]: state => {
        state.token = "";
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};