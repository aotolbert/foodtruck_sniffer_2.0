import React, { Component } from "react";
import Header from "../../components/Header";
import Map from "../Map";

class AppWrap extends Component {

    state= {
        loggedIn: false
      }
    
      signIn = () => {
        this.setState({ loggedIn: true });
        console.log(this.state.loggedIn)
      }

    render() {
        return (
            <div>

            <Header
                loggedIn= {this.state.loggedIn}
                func= {this.signIn}
            />
            <Map/>


        </div>
        )


    }

}

export default AppWrap;

