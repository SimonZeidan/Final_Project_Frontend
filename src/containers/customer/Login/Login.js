import React, {Component} from "react";
import Input from "../../../components/UI/Input/Input";
import Button from "../../../components/UI/Button/Button";
import classes from "./Login.module.css";
import { updateObject } from "../../../store/utility";
import * as actions from '../../../store/actions/index';
import { connect } from "react-redux";

class Login extends Component{
    state = {
        loginForm: {
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
            }
        }
    }
    submitHandler = (event) => {
        event.preventDefault()

        this.props.onSignIn(this.state.loginForm.email.value, this.state.loginForm.password.value);
    }

    inputChangeHandler = (event, controlName) => {

        const updatedControls = updateObject(this.state.loginForm, {

            [controlName]: updateObject(this.state.loginForm[controlName], {
                value: event.target.value,
            })
        })

        this.setState({loginForm: updatedControls})
    }
    render(){
        const formElementsArray = [];
        for(let key in this.state.loginForm){
            formElementsArray.push({
                id: key,
                config: this.state.loginForm[key]
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
        onSignIn: (email, password) => dispatch(actions.customerLogin(email, password)),
    }
}

export default connect(null, mapDispatchToProps)(Login);