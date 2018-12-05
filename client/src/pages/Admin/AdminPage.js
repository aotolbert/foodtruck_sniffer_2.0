import React, { Component } from 'react';
import Admin from './Admin';
import API from '../../utils/API';

const AdminPage = (props) => {
    return (
        (props.role === "admin") ?
            (<Admin />)
            : ("blah")
    );
}

export default AdminPage;