import React, {Component} from "react";
import Aux from "../Aux/Aux";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import classes from './Layout.module.css';
import { connect } from "react-redux";


class Layout extends Component {
    state= {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer};
        });
    }

    render() {
        return (
            <Aux>
                <Toolbar isAuth={this.props.isAthenticated} drawerToggleClicked ={this.sideDrawerToggleHandler}/>
                <SideDrawer
                        closed={this.sideDrawerClosedHandler}
                        open={this.state.showSideDrawer}
                        isAuth={this.props.isAthenticated} />
                    <main className={classes.Content}>
                        {this.props.children}
                    </main>
            </Aux>
        )
    }
}
const mapStateToProps = state => {
    return {
        isAthenticated: state.restaurant.token !== null,
    }
}

export default connect(mapStateToProps) (Layout);