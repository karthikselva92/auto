import './App.css';
import { Fragment } from 'react';
import { Routes, Route } from "react-router-dom"
import PrivateRoute from './Template/PrivateRoute';


function App() {
  return (
    <Fragment>
      <Routes>
        {/* <Route exact path="/" element={<Login />} /> */}
        <Route path="/" element={<PrivateRoute />} >
        </Route>
      </Routes>
    </Fragment>
  )
}


export default App;
