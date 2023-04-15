import React, { Component } from "react";
import classes from './Signup.module.css';
import Input from "../../../components/UI/Input/Input";
import { connect } from "react-redux";
import { updateObject } from '../../../store/utility';
import Button from "../../../components/UI/Button/Button";
import * as actions from '../../../store/actions/index';


class Signup extends Component {
    state = {
        signupForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    placeholder: 'Please enter your name'
                },
                value: '',
            },
            username: {
                elementType: 'input',
                elementConfig: {
                    placeholder: 'Please enter your username'
                },
                value: '',
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Please enter your email'
                },
                value: '',
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Please enter your password'
                },
                value: '',
            },
            passwordConfirm: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Please enter your password Confirm'
                },
                value: '',
            },
            phoneNumber: {
                elementType: 'input',
                elementConfig: {
                    placeholder: 'Please enter your phone number'
                },
                value: '',
            },
            address: {
                elementType: 'input',
                elementConfig: {
                    placeholder: 'Please enter your address'
                },
                value: '',
            },
            website: {
                elementType: 'input',
                elementConfig: {
                    placeholder: 'Please enter your website'
                },
                value: '',
            },
            openingHours: {
                elementType: 'input',
                elementConfig: {
                    placeholder: 'Please enter your openingHours'
                },
                value: '',
            }
        }
    }

    submitHandler = (event) => {
        event.preventDefault()
        const parseBody = {
            email: this.state.signupForm.email.value, 
            userName: this.state.signupForm.username.value,
            name: this.state.signupForm.name.value,
            password: this.state.signupForm.password.value,
            passwordConfirm: this.state.signupForm.passwordConfirm.value,
            phoneNumber: this.state.signupForm.phoneNumber.value,
            address: this.state.signupForm.address.value,
        }
        this.props.onSignUp(parseBody)
    }

    inputChangeHandler = (event, controlName) => {

        const updatedControls = updateObject(this.state.signupForm, {

            [controlName]: updateObject(this.state.signupForm[controlName], {
                value: event.target.value,
            })
        })

        this.setState({signupForm: updatedControls})
    }
    render(){
        const formElementsArray = [];
        for(let key in this.state.signupForm){
            formElementsArray.push({
                id: key,
                config: this.state.signupForm[key]
            })
        }
        let form = formElementsArray.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                label={formElement.id.toUpperCase()}
                changed={(event) => this.inputChangeHandler(event, formElement.id)}/>
        ));
        return(
            <div className={classes.Image}>
            <div className={classes.Form}>
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">Submit</Button>
                </form>
            </div>
            </div>
        )
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onSignUp: ( body) => dispatch(actions.restaurantSignup(body)),
    }
}

export default connect(null, mapDispatchToProps)(Signup);