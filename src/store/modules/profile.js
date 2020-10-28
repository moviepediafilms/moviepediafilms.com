import Vue from "vue";
import {
    AUTH_LOGOUT,
    LOGOUT_,
    REQUEST_,
    ERROR_,
    SUCCESS_,
    PROFILE_FOLLOW_,
    PROFILE_UNFOLLOW_,
    PROFILE_FOLLOW_DONE_,
    PROFILE_WATCHLIST_REQUEST_,
    PROFILE_RECOMMENDS_REQUEST_,
    PROFILE_TOGGLE_WATCHLIST_,
    PROFILE_TOGGLE_RECOMMEND_,
    PROFILE_IMAGE_UPDATE_
} from "@/store/actions";
import {
    profile_service,
    profile_picture_service,
    follow_service,
    my_watchlist_service,
    my_recommends_service,
    watchlist_service,
    recommend_service
} from "@/services";

const state = {
    loading: false,
    error: "",
    watchlist: JSON.parse(localStorage.getItem("watchlist")) || [],
    recommends: JSON.parse(localStorage.getItem("recommends")) || [],
    profile: JSON.parse(localStorage.getItem("profile")) || {}
};

const getters = {

};

const actions = {
    [REQUEST_]: ({ commit, dispatch }, id) => {
        return new Promise((resolve, reject) => {
            commit(REQUEST_);
            profile_service.get({}, id)
                .then(profile => {
                    commit(SUCCESS_, profile);
                    resolve(profile)
                })
                .catch((error) => {
                    commit(ERROR_, error);
                    // if resp is unauthorized, logout, to
                    dispatch(AUTH_LOGOUT, null, { root: true });
                    reject(error)
                });
        })
    },
    [PROFILE_FOLLOW_]: ({ commit }, profile_to_follow) => {
        return new Promise((resolve, reject) => {
            follow_service
                .patch({ follow: true }, profile_to_follow.profile_id)
                .then((data) => {
                    console.log(data);
                    commit(PROFILE_FOLLOW_DONE_, data.follows)
                    resolve(data)
                })
                .catch((error) => {
                    console.log(error)
                    reject(error)
                });
        })

    },
    [PROFILE_UNFOLLOW_]: ({ commit }, profile_to_unfollow) => {
        return new Promise((resolve, reject) => {
            follow_service
                .patch({ follow: false }, profile_to_unfollow.profile_id)
                .then((data) => {
                    console.log(data);
                    commit(PROFILE_FOLLOW_DONE_, data.follows)
                    resolve(data)
                })
                .catch((error) => {
                    console.log(error);
                    reject(error)
                });
        })
    },
    [PROFILE_WATCHLIST_REQUEST_]: ({ commit }) => {
        return new Promise((resolve, reject) => {
            my_watchlist_service.get().then(data => {
                commit(PROFILE_WATCHLIST_REQUEST_, data.results)
                resolve(data.results)
            }).catch(error => {
                reject(error)
            })
        })
    },
    [PROFILE_RECOMMENDS_REQUEST_]: ({ commit }) => {
        return new Promise((resolve, reject) => {
            my_recommends_service.get().then(data => {
                commit(PROFILE_RECOMMENDS_REQUEST_, data.results)
                resolve(data.results)
            }).catch(error => {
                reject(error)
            })
        })
    },
    [PROFILE_TOGGLE_WATCHLIST_]: ({ commit }, movie) => {
        return new Promise((resolve, reject) => {
            var fn_name = movie.is_watchlisted ? "delete" : "patch"
            var params = movie.is_watchlisted ? [movie.id] : [{}, movie.id]
            watchlist_service[fn_name](...params)
                .then((data) => {
                    if (data.success)
                        commit(PROFILE_TOGGLE_WATCHLIST_, movie)
                    resolve(data)
                })
                .catch((error) => {
                    reject(error)
                });
        })
    },
    [PROFILE_TOGGLE_RECOMMEND_]: ({ commit }, movie) => {
        return new Promise((resolve, reject) => {
            var fn_name = movie.is_recommended ? "delete" : "patch"
            var params = movie.is_recommended ? [movie.id] : [{}, movie.id]
            recommend_service[fn_name](...params)
                .then((data) => {
                    if (data.success)
                        commit(PROFILE_TOGGLE_RECOMMEND_, movie)
                    resolve(data)
                })
                .catch((error) => {
                    reject(error)
                });

        })
    },
    [PROFILE_IMAGE_UPDATE_]: ({ commit }, profile_image) => {
        return new Promise((resolve, reject) => {
            var payload = new FormData()
            payload.append("image", profile_image)
            profile_picture_service.patch(payload, state.profile.profile_id).then(data => {
                resolve(data)
                commit(SUCCESS_, data)
            }).catch(error => {
                reject(error)
            })
        })
    }
};

const mutations = {
    [REQUEST_]: state => {
        state.loading = true;
    },
    [SUCCESS_]: (state, profile) => {
        state.loading = false;
        state.error = "";
        localStorage.setItem("profile", JSON.stringify(profile));
        Vue.set(state, "profile", profile);
    },
    [ERROR_]: (state, error) => {
        state.loading = false;
        state.error = error;
    },
    [LOGOUT_]: state => {
        state.profile = {};
        localStorage.removeItem("profile");
        localStorage.removeItem("recommends");
        localStorage.removeItem("watchlist");
    },
    [PROFILE_FOLLOW_DONE_]: (state, follows) => {
        Vue.set(state.profile, "follows", follows)
        localStorage.setItem("profile", JSON.stringify(state.profile));
    },
    [PROFILE_WATCHLIST_REQUEST_]: (state, new_watchlist_items) => {
        new_watchlist_items.forEach(new_item => {
            var item_at = -1
            state.watchlist.forEach((existing_item, index) => {
                if (existing_item.id == new_item.id) {
                    item_at = index
                }
            })
            if (item_at != -1)
                Vue.set(state.watchlist, item_at, new_item)
            else
                state.watchlist.push(new_item)
        })
        localStorage.setItem("watchlist", JSON.stringify(state.watchlist));
    },
    [PROFILE_RECOMMENDS_REQUEST_]: (state, new_recommend_items) => {
        new_recommend_items.forEach(new_item => {
            var item_at = -1
            state.recommends.forEach((existing_item, index) => {
                if (existing_item.id == new_item.id) {
                    item_at = index
                }
            })
            if (item_at != -1)
                Vue.set(state.recommends, item_at, new_item)
            else
                state.recommends.push(new_item)
        })
        localStorage.setItem("recommends", JSON.stringify(state.recommends));
    },
    [PROFILE_TOGGLE_WATCHLIST_]: (state, movie) => {
        var found_at = -1
        state.watchlist.forEach((item, index) => {
            if (item.id == movie.id) {
                found_at = index
            }
        })
        if (found_at == -1)
            state.watchlist.push({ title: movie.title, poster: movie.poster, id: movie.id, about: movie.about })
        else
            state.watchlist.splice(found_at, 1)
    },
    [PROFILE_TOGGLE_RECOMMEND_]: (state, movie) => {
        var found_at = -1
        state.recommends.forEach((item, index) => {
            if (item.id == movie.id) {
                found_at = index
            }
        })
        if (found_at == -1)
            state.recommends.push({ title: movie.title, poster: movie.poster, id: movie.id, about: movie.about })
        else
            state.recommends.splice(found_at, 1)
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};