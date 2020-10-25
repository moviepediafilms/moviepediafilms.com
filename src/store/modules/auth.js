import {
    AUTH_REQUEST,
    AUTH_ERROR,
    AUTH_SUCCESS,
    AUTH_LOGOUT,
    PROFILE_REQUEST,
    LIST_REQUEST
} from "@/store/actions";
import { backend, token_service } from "@/services";
const state = {
    token: localStorage.getItem("auth_token") || "",
    loading: false,
    error: null,
};

const getters = {
    is_authenticated: state => !!state.token
};

const actions = {
    [AUTH_REQUEST]: ({ commit, dispatch }, payload, ) => {
        return new Promise((resolve, reject) => {
            commit(AUTH_REQUEST);
            token_service.post(payload)
                .then(data => {
                    backend.defaults.headers.common['Authorization'] = `Token ${data.token}`
                    commit(AUTH_SUCCESS, data.token);
                    dispatch(`profile/${PROFILE_REQUEST}`, data.user_id, { root: true });
                    dispatch(`list/${LIST_REQUEST}`, data.user_id, { root: true });
                    resolve(data);
                })
                .catch(err => {
                    console.log(err)
                    commit(AUTH_ERROR, err);
                    reject(err);
                });
        });
    },
    [AUTH_LOGOUT]: ({ commit }) => {
        console.log("AUTH_LOGOUT triggered")
        return new Promise(resolve => {
            commit(AUTH_LOGOUT);
            commit(`profile/${AUTH_LOGOUT}`, null, { root: true });
            commit(`list/${AUTH_LOGOUT}`, null, { root: true });
            delete backend.defaults.headers.common['Authorization']
            window.location.reload();
            resolve();
        });
    }
};

const mutations = {
    [AUTH_REQUEST]: state => {
        state.loading = true;
    },
    [AUTH_SUCCESS]: (state, token) => {
        state.loading = false;
        state.error = null;
        state.token = token;
        localStorage.setItem("auth_token", token);
    },
    [AUTH_ERROR]: (state, error) => {
        state.loading = false;
        state.error = error;
        state.token = "";
        localStorage.removeItem("auth_token");
    },
    [AUTH_LOGOUT]: state => {
        state.token = "";
        localStorage.removeItem("auth_token");
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};