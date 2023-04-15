import axios from '../../axios-app';
import * as actionTypes from './actionTypes';

export const loginSuccess = (token, restaurantId) => {
    return {
        type: actionTypes.RESTAURANT_LOGIN_SUCCESS,
        token: token,
        restaurantId: restaurantId
    }
}

export const restaurantLogin = (username, password, isEmail) => {
    console.log('restaurant Login');
    return dispatch => {
        let authData;
        if(isEmail){
            authData = {
                email: username,
                password: password,
            }
        }else{
            authData = {
                userName: username,
                password: password,
            }
        }
            
            let url = 'api/restaurant/login'
            axios.post(url, authData)
                .then(response => {
                    console.log(response);
                    console.log(response.data.token, response.data.data.restaurant._id);
                    dispatch(loginSuccess(response.data.token, response.data.data.restaurant._id))
                })
                .catch(err => {
                    console.log(err);
                })
        }
}
export const restaurantSignup = (parseBody) => {
    console.log('restaurant Signup');
    return dispatch => {
            const authData = {
                ...parseBody
            }
            let url = 'api/restaurant/signup'
            axios.post(url, authData)
                .then(response => {
                    console.log(response)
                })
                .catch(err => {
                    console.log(err);
                })
        }
}
export const restaurantCreateItem = (parseBody, token) => {
    console.log('restaurant Create Item');
    const headers = {
        // 'Content-Type': 'application/json',
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    return dispatch => {
            let url = 'api/item/createItem'
            axios.post(url, parseBody ,{headers: headers })
                .then(response => {
                    console.log(response)
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }
    export const restaurantCreateMenu = (parseBody, token) => {
        console.log('restaurant Create Menu');
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        return dispatch => {
                let url = 'api/restaurant/addMenu'
                axios.post(url, parseBody ,{headers: headers })
                    .then(response => {
                        console.log(response)
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
        }
        export const returnItems = (response) => {
            return {
                type: actionTypes.RESTAURANT_GET_ITEMS,
                items: response.data.data.map(item => ({value: item._id, displayValue: item.name }))
            }
        }       
     
 export const getRestaurantItems = (restaurantId, token) => {
        console.log('restaurant Get Items');
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }
        return dispatch => {
                let url = `api/item/getItems/${restaurantId}`
                axios.get(url,{headers: headers })
                    .then(response => {
                        console.log(response)
                        // return response.data.data.map(item => ({value: item._id, displayValue: item.name }));
                        dispatch(returnItems(response));
                    })
                    .catch(err => {
                        console.log(err);
                        return err;
                    })
            }
        }