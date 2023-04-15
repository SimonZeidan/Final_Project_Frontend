import React, {Component} from "react";


class SearchRetaurant extends Component{
    restaurants = []

    render(){
       return(
        <ul>
            {this.restaurants.map(restaurant => { 
                <li>
                    restaurant.name
                </li>
            })}
        </ul>
       )        
    }
}

export default SearchRetaurant;