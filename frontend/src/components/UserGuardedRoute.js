import React from 'react'
import { Route, Redirect } from 'react-router-dom';


const UserGuardedRoute = ({ component: Component, auth, createBooking, bookings, ...rest }) => (
    <Route {...rest} render={(props) =>(
        auth === true
            ? <Component {...props} createBooking={createBooking} bookings={bookings} />
            : <Redirect to='/user/login' />

    )} />
    
);

export default UserGuardedRoute;



