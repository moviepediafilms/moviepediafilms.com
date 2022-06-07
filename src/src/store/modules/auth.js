import {
    REQUEST_,
    ERROR_,
    SUCCESS_,
    LOGOUT_,
    PROFILE_REQUEST,
    PROFILE_LOGOUT,
    LIST_REQUEST,
    ROLE_REQUEST,
    LIST_LOGOUT,
    FOLLOW_LOGOUT,

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
    [REQUEST_]: ({ commit, dispatch }, payload, ) => {
        return new Promise((resolve, reject) => {
            commit(REQUEST_);
            var service = undefined
            if (payload.id_token)
                service = "google"
            token_service.post(payload, service)
                .then(data => {
                    backend.defaults.headers.common['Authorization'] = `Token ${data.token}`
                    commit(SUCCESS_, data.token);
                    dispatch(PROFILE_REQUEST, data.user_id, { root: true });
                    dispatch(LIST_REQUEST, data.user_id, { root: true });
                    dispatch(ROLE_REQUEST, null, { root: true });
                    resolve(data);
                })
                .catch(err => {
                    console.log(err)
                    commit(ERROR_, err);
                    reject(err);
                });
        });
    },
    [LOGOUT_]: ({ commit }) => {
        return new Promise(resolve => {
            commit(LOGOUT_);
            commit(PROFILE_LOGOUT, null, { root: true });
            commit(LIST_LOGOUT, null, { root: true });
            commit(FOLLOW_LOGOUT, null, { root: true });
            delete backend.defaults.headers.common['Authorization']
            window.location.reload();
            resolve();
        });
    }
};

const mutations = {
    [REQUEST_]: state => {
        state.loading = true;
    },
    [SUCCESS_]: (state, token) => {
        state.loading = false;
        state.error = null;
        state.token = token;
        localStorage.setItem("auth_token", token);
    },
    [ERROR_]: (state, error) => {
        state.loading = false;
        state.error = error;
        state.token = "";
        localStorage.removeItem("auth_token");
    },
    [LOGOUT_]: state => {
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