import Vue from "vue";
import {
    LOGOUT_,
    REQUEST_,
    SUCCESS_,
    CREATE_,
    DELETE_,
    ERROR_,
    LIST_TOGGLE_MOVIE_REQUEST_,
    LIST_TOGGLE_MOVIE_SUCCESS_,
    LIST_TOGGLE_MOVIE_ERROR_
} from "@/store/actions";
import { curation_service } from "@/services";
import { Promise } from "core-js";
const state = {
    loading: "",
    my_lists: JSON.parse(localStorage.getItem("my_lists")) || [],
};

const getters = {

};

const actions = {
    [REQUEST_]: ({ commit, }, user_id) => {
        return new Promise((resolve, reject) => {
            if (!state.loading) {
                commit(REQUEST_);
                curation_service.get({ owner__id: user_id }).then(data => {
                    commit(SUCCESS_, data.results);
                    resolve(data.results)
                }).catch(error => {
                    commit(ERROR_, error);
                    reject(error)
                })
            } else {
                reject({ details: "Movie List fetch already in progress" })
            }
        })
    },
    [CREATE_]: ({ commit }, new_list_data) => {
        return new Promise((resolve, reject) => {
            curation_service
                .post(new_list_data)
                .then((new_list) => {
                    commit(CREATE_, new_list);
                    resolve(new_list)
                })
                .catch((error) => {
                    reject(error)
                });
        })
    },
    [DELETE_]: ({ commit }, list) => {
        return new Promise((resolve, reject) => {
            curation_service
                .delete(list.id)
                .then(() => {
                    commit(DELETE_, list);
                    resolve()
                })
                .catch((error) => {
                    reject(error)
                });
        })
    },
    [LIST_TOGGLE_MOVIE_REQUEST_]: ({ commit }, { list, movie_id }) => {
        return new Promise((resolve, reject) => {
            commit(LIST_TOGGLE_MOVIE_REQUEST_);
            var movies = [...list.movies]
            var idx = movies.indexOf(movie_id)
            if (idx == -1)
                movies.push(movie_id)
            else {
                movies.splice(idx, 1)
            }
            curation_service.patch({ movies: movies }, list.id).then(data => {
                commit(LIST_TOGGLE_MOVIE_SUCCESS_, data)
                resolve(data)
            }).catch(error => {
                commit(LIST_TOGGLE_MOVIE_ERROR_, error)
                reject(error)
            })
        })

    }
};

const mutations = {
    [LOGOUT_]: state => {
        state.my_lists = [];
        localStorage.removeItem("my_lists");
    },
    [REQUEST_]: state => {
        state.loading = true
    },
    [SUCCESS_]: (state, my_lists) => {
        state.loading = false
        state.lists_last_updated = new Date();
        localStorage.setItem("my_lists", JSON.stringify(my_lists));
        Vue.set(state, "my_lists", my_lists);
    },
    [ERROR_]: state => {
        state.loading = false
    },
    [CREATE_]: (state, new_list) => {
        state.my_lists.push(new_list)
        localStorage.setItem("my_lists", JSON.stringify(state.my_lists));
    },
    [DELETE_]: (state, del_list) => {
        var index = -1
        state.my_lists.forEach((list, i) => {
            if (list.id == del_list.id) {
                index = i
            }
        });
        if (index != -1)
            state.my_lists.splice(index, 1)
        localStorage.setItem("my_lists", JSON.stringify(state.my_lists));
    },
    [LIST_TOGGLE_MOVIE_REQUEST_]: state => {
        state.loading = true
    },
    [LIST_TOGGLE_MOVIE_SUCCESS_]: (state, updated_list) => {
        console.log("movie_list update", updated_list)
        var index = -1
        state.my_lists.forEach((list, i) => {
            if (list.id == updated_list.id) {
                index = i
            }
        });
        if (index != -1)
            Vue.set(state.my_lists, index, updated_list)
        else
            state.my_lists.push(updated_list)
        state.loading = false
    },
    [LIST_TOGGLE_MOVIE_ERROR_]: state => {
        state.loading = false
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};