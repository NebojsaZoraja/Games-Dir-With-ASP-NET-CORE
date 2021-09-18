import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD } from '../constatns/cartConstants'

export const cartReducer = (state = { cartItem: {} }, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload;

            const existItem = state.cartItem;

            if (existItem) {
                return {
                    ...state,
                    cartItem: state.cartItem === existItem ? item : state.cartItem,
                }
            } else {
                return {
                    ...state,
                    cartItem: item
                }
            }
        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItem: {}
            }
        case CART_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload,
            }
        default:
            return state;
    }
}