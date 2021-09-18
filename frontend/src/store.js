import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { gameCreateReducer, gameDeleteReducer, gameDetailsAdminReducer, gameDetailsReducer, gameGenresReducer, gameListAdminReducer, gameListReducer, gameReviewCreateReducer, gameUpdateReducer } from './reducers/gameReducers'
import { userDeleteReducer, userDetailsReducer, userListReducer, userLoginReducer, userRegisterReducer, userUpdateProfileReducer, userUpdateReducer } from './reducers/userReducers';
import { cartReducer } from './reducers/cartReducers';
import { orderCreateReducer, orderDetailsReducer, orderListMyReducer, orderPayReducer } from './reducers/orderReducers';
import { genresListReducer, genreCreateReducer, genreUpdateReducer, genreDetailsReducer, genreDeleteReducer } from './reducers/genreReducers';

const reducer = combineReducers({
    gameList: gameListReducer,
    gameListAdmin: gameListAdminReducer,
    gameDetails: gameDetailsReducer,
    gameDetailsAdmin: gameDetailsAdminReducer,
    gameDelete: gameDeleteReducer,
    gameGenres: gameGenresReducer,
    gameCreate: gameCreateReducer,
    gameUpdate: gameUpdateReducer,
    gameReviewCreate: gameReviewCreateReducer,
    genresList: genresListReducer,
    genreCreate: genreCreateReducer,
    genreUpdate: genreUpdateReducer,
    genreDetails: genreDetailsReducer,
    genreDelete: genreDeleteReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    cart: cartReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderListMy: orderListMyReducer,

});

const userInfoFromStorage = sessionStorage.getItem('userInfo')
    ? JSON.parse(sessionStorage.getItem('userInfo'))
    : null

const cartItemFromStorage = localStorage.getItem('cartItem') ? JSON.parse(localStorage.getItem('cartItem')) : {};

const initialState = {
    cart: { cartItem: cartItemFromStorage },
    userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;