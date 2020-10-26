/** _ variables are for use inside namespaced store modules*/

// COMMON STORE ACTIONS
export const REQUEST_ = "REQUEST";
export const SUCCESS_ = "SUCCESS";
export const ERROR_ = "ERROR";
export const LOGOUT_ = "LOGOUT";
export const CREATE_ = "CREATE";

// MODULE SPECIFIC STORE ACTIONS
export const PROFILE_FOLLOW_ = "FOLLOW";
export const PROFILE_UNFOLLOW_ = "UNFOLLOW";
export const PROFILE_FOLLOW_DONE_ = "FOLLOW_DONE";
export const PROFILE_WATCHLIST_REQUEST_ = "WATCHLIST_REQUEST"
export const PROFILE_RECOMMENDS_REQUEST_ = "RECOMMENDS_REQUEST"
export const PROFILE_TOGGLE_WATCHLIST_ = "TOGGLE_WATCHLIST"
export const PROFILE_TOGGLE_RECOMMEND_ = "TOGGLE_RECOMMEND"
export const LIST_TOGGLE_MOVIE_REQUEST_ = "TOGGLE_MOVIE_REQUEST"
export const LIST_TOGGLE_MOVIE_SUCCESS_ = "TOGGLE_MOVIE_SUCCESS"
export const LIST_TOGGLE_MOVIE_ERROR_ = "TOGGLE_MOVIE_ERROR"


// PUBLIC ACTIONS 
export const AUTH_REQUEST = `auth/${REQUEST_}`;
export const AUTH_SUCCESS = `auth/${SUCCESS_}`;
export const AUTH_ERROR = `auth/${ERROR_}`;
export const AUTH_LOGOUT = `auth/${LOGOUT_}`;
export const PROFILE_REQUEST = `profile/${REQUEST_}`;
export const PROFILE_SUCCESS = `profile/${SUCCESS_}`;
export const PROFILE_ERROR = `profile/${ERROR_}`;
export const PROFILE_LOGOUT = `profile/${LOGOUT_}`;
export const PROFILE_FOLLOW = `profile/${PROFILE_FOLLOW_}`;
export const PROFILE_UNFOLLOW = `profile/${PROFILE_UNFOLLOW_}`;
export const PROFILE_FOLLOW_DONE = `profile/${PROFILE_FOLLOW_DONE_}`;
export const PROFILE_WATCHLIST_REQUEST = `profile/${PROFILE_WATCHLIST_REQUEST_}`;
export const PROFILE_RECOMMENDS_REQUEST = `profile/${PROFILE_RECOMMENDS_REQUEST_}`;
export const PROFILE_TOGGLE_WATCHLIST = `profile/${PROFILE_TOGGLE_WATCHLIST_}`;
export const PROFILE_TOGGLE_RECOMMEND = `profile/${PROFILE_TOGGLE_RECOMMEND_}`;
export const LIST_REQUEST = `list/${REQUEST_}`;
export const LIST_SUCCESS = `list/${SUCCESS_}`;
export const LIST_ERROR = `list/${ERROR_}`;
export const LIST_LOGOUT = `list/${LOGOUT_}`;
export const LIST_CREATE = `list/${CREATE_}`;
export const LIST_TOGGLE_MOVIE_REQUEST = `list/${LIST_TOGGLE_MOVIE_REQUEST_}`
export const LIST_TOGGLE_MOVIE_SUCCESS = `list/${LIST_TOGGLE_MOVIE_SUCCESS_}`
export const LIST_TOGGLE_MOVIE_ERROR = `list/${LIST_TOGGLE_MOVIE_ERROR_}`
export const ROLE_REQUEST = `role/${REQUEST_}`;
export const ROLE_SUCCESS = `role/${SUCCESS_}`;
export const ROLE_ERROR = `role/${ERROR_}`;