import React from 'react'
import { Component } from 'react'
import { Link } from 'react-router-dom'
import axios  from 'axios'
class UserBookings extends Component{

  state = {
    bookings: []
  }

  componentDidMount = async () =>{
    const token = localStorage.getItem("token");
    const bookings = await axios.get("http://localhost:5000/user/bookings/all", { headers: { "Authorization": `Bearer ${token}` } });
    if(bookings.data){
      this.props.mapBookingsToMainState(bookings.data);
      this.setState({ bookings: bookings.data })
    }
  } 

  cancelBooking = (e, booking) =>{
    e.preventDefault();
    this.props.cancelBooking(booking);
    this.props.history.push("/")
  }

  render(){
    return (
      <div className="container user-bookings">
     
        <h3><b>My Bookings</b></h3>
          <div className="row">
            {this.props.bookings.length > 0 ? 
              (
                this.props.bookings.map((booking, i) =>{   
            return booking.trip_details.map((trip, index) =>{
                    return(
                      <div className="trip-card" key={index}>
                      <div className="card" style={{width: '17rem', height:'35rem'}}>
                      <img className="card-img-top img-thumbnail" style={{height:'17rem'}} src={trip.images[0]} alt="Card image cap" />
                      <div className="card-body">
                        <Link className="card-title trip-card-title" to=""><b>{trip.title}</b></Link>
                        <hr/>
                        <h6>booking ID: <b>{booking._id}</b></h6>
                        <h6>seats booked: <b>{booking.seats_booked}</b></h6>
                        <h6>status: <b>{booking.status}</b></h6>
                        <button type="button" onClick={(e) => this.cancelBooking(e, booking)} className="btn btn-secondary">Cancel Booking</button>
                      </div>
                      </div>
                      </div>
                    )
            })

          })
          )
            : 
            ( <div className="container err-message">
              <p>no trips booked :)</p>
              </div>
              )}
            </div>
        </div>
    )
}
}


export default UserBookings;