import React from 'react'
import { Route, Redirect } from 'react-router-dom';


const UserGuardedRoute = ({ component: Component, auth,  denyPayment,approvePayment,  cancelBooking, createBooking, mapBookingsToMainState, updateTrip, deleteTrip, bookings, ...rest }) => (
    <Route {...rest} render={(props) =>(
        auth === true
            ? <Component {...props} createBooking={createBooking} denyPayment={denyPayment} cancelBooking={cancelBooking} approvePayment={approvePayment} bookings={bookings} updateTrip={updateTrip} deleteTrip={deleteTrip} mapBookingsToMainState={mapBookingsToMainState} />
            : <Redirect to='/user/login' />

    )} />
    
);

export default UserGuardedRoute;



