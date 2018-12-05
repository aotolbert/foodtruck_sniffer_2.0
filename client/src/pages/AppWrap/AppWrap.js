import React, { Component } from "react";
import Header from "../../components/Header";
import Map from "../Map";

class AppWrap extends Component {

    constructor(props) {
        super(props);
        this.state = { authUser: this.props.authUser };
    }

    render() {
        return (
            <div>

                <Header
                    authUser={this.props.authUser}
                />
                <Map />


            </div>
        )


    }

}

export default AppWrap;

