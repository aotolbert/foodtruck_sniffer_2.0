import React from "react";
import Img from "./FTS_Logo.png";
import LoginControl from "../LoginControl"


const Header = ( props ) => {

    return (


        
        <div className="row sticky-top position-absolute bg-light mt-3 ml-3">
            <nav className=" navbar navbar-transparent bg-transparent mr-auto ml-auto">
                {/* Profile */}

                <div className="col-4">
                    <LoginControl authUser={props.authUser}/>
                </div>
                <div className="col-1">
                </div>
                {/* Logo */}
                <div className="col-4">
                    <img className="img-fluid" src={Img} alt="FTS Logo"></img>
                </div>

            </nav>


        </div>

    )

};

export default Header;