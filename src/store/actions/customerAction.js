import axios from '../../axios-app'

export const customerLogin = (email, password) => {
    console.log('customer Login');
    return dispatch => {
        let authData;
        authData = {
            email: email,
            password: password,
        }  
        let url = 'api/customer/login';
            axios.post(url, authData)
                .then(response => {
                    console.log(response)
                })
                .catch(err => {
                    console.log(err);
                })
        }
}

export const customerSignup = (parseBody) => {
    console.log('customer Signup');
    return dispatch => {
            const authData = {
                ...parseBody
            }
            let url = 'api/customer/signup'
            axios.post(url, authData)
                .then(response => {
                    console.log(response)
                })
                .catch(err => {
                    console.log(err);
                })
        }
}