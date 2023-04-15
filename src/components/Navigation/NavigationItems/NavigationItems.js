import React from "react";
import NavigationItem from "../NavigationItem/NavigationItem";
import classes from './NavigationItems.module.css';


const navigationItems = (props) => (
    
    <ul className={classes.NavigationItems}>
        {/* <NavigationItem link="/" exact> Test</NavigationItem> */}
        <NavigationItem link="/restaurant/login"> Restaurant Login</NavigationItem>
        <NavigationItem link="/customer/login"> Customer Login</NavigationItem>
        <NavigationItem link="/restaurant/signup"> Restaurant Signup</NavigationItem>
        <NavigationItem link="/customer/signup"> Customer Signup</NavigationItem>
        {props.isAuth ? <NavigationItem link="/restaurant/createItem"> Create Item</NavigationItem> : null}
        {props.isAuth ? <NavigationItem link="/restaurant/createMenu"> Create Menu</NavigationItem> : null}
    </ul>
);

export default navigationItems;