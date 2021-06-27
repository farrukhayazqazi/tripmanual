import React from 'react'
import axios from 'axios';
import { Component } from 'react';

class ViewBookings extends Component{

  state = {
    bookings: null
  }


    componentDidMount = async () =>{
        let BASIC_URL = "http://localhost:5000";
        const token = localStorage.getItem("token");
  
        if(token){
          try{
            const response = await axios.get(`${BASIC_URL}/travelAgency/getBookings`, { headers: { "Authorization": `Bearer ${token}` } });
            console.log("Bookings are retrieved: ",response.data);
            this.setState({ bookings: response.data})
          }
          catch(e){
            console.log("Unable to retrieve bookings!")
          }
    }
}
  render(){
    return (
        <div className="container view-bookings">
            <h3><b>Bookings</b></h3>
            <table className="table">
            
            <thead className="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">User ID</th>
                <th scope="col">Booked Trip</th>
                <th scope="col">Seats booked</th>
                <th scope="col">Total Amount</th>
                <th scope="col">Booking Status</th>
              </tr>
            </thead>
            <tbody>
            { this.state.bookings ? this.state.bookings.map((booking, index) =>
             ( <>
              <tr>
                <th scope="row">{index+1}</th>
                <td>{booking.user}</td>
                <td>{booking.trip_details.map(t => t.title)}</td>
                <td>{booking.seats_booked}</td>
                <td>{booking.total_amount}</td>
                <td>{booking.status}</td>
              </tr>
              </>
             )
              ) : (<p>no bookings yet :/</p>) }
            </tbody>
          </table>
        
        </div>
    )
}
}

export default ViewBookings;