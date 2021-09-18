import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_LIST_MY_FAIL, ORDER_LIST_MY_REQUEST, ORDER_LIST_MY_SUCCESS, ORDER_LIST_MY_RESET, ORDER_PAY_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_RESET, ORDER_PAY_SUCCESS, ORDER_CREATE_RESET } from '../constatns/orderConstants'

const orderCreateDefaultState = {};

export const orderCreateReducer = (state = orderCreateDefaultState, action) => {
    switch (action.type) {
        case ORDER_CREATE_REQUEST:
            return {
                loading: true
            }
        case ORDER_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
                order: action.payload
            }
        case ORDER_CREATE_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case ORDER_CREATE_RESET:
            return { orderCreateDefaultState }
        default:
            return state;
    }
}

export const orderDetailsReducer = (state = { loading: true, orderItem: {} }, action) => {
    switch (action.type) {
        case ORDER_DETAILS_REQUEST:
            return {
                loading: true
            }
        case ORDER_DETAILS_SUCCESS:
            return {
                loading: false,
                order: action.payload
            }
        case ORDER_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        default:
            return state;
    }
}

export const orderPayReducer = (state = { orderItem: {} }, action) => {
    switch (action.type) {
        case ORDER_PAY_REQUEST:
            return {
                loading: true
            }
        case ORDER_PAY_SUCCESS:
            return {
                loading: false,
                order: action.payload,
                success: true
            }
        case ORDER_PAY_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case ORDER_PAY_RESET:
            return { state }
        default:
            return state;
    }
}

export const orderListMyReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case ORDER_LIST_MY_REQUEST:
            return {
                loading: true
            }
        case ORDER_LIST_MY_SUCCESS:
            return {
                loading: false,
                orders: action.payload.orders,
                pages: action.payload.pages,
                page: action.payload.page,
            }
        case ORDER_LIST_MY_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case ORDER_LIST_MY_RESET:
            return {
                orders: []
            }
        default:
            return state;
    }
}