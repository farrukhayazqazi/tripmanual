import React from 'react'
import { Route, Redirect } from 'react-router-dom';


const TravelAgencyGuardedRoute = ({ component: Component, auth, createTrip, trips, mapTripsToState, tripOperator,  ...rest }) => (
    <Route {...rest} render={(props) =>(
        auth === true
            ? <Component {...props} createTrip={createTrip} trips={trips} mapTripsToState={mapTripsToState} tripOperator={tripOperator} />
            : <Redirect to='/travelAgency/tlogin' />

    )} />
    
);

export default TravelAgencyGuardedRoute;