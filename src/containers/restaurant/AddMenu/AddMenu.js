import React, {Component} from "react";
import Input from "../../../components/UI/Input/Input";
import Button from "../../../components/UI/Button/Button";
import classes from "./AddMenu.module.css";
import * as actions from '../../../store/actions/index';
import { updateObject } from "../../../store/utility";
import { connect } from "react-redux";

class AddMenu extends Component{
    componentDidMount(){
        this.props.getRestaurantItems(this.props.restaurantId, this.props.restaurantToken);
    }
    state = {
        createMenu: {
            menuName: {
                elementType: 'input',
                elementConfig: {
                    placeholder: 'Please enter item name'
                },
                value: '',
            },
            items: {
                elementType: 'select',
                elementSelectConfig: {
                    placeholder: 'Please select items',
                },
                elementConfig: {
                    options: this.props.items
                },
                value: [],
            }
        }
    }
    submitHandler = (event) => {
        event.preventDefault()
        const body = {
            title: this.state.createMenu.menuName.value, 
            restaurantId: this.props.restaurantId,
            items: this.state.createMenu.items.value
        }
        console.log(body);
        this.props.onCreateMenu(body, this.props.restaurantToken)
    }

    inputChangeHandler = (event, controlName) => {
        const updatedControls = updateObject(this.state.createMenu, {

            [controlName]: updateObject(this.state.createMenu[controlName], {
                value: event.target.value,
            })
        })
        this.setState({createMenu: updatedControls})
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.createMenu.items.elementConfig.options !== this.props.items) {
            const updatedControls = updateObject(this.state.createMenu, {

                items: updateObject(this.state.createMenu.items, {
                    elementConfig: {
                        options: this.props.items
                    },
                })
            })
            this.setState({createMenu: updatedControls})
          // State has changed, perform any necessary actions
        //   console.log("State has been updated!");
        }
      }
    render(){
        const formElementsArray = [];
        for(let key in this.state.createMenu){
            formElementsArray.push({
                id: key,
                config: this.state.createMenu[key]
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
        onCreateMenu: (body, token) => dispatch(actions.restaurantCreateMenu(body, token)),
        getRestaurantItems: (restaurantId, token) => dispatch(actions.getRestaurantItems(restaurantId, token))
    }
}

const mapStateToProps = state => {
    return {
        restaurantToken: state.restaurant.token,
        restaurantId: state.restaurant.restaurantId,
        items: state.restaurant.items
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddMenu);