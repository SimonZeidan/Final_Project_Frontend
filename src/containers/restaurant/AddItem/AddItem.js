import React, {Component} from "react";
import Input from "../../../components/UI/Input/Input";
import Button from "../../../components/UI/Button/Button";
import classes from "./AddItem.module.css";
import * as actions from '../../../store/actions/index';
import { updateObject } from "../../../store/utility";
import { connect } from "react-redux";

class AddItem extends Component{
    
    state = {
        createItem: {
            imageFile: {
                elementType: 'file',
                elementConfig: {
                    type: 'file',
                    placeholder: 'Please enter your image file',
                },
                value: '',
            },
            itemName: {
                elementType: 'input',
                elementConfig: {
                    placeholder: 'Please enter item name'
                },
                value: '',
            },
            price: {
                elementType: 'input',
                elementConfig: {
                    placeholder: 'Please enter price'
                },
                value: '',
            },
            description: {
                elementType: 'textarea',
                elementConfig: {
                    type: 'textarea',
                    placeholder: 'Please enter description'
                },
                value: '',
            },
        },
        image: null
    }
    submitHandler = (event) => {
        event.preventDefault()
        let body = new FormData();
        body.append('imageFile', this.state.image, "file1");
        body.append('imageName', this.state.createItem.itemName.value);
        body.append('itemName', this.state.createItem.itemName.value);
        body.append('price', this.state.createItem.price.value);
        body.append('description', this.state.createItem.description.value);
        body.append('restaurantId', this.props.restaurantId);
        this.props.onCreateItem(body, this.props.restaurantToken)
    }

    inputChangeHandler = (event, controlName) => {
        let updatedControls;
        if(controlName == 'imageFile'){
            updatedControls = updateObject(this.state.createItem, {

                [controlName]: updateObject(this.state.createItem[controlName], {
                    value: event.target.value
                })
            })  
            this.setState({createItem: updatedControls, image: event.target.files[0]})
        } else {
            updatedControls = updateObject(this.state.createItem, {

                [controlName]: updateObject(this.state.createItem[controlName], {
                    value: event.target.value,
                })
            })
            this.setState({createItem: updatedControls})
        }        
    }
    render(){
        const formElementsArray = [];
        for(let key in this.state.createItem){
            formElementsArray.push({
                id: key,
                config: this.state.createItem[key]
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
        onCreateItem: (body, token) => dispatch(actions.restaurantCreateItem(body, token)),
    }
}

const mapStateToProps = state => {
    return {
        restaurantToken: state.restaurant.token,
        restaurantId: state.restaurant.restaurantId
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddItem);