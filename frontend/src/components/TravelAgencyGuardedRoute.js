import React from 'react'
import { Route, Redirect } from 'react-router-dom';


const TravelAgencyGuardedRoute = ({ component: Component, auth, createTrip, ...rest }) => (
    <Route {...rest} render={(props) =>(
        auth === true
            ? <Component {...props} createTrip={createTrip} />
            : <Redirect to='/travelAgency/tlogin' />

    )} />
    
);

export default TravelAgencyGuardedRoute;