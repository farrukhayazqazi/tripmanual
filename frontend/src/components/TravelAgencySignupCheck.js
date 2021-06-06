import React from 'react'
import { Route, Redirect } from 'react-router-dom';


const TravelAgencySignupCheck = ({ component: Component, auth, tsignUp, ...rest }) => (
    <Route {...rest} render={(props) =>(
        auth === false
            ? <Component {...props}  tsignUp={tsignUp} />
            : <Redirect to='/travelAgency/tlogin' />

    )} />
    
);

export default TravelAgencySignupCheck;