import Vue from "vue";
import { REQUEST_, SUCCESS_, ERROR_ } from "@/store/actions";
import decode_error_message from "@/extras/error"
import { lang_service } from "@/services"

const state = {
    loading: "",
    error: "",
    last_updated: null,
    langs: JSON.parse(localStorage.getItem("langs")) || [],
};

const getters = {
    getLangs: state => state.langs,
    getState: state => state.loading,
    getError: state => state.error
};

const actions = {
    [REQUEST_]: (state) => {
        return new Promise((resolve, reject) => {
            if (!state.loading) {
                state.commit(REQUEST_);
                lang_service.get({}).then(data => {
                    state.commit(SUCCESS_, data.results);
                    resolve(data.results)
                }).catch(error => {
                    state.commit(ERROR_, decode_error_message(error));
                    resolve(error)
                })
            } else {
                reject({ detail: "Language fetch already in progress" })
            }
        })
    }
};

const mutations = {
    [REQUEST_]: state => {
        state.loading = true
    },
    [SUCCESS_]: (state, langs) => {
        state.loading = false
        state.last_updated = new Date();
        localStorage.setItem("langs", JSON.stringify(langs));
        Vue.set(state, "langs", langs);
    },
    [ERROR_]: (state, error_msg) => {
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