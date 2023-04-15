import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';

const initialState = {
    loading: false,
    token: null,
    restaurantId: '',
    error: null,
    items: [] 
}

const restaurantLogin = (state, action) => {
    return updateObject( state, {
        token: action.token,
        restaurantId: action.restaurantId,
        error: null,
        loading: false
    })
}

const returnItems = (state, action) =>{
    return updateObject(state, {
        items: action.items
    })
}
const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.RESTAURANT_LOGIN_SUCCESS: return restaurantLogin(state, action);
        case actionTypes.RESTAURANT_GET_ITEMS: return returnItems(state, action);
    
        default: return state;
    }
};

export default reducer;