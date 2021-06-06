import React from 'react'
import { Route, Redirect } from 'react-router-dom';


const UserSignupCheck = ({ component: Component, auth, signUp, errors, ...rest }) => (
    <Route {...rest} render={(props) =>(
        auth === false
            ? <Component {...props}  signUp={signUp}  errors />
            : <Redirect to='/user/login' />

    )} />
    
);

export default UserSignupCheck;