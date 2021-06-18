import React from 'react'
import { Route, Redirect } from 'react-router-dom';


const UserGuardedRoute = ({ component: Component, auth, createBooking, mapBookingsToMainState, bookings, ...rest }) => (
    <Route {...rest} render={(props) =>(
        auth === true
            ? <Component {...props} createBooking={createBooking} bookings={bookings} mapBookingsToMainState={mapBookingsToMainState} />
            : <Redirect to='/user/login' />

    )} />
    
);

export default UserGuardedRoute;



