import React from "react";
import Img from "./FTS_Logo.png";
import LoginControl from "../LoginControl"


const Header = () => {

    return (
        <img className="img-fluid logo" src={Img} alt="FTS Logo"></img>
    )

};

export default Header;