import axios from 'axios';
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD } from '../constatns/cartConstants';

export const addToCart = (id) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/games/${id}`);

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            game: data.id,
            title: data.title,
            image: data.image,
            price: data.price,
            numberInStock: data.numberInStock
        }
    });

    localStorage.setItem('cartItem', JSON.stringify(getState().cart.cartItem));
}

export const removeFromCart = (id) => async (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id
    });
    localStorage.removeItem('cartItem', JSON.stringify(getState().cart.cartItem));
}

export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: data,
    });

    localStorage.setItem('paymentMethod', JSON.stringify(data));
}