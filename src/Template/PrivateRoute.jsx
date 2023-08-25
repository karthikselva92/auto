import React from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';

import Full from './Full';

import Header from './header';
import Banner from './Banner';
import ProductSection from './Productsecion';
import ProductList from './Productlist';
import Banner2 from './Banner2';
import Blog from './Blog';
import Footer from './Footer';
import QuickView from './Quickview';

const PrivateRoute = () => {
    
    return (
        <>
                <Header></Header>
                <main class="main__content_wrapper">
                <ProductList/>
                </main>
                <Footer/>
                <QuickView/>
                <Outlet />
                </>
        );
};





export default PrivateRoute;
