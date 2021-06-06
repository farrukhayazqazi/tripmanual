import React from 'react'
import { Route, Redirect } from 'react-router-dom';


const UserGuardedRoute = ({ component: Component, auth, ...rest }) => (
    <Route {...rest} render={(props) =>(
        auth === true
            ? <Component {...props} />
            : <Redirect to='/user/login' />

    )} />
    
);

export default UserGuardedRoute;