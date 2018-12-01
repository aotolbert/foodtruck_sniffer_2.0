import React from "react";
import Img from "./FTS_Logo.png";
import { ProfileButton } from "../Grid/ProfileButton";
import { SignButton } from "../Grid/SignButton";
import SignOutButton from "../SignOutButton";
import { SignUpForm } from "../SignUp";
import { SignInForm } from "../SignIn";
import LoginControl from "../LoginControl"


const Header = ( props ) => {

    return (


        
        <div className="row sticky-top position-absolute  ml-2">
            <nav className=" navbar navbar-transparent bg-transparent mr-auto ml-auto">
                {/* Profile */}
                <div className="col-4">
                {/* {props.authUser
                    ? <SignOutButton
                    
                    />
                    : <SignButton 
                        func= {props.func}
                    />} */}
                    <LoginControl authUser={props.authUser}/>
                </div>
                {/* Logo */}
                <div className="col-4">
                    <img className="img-fluid" src={Img} alt="FTS Logo"></img>
                </div>
                {/* Hamburger */}
                <div className="col-4">

                </div>
            </nav>


        </div>

    )

};

export default Header;