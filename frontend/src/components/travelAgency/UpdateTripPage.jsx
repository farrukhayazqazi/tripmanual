import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UpdateTripPage extends Component {


    handleSubmit = (e, tripID) =>{
        e.preventDefault();
        this.props.history.push(`/travelAgency/updatetrip/${tripID}`)
    }


    render() {
        return (
            <div className="container delete-trip">
            <h3><b>Update trip</b></h3>
            <div className="row dashboard-card">
            
            { this.props.trips.length > 0 
                ?
                this.props.trips.map(trip => (

                  <div className="trip-card" key={trip._id}>
                  <div className="card" style={{width: '12rem'}}>
                  <img className="card-img-top img-thumbnail" src={trip.images[0]} style={{ height:'10rem' }} alt="Card image cap" />
                  <div className="card-body">
                    <Link className="card-title trip-card-title" to={`/travelAgency/trip/${trip._id}`} ><b>{trip.title}</b></Link>
                  </div>
                  <button type="button" onClick={(e) => this.handleSubmit(e, trip._id)} ><i className="fa fa-edit"></i></button>
                </div>
                </div>
                ) ) 
  
                : 
                <p>No trip available :)</p>   
          }
          </div>

            </div>
        )
    }
}

export default UpdateTripPage;