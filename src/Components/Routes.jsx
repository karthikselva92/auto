import React from 'react';
import { connect } from 'react-redux';
import { Routes, Route } from "react-router-dom";
import PrivateRoute from './../Template/PrivateRoute';



const RoutesLink = () => {
    return (
        <Route path="/" element={<PrivateRoute />} >
            {/* <Route exact path="/dashboard" element={<Dashboard />} /> */}
        </Route>
    )

}


export default connect(null)(RoutesLink);