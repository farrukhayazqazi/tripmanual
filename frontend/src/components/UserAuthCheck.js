import React from 'react'
import { Route, Redirect } from 'react-router-dom';


const UserAuthCheck = ({ component: Component, auth, authenticate, ...rest }) => (
    <Route {...rest} render={(props) =>(
        auth === false
            ? <Component {...props}  authenticate={authenticate}  />
            : <Redirect to='/' />

    )} />
    
);

export default UserAuthCheck;