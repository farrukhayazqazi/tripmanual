import React from 'react'
import { Component } from 'react';
import ApprovePayments from './ApprovePayments'
import axios from 'axios'

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
    render(){
    return (
        <div className="container approve-bookings">
        { this.state.booking ? (
            <div className="card" style={{width: '50rem', height: '40rem'}}>
            <img className="card-img-top" style={{width: '45rem', height: '30rem'}} src={this.state.booking.payment_screenshot} alt="Card image cap" />
            <div className="card-body">
            <hr/><hr/>
                <b>Travelers Details:</b>
                {this.state.booking.traveler_details ? 
                    this.state.traveler_details.map((detail, i) =>
                    (
                        <p>{i}<b>Name: </b>{detail.firstName}</p>
                    )
                    ) : null}
               
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
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