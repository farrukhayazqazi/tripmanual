import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class DeleteTripAdmin extends Component {

    state = {
        tripId : null,
        trips: [],
        searchedTrip: [],
        searchValue: []
    }

       componentDidMount = async () =>{
        const token = localStorage.getItem("token")
        const response = await axios.get("http://localhost:5000/admin/trips/latest", { headers: { "Authorization": `Bearer ${token}` } });
        if(response.data){
            console.log("DELETETRIPADMIN: ",response.data)
            return this.setState({ trips:response.data })
        }
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
        this.props.deleteTrip(this.state.tripId);
        alert('Trip deleted successfully!')
        this.props.history.push('/')
        const trips = this.state.trips.map(trip => trip._id !== this.state.tripId)
        this.setState({ trips: trips })
    }

        handleChange = (e) =>{
        if(e.target.value){
        this.setState({ [e.target.id]: e.target.value })
        }
        console.log(this.state.searchValue)
        if(this.state.searchValue.length > 1){
            this.setState({ searchedTrip: [] })
        }
    }

    handleSearch = async (e) =>{
    e.preventDefault();
    // const response = await axios.get(`http://localhost:5000//trip/all/${this.state.searchValue}`);
    let searchValue = this.state.searchValue;
    const BASIC_URL = "http://localhost:5000";
  const response = await axios.get(`${BASIC_URL}/trip/all/${searchValue}`)
    if(response.data){
        this.setState({ searchedTrip: response.data })
      }
    }
render() {
    return (
        <div className="container delete-trip">
        <h3><b>Delete trip</b></h3>
        <form className="form-inline my-2 my-lg-0" style={{justifyContent:'center'}} onSubmit={this.handleSearch} >
        <input className="form-control mr-sm-2" size="80"  onChange={this.handleChange} type="search" placeholder="Search" id="searchValue" aria-label="Search" />
        <Link className="btn btn-outline-dark my-2 my-sm-0"  type="submit"><i class="fas fa-search"></i></Link>
        </form><br/>
        <div className="row dashboard-card">
        
        { this.state.searchedTrip.length <= 0 
            ?
            this.state.trips.map(trip => (

              <div className="trip-card" key={trip._id}>
              <div className="card" style={{width: '12rem'}}>
              <img className="card-img-top img-thumbnail" src={trip.images ? trip.images.map(img =>{return img}) : null} alt="Card image cap" style={{height:'10rem'}} />
              <div className="card-body">
                <Link className="card-title trip-card-title" to={`/travelAgency/trip/${trip._id}`} ><b>{trip.title}</b></Link>
              </div>
              <button type="button" onClick={(e) => this.handleDelete(e, trip._id)} data-toggle="modal" data-target="#exampleModalCenter" className="btn btn-outline-danger btn-sm"><i className="fa fa-trash"></i></button>
            </div>
            </div>
            ) ) 

            : 
            (
            <div>
            {this.state.searchedTrip.length > 0 ?  

                  this.state.searchedTrip.map(trip => (

                    <div className="trip-card" key={trip._id}>
                    <div className="card" style={{width: '12rem'}}>
                    <img className="card-img-top img-thumbnail" src={trip.images[0]} alt="Card image cap" style={{height:'10rem'}} />
                    <div className="card-body">
                      <Link className="card-title trip-card-title" to={`/travelAgency/trip/${trip._id}`} ><b>{trip.title}</b></Link>
                    </div>
                      <button type="button" onClick={(e) => this.handleDelete(e, trip._id)} data-toggle="modal" data-target="#exampleModalCenter" className="btn btn-outline-danger btn-sm"><i className="fa fa-trash"></i></button>
                      </div>
                  </div>
                  ) )  
                : 
                (
                                  <div>
                {this.state.searchedTrip.length > 0 ?  

                     this.state.searchedTrip.map(trip => (

                        <div className="trip-card" key={trip._id}>
                        <div className="card" style={{width: '12rem'}}>
                        <img className="card-img-top img-thumbnail" src={trip.images[0]} alt="Card image cap" style={{height:'10rem'}} />
                        <div className="card-body">
                          <Link className="card-title trip-card-title" to={`/travelAgency/trip/${trip._id}`} ><b>{trip.title}</b></Link>
                        </div>
                        <button type="button" onClick={(e) => this.handleSubmit(e, trip._id)} ><i className="fa fa-edit"></i></button>
                      </div>
                      </div>
                      ) )  
                    : 
                    (
                        <p>No trip available :)</p>
                    ) 
                }
                </div>
                ) 
                  }
                    </div>
                )
                    
            
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

export default DeleteTripAdmin;