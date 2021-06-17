import React from 'react'
import { Component } from 'react'
import { Link } from 'react-router-dom'

const UserBookings = ({ bookings }) =>{

    return (
        <div className="container user-bookings">
        <h3><b>My Bookings</b></h3>
          <div className="row">
            {bookings ? 
              (
                bookings.map((booking, i) =>{   
            return booking.trip_details.map((trip, index) =>{
                    return(
                      <div className="trip-card" key={index}>
                      <div className="card" style={{width: '15rem'}}>
                      <img className="card-img-top img-thumbnail" src={trip.images[0]} alt="Card image cap" />
                      <div className="card-body">
                        <Link className="card-title trip-card-title" to=""><b>{trip.title}</b></Link>
                      </div>
                      </div>
                      </div>
                    )
            })

          })
          )
            

            : 
            
            (<p>no trips booked :)</p>)}
            </div>
        </div>
    )
}



export default UserBookings;