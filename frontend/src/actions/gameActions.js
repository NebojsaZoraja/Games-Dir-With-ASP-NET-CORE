import axios from 'axios'
import { GAME_LIST_FAIL, GAME_LIST_SUCCESS, GAME_LIST_REQUEST, GAME_DETAILS_REQUEST, GAME_DETAILS_SUCCESS, GAME_DETAILS_FAIL, GAME_DELETE_REQUEST, GAME_DELETE_SUCCESS, GAME_DELETE_FAIL, GAME_GENRE_REQUEST, GAME_GENRE_SUCCESS, GAME_GENRE_FAIL, GAME_CREATE_REQUEST, GAME_CREATE_SUCCESS, GAME_CREATE_FAIL, GAME_UPDATE_REQUEST, GAME_UPDATE_SUCCESS, GAME_UPDATE_FAIL, GAME_CREATE_REVIEW_REQUEST, GAME_CREATE_REVIEW_SUCCESS, GAME_CREATE_REVIEW_FAIL, GAME_LIST_ADMIN_REQUEST, GAME_LIST_ADMIN_SUCCESS, GAME_LIST_ADMIN_FAIL, GAME_DETAILS_ADMIN_REQUEST, GAME_DETAILS_ADMIN_SUCCESS, GAME_DETAILS_ADMIN_FAIL } from '../constatns/gameConstatns'

export const listGamesAdmin = (pageNumber = 1) => async (dispatch, getState) => {
    try {
        dispatch({ type: GAME_LIST_ADMIN_REQUEST });

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/games/paginate?pageNumber=${pageNumber}`, config);

        dispatch({
            type: GAME_LIST_ADMIN_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: GAME_LIST_ADMIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const listGames = (keyword) => async (dispatch) => {
    try {
        dispatch({ type: GAME_LIST_REQUEST });

        const { data } = await axios.get(`/api/games?keyword=${keyword}`);

        dispatch({
            type: GAME_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: GAME_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const listGamesHomePage = () => async (dispatch) => {
    try {
        dispatch({ type: GAME_LIST_REQUEST });

        const { data } = await axios.get(`/api/games/homepage`);

        dispatch({
            type: GAME_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: GAME_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const listGameDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: GAME_DETAILS_REQUEST });

        const { data } = await axios.get(`/api/games/${id}`);

        dispatch({
            type: GAME_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: GAME_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const listGameDetailsAdmin = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: GAME_DETAILS_ADMIN_REQUEST });

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/games/admin/${id}`, config);

        dispatch({
            type: GAME_DETAILS_ADMIN_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: GAME_DETAILS_ADMIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const deleteGame = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: GAME_DELETE_REQUEST
        })
        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.delete(`/api/games/${id}`, config);

        dispatch({
            type: GAME_DELETE_SUCCESS,
        })

    } catch (error) {
        dispatch({
            type: GAME_DELETE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}

export const createGame = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: GAME_CREATE_REQUEST
        })
        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(`/api/games/`, {}, config);

        dispatch({
            type: GAME_CREATE_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: GAME_CREATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}

export const getGameGenres = () => async (dispatch) => {
    try {
        dispatch({ type: GAME_GENRE_REQUEST });

        const { data } = await axios.get('/api/genres');

        dispatch({
            type: GAME_GENRE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: GAME_GENRE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const updateGame = (game, id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: GAME_UPDATE_REQUEST
        })
        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(`/api/games/${id}`, game, config);

        dispatch({
            type: GAME_UPDATE_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: GAME_UPDATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}

export const createGameReview = (gameId, review) => async (dispatch, getState) => {
    try {
        dispatch({
            type: GAME_CREATE_REVIEW_REQUEST
        })
        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.post(`/api/games/${gameId}/reviews`, review, config);

        dispatch({
            type: GAME_CREATE_REVIEW_SUCCESS,
        })

    } catch (error) {
        dispatch({
            type: GAME_CREATE_REVIEW_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}