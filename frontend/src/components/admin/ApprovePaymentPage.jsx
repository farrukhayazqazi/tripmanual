import React from 'react'
import { Component } from 'react';
import ApprovePayments from './ApprovePayments'
import axios from 'axios'
import { Link } from 'react-router-dom'

class ApprovePaymentPage extends Component{
    
    state = {
        booking: []
      }

 componentDidMount = async () =>{
        const token = localStorage.getItem("token");
        const id = this.props.match.params.id
        const booking = await axios.get(`http://localhost:5000/admin/booking/${id}`, { headers: { "Authorization": `Bearer ${token}` } });
        console.log("booking.data in approvepaymentspage: ",booking.data);
        if(booking.data){
          // this.props.mapBookingsToMainState(bookings.data);
          this.setState({ booking: booking.data })
        }
    }
    approvePayment = (e, ID) =>{
      e.preventDefault();
      this.props.approvePayment(ID);
      this.props.history.push("/admin/approvePayments")
    }
    denyPayment = (e, ID) =>{
      e.preventDefault();
      this.props.denyPayment(ID);
      this.props.history.push("/")
    }
    render(){
    return (
        <div className="container approve-bookings">
        { this.state.booking ? (
            <div className="card" style={{width: '50rem', height: '100rem'}}>
            <div className="card-body"><br/><br/>
            <img className="card-img" style={{width: '35rem', height: '35rem'}} src={this.state.booking.payment_screenshot} alt="Card image cap" />
            <hr/>
                <div>
                <hr/>
                <h2>Seats Booked</h2><hr/>
                <h6>seats booked:<b>{this.state.booking.seats_booked}</b></h6>
                <hr/>
                </div>
                <h2>Travelers Details:</h2>
                {this.state.booking.traveler_details ? 
                    this.state.booking.traveler_details.map((detail, i) =>
                    (   <div>
                        <hr/>
                        <b>Traveler Number {i+1}</b><br/><br/>
                        <h6><b> Name: </b>{detail.firstName}</h6>
                        <h6><b>Phone Number: </b>{detail.phoneNumber}</h6>
                        <h6></h6>
                        <hr/>
                        </div>
                    )
                    ) : null}
              {this.state.booking.trip_details ? this.state.booking.trip_details.map(trip => (
               <div>
               <h2>Trip Details:</h2>
               <hr/>
               <b>Trip details here: </b>
               <Link to={`/user/trip/${trip._id}`}><b>{trip.title}</b></Link>
               </div>
               )) : null}
               <div><hr/>
               <h2>Total Amount:</h2><hr/>
               <h6>booking for amount of: <b>{this.state.booking.total_amount}</b></h6>
               </div> 
               <div><hr/>
               <h2>Status:</h2><hr/>
               <h6>booking status: <b>{this.state.booking.status}</b></h6>
               </div> <hr/><br/>
                <div style={{justifyContent:"right"}}>
                <button className="btn btn-success" onClick={(e) =>this.approvePayment(e, this.state.booking._id)} >Approve Payment</button>&nbsp;
                <button className="btn btn-danger" onClick={(e) =>this.denyPayment(e, this.state.booking._id)} >Deny Payment</button>
                </div>
            </div>
            
          </div>
          ) 
          : 
          (null) }


        
        </div>
    )
    }
}
export default ApprovePaymentPage