import React from 'react'
import { Component } from 'react'
import { Link } from 'react-router-dom'
import axios  from 'axios'
class ApprovePayments extends Component{

  state = {
    bookings: []
  }

  componentDidMount = async () =>{
    const token = localStorage.getItem("token");
    const bookings = await axios.get("http://localhost:5000/admin/bookings/all/pending", { headers: { "Authorization": `Bearer ${token}` } });
    if(bookings.data){
      console.log(bookings.data)
      // this.props.mapBookingsToMainState(bookings.data);
      this.setState({ bookings: bookings.data })
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
        <div className="container user-bookings">
        <h3><b>Approve Payments</b></h3>
          <div className="row">
            {this.state.bookings.length > 0 ? 
              (
                this.state.bookings.map((booking, i) =>(
                      <div className="trip-card" key={i}>
                      <div className="card" style={{width: '18rem', height:'32rem'}}>
                      <img className="card-img-top img-thumbnail" style={{ height:'12rem', width: '18rem' }} src={booking.payment_screenshot} alt="Card image cap" />
                      <div className="card-body">
                        <Link className="card-title trip-card-title" to={`/admin/approvePayment/${booking._id}`}><b>{booking._id}</b></Link>
                        <hr/>
                        <h6>seats booked: <b>{booking.seats_booked}</b></h6>
                        <h6>status: <b>{booking.status}</b></h6>
                        <button type="button" onClick={(e) =>this.approvePayment(e, booking._id)} className="btn btn-success">Approve Payment</button><br/><br/>
                        <button type="button" onClick={(e) =>this.denyPayment(e, booking._id)} className="btn btn-danger">Deny Payment</button>
                      </div>
                      </div>
                      </div>
                    ))
            

                )
            : 
            ( <div className="container err-message">
              <p>no payments to approve :)</p>
              </div>
              )}
            </div>
        </div>
    )
}
}


export default ApprovePayments;