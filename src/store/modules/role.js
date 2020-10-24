import Vue from "vue";
import { ROLE_REQUEST, ROLE_SUCCESS, ROLE_ERROR } from "@/store/actions/role";
import { role_service } from "@/services";
import decode_error_message from "@/extras/error"

const state = {
    loading: "",
    error: "",
    last_updated: null,
    roles: JSON.parse(localStorage.getItem("roles")) || [],
};

const getters = {
    getRoles: state => state.roles,
    getState: state => state.loading,
    getError: state => state.error
};

const actions = {
    [ROLE_REQUEST]: (state) => {
        if (!state.loading) {
            state.commit(ROLE_REQUEST);
            role_service.get({}).then(data => {
                state.commit(ROLE_SUCCESS, data.results);
            }).catch(error => {
                state.commit(ROLE_ERROR, decode_error_message(error));
            })
        }
    }
};

const mutations = {
    [ROLE_REQUEST]: state => {
        state.loading = true
    },
    [ROLE_SUCCESS]: (state, roles) => {
        state.loading = false
        state.last_updated = new Date();
        localStorage.setItem("roles", JSON.stringify(roles));
        Vue.set(state, "roles", roles);
    },
    [ROLE_ERROR]: (state, error_msg) => {
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