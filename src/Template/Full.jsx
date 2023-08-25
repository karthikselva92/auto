import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Header from './header';
import Banner from './Banner';

const mapStateToProps = (state) => ({

});
const Full = () => {

    return (
        <Fragment>
            <div>
                <Header></Header>
                 <Banner></Banner>   
                
            </div>
        </Fragment>
    );
};

export default connect(mapStateToProps, {})(Full);
