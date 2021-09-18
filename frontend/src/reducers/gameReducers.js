import { GAME_LIST_SUCCESS, GAME_LIST_REQUEST, GAME_DETAILS_REQUEST, GAME_DETAILS_SUCCESS, GAME_DETAILS_FAIL, GAME_DELETE_REQUEST, GAME_DELETE_SUCCESS, GAME_DELETE_FAIL, GAME_GENRE_REQUEST, GAME_GENRE_SUCCESS, GAME_GENRE_FAIL, GAME_CREATE_REQUEST, GAME_CREATE_SUCCESS, GAME_CREATE_FAIL, GAME_CREATE_RESET, GAME_GENRE_RESET, GAME_UPDATE_REQUEST, GAME_UPDATE_SUCCESS, GAME_UPDATE_FAIL, GAME_UPDATE_RESET, GAME_CREATE_REVIEW_REQUEST, GAME_CREATE_REVIEW_SUCCESS, GAME_CREATE_REVIEW_FAIL, GAME_CREATE_REVIEW_RESET, GAME_LIST_ADMIN_REQUEST, GAME_LIST_ADMIN_SUCCESS, GAME_LIST_ADMIN_FAIL, GAME_LIST_FAIL, GAME_DETAILS_ADMIN_REQUEST, GAME_DETAILS_ADMIN_SUCCESS, GAME_DETAILS_ADMIN_FAIL } from '../constatns/gameConstatns'

export const gameListAdminReducer = (state = { games: [] }, action) => {
    switch (action.type) {
        case GAME_LIST_ADMIN_REQUEST:
            return { loading: true, games: [] }
        case GAME_LIST_ADMIN_SUCCESS:
            return { loading: false, games: action.payload.games, pages: action.payload.pages, page: action.payload.page }
        case GAME_LIST_ADMIN_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

export const gameListReducer = (state = { games: [] }, action) => {
    switch (action.type) {
        case GAME_LIST_REQUEST:
            return { loading: true, games: [] }
        case GAME_LIST_SUCCESS:
            return { loading: false, games: action.payload }
        case GAME_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

export const gameDetailsReducer = (state = { loading: true, game: {} }, action) => {
    switch (action.type) {
        case GAME_DETAILS_REQUEST:
            return { loading: true, ...state }
        case GAME_DETAILS_SUCCESS:
            return { loading: false, game: action.payload }
        case GAME_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

export const gameDetailsAdminReducer = (state = { loading: true, game: {} }, action) => {
    switch (action.type) {
        case GAME_DETAILS_ADMIN_REQUEST:
            return { loading: true, ...state }
        case GAME_DETAILS_ADMIN_SUCCESS:
            return { loading: false, game: action.payload }
        case GAME_DETAILS_ADMIN_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

export const gameDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case GAME_DELETE_REQUEST:
            return { loading: true }
        case GAME_DELETE_SUCCESS:
            return { loading: false, success: true }
        case GAME_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

export const gameGenresReducer = (state = { genres: [] }, action) => {
    switch (action.type) {
        case GAME_GENRE_REQUEST:
            return { loading: true, genres: [] }
        case GAME_GENRE_SUCCESS:
            return { loading: false, genres: action.payload }
        case GAME_GENRE_FAIL:
            return { loading: false, error: action.payload }
        case GAME_GENRE_RESET:
            return { genres: [] }
        default:
            return state;
    }
}

export const gameCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case GAME_CREATE_REQUEST:
            return { loading: true }
        case GAME_CREATE_SUCCESS:
            return { loading: false, success: true, game: action.payload }
        case GAME_CREATE_FAIL:
            return { loading: false, error: action.payload }
        case GAME_CREATE_RESET:
            return {}
        default:
            return state;
    }
}

export const gameUpdateReducer = (state = { game: {} }, action) => {
    switch (action.type) {
        case GAME_UPDATE_REQUEST:
            return { loading: true }
        case GAME_UPDATE_SUCCESS:
            return { loading: false, success: true, game: action.payload }
        case GAME_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        case GAME_UPDATE_RESET:
            return { game: {} }
        default:
            return state;
    }
}

export const gameReviewCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case GAME_CREATE_REVIEW_REQUEST:
            return { loading: true }
        case GAME_CREATE_REVIEW_SUCCESS:
            return { loading: false, success: true, }
        case GAME_CREATE_REVIEW_FAIL:
            return { loading: false, error: action.payload }
        case GAME_CREATE_REVIEW_RESET:
            return { game: {} }
        default:
            return state;
    }
}