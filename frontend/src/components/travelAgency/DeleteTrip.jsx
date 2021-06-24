import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class DeleteTrip extends Component {

    state = {
        tripId : null
    }

    handleDelete = (e, tripId) =>{
        e.preventDefault();
        this.setState({ tripId })
    }

    removeId = () =>{
        this.setState({ tripId: null })
        console.log("id in state: ",this.state.tripId)
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        console.log("id in state: ",this.state.tripId)
        localStorage.setItem("deleteID",this.state.tripId);
        this.props.deleteTrip(this.state.tripId);
        this.props.history.push('/travelAgency/deletetrip')
    }


    render() {



        return (
            <div className="container delete-trip">
            <h3><b>Delete trip</b></h3>
            <div className="row dashboard-card">
            
            { this.props.trips.length > 0 
                ?
                this.props.trips.map(trip => (

                  <div className="trip-card" key={trip._id}>
                  <div className="card" style={{width: '15rem'}}>
                  <img className="card-img-top img-thumbnail" src={trip.images[0]} alt="Card image cap" />
                  <div className="card-body">
                    <Link className="card-title trip-card-title" to={`/travelAgency/trip/${trip._id}`} ><b>{trip.title}</b></Link>
                  </div>
                  <button type="button" onClick={(e) => this.handleDelete(e, trip._id)} data-toggle="modal" data-target="#exampleModalCenter" className="btn btn-outline-danger btn-sm"><i className="fa fa-trash"></i></button>
                </div>
                </div>
                ) ) 
  
                : 
                <p>No trip available :)</p>   
          }
          </div>






      {/* Modal */}
      <div className="modal fade" id="exampleModalCenter" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalCenterTitle">Delete Trip</h5>
              <button onClick={this.removeId} type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span onClick={this.removeId} aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              are you sure that you want to delete this trip?
            </div>
            <div className="modal-footer">
              <button type="button" onClick={this.removeId} className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" onClick={this.handleSubmit} data-dismiss="modal" className="btn btn-danger">Delete</button>
            </div>
          </div>
        </div>
      </div>

            </div>
        )
    }
}

export default DeleteTrip;