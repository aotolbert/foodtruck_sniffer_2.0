import React from 'react';
import Admin from './Admin';
import NoMatch from './../NoMatch';

const AdminPage = (props) => (
    (props.role === "admin") ?
        <Admin />
        : <NoMatch />
);


export default AdminPage;