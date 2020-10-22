import Vue from "vue";
import { LIST_REQUEST, LIST_SUCCESS, LIST_ERROR, TOGGLE_MOVIE_IN_LIST_REQUEST, TOGGLE_MOVIE_IN_LIST_SUCCESS, TOGGLE_MOVIE_IN_LIST_ERROR } from "@/store/actions/list";
import { list_service } from "@/services";
import { AUTH_LOGOUT } from "@/store/actions/auth";
const state = {
    loading: "",
    my_lists: JSON.parse(localStorage.getItem("my_lists")),
};

const getters = {
    getMyLists: state => state.my_lists
};

const actions = {
    [LIST_REQUEST]: ({ commit, }, user_id) => {
        if (!state.loading) {
            commit(LIST_REQUEST);
            list_service.get({ owner__id: user_id }).then(data => {
                commit(LIST_SUCCESS, data.results);
            }).catch(error => {
                commit(LIST_ERROR, error);
            })
        }
    },
    [TOGGLE_MOVIE_IN_LIST_REQUEST]: ({ commit }, { list, movie_id }) => {
        console.log("adding movie in a list requested", list, movie_id)
        if (!state.loading) {
            commit(TOGGLE_MOVIE_IN_LIST_REQUEST);
            var movies = [...list.movies]
            var idx = movies.indexOf(movie_id)
            if (idx == -1)
                movies.push(movie_id)
            else {
                movies.splice(idx, 1)
            }
            console.log("new movies", movies)
            list_service.patch({ movies: movies }, list.id).then(data => {
                commit(TOGGLE_MOVIE_IN_LIST_SUCCESS, data)
            }).catch(error => {
                commit(TOGGLE_MOVIE_IN_LIST_ERROR, error)
            })
        }
    }
};

const mutations = {
    [AUTH_LOGOUT]: state => {
        state.my_lists = undefined;
        localStorage.removeItem("my_lists");
    },
    [LIST_REQUEST]: state => {
        state.loading = true
    },
    [LIST_SUCCESS]: (state, my_lists) => {
        state.loading = false
        state.lists_last_updated = new Date();
        localStorage.setItem("my_lists", JSON.stringify(my_lists));
        Vue.set(state, "my_lists", my_lists);
    },
    [LIST_ERROR]: state => {
        state.loading = false
    },

    [TOGGLE_MOVIE_IN_LIST_REQUEST]: state => {
        state.loading = true
    },
    [TOGGLE_MOVIE_IN_LIST_SUCCESS]: (state, updated_list) => {
        console.log("adding movie in a list")
        state.loading = false
        var index = -1
        state.my_lists.forEach((list, i) => {
            if (list.id == updated_list.id) {
                index = i
            }
        });
        if (index != -1)
            Vue.set(state.my_lists, index, updated_list)

    },
    [TOGGLE_MOVIE_IN_LIST_ERROR]: state => {
        state.loading = false
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};