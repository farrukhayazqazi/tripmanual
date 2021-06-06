import React from 'react'
import { Route, Redirect } from 'react-router-dom';


const TravelAgencyAuthCheck = ({ component: Component, auth, tAuthenticate,  ...rest }) => (
    <Route {...rest} render={(props) =>(
        auth === false
            ? <Component {...props} tAuthenticate={tAuthenticate} />
            : <Redirect to='/travelAgency/dashboard' />

    )} />
    
);

export default TravelAgencyAuthCheck;