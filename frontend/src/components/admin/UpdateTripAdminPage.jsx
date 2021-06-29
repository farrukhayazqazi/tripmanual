import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class UpdateTripAdminPage extends Component {

    state = {
        trips: [],
        searchedTrip: [],
        searchValue: []
    }

    componentDidMount = async () =>{
        const token = localStorage.getItem("token")
        const response = await axios.get("http://localhost:5000/admin/trips/latest", { headers: { "Authorization": `Bearer ${token}` } });
        if(response.data){
            console.log(response.data)
            return this.setState({ trips:response.data })
        }
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

    handleSubmit = (e, tripID) =>{
        e.preventDefault();
        this.props.history.push(`/admin/updatetrip/${tripID}`)
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
            <h3><b>Update trip</b></h3>
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
                  <img style={{height:'10rem'}} className="card-img-top img-thumbnail" src={trip.images[0]} alt="Card image cap" />
                  <div className="card-body">
                    <Link className="card-title trip-card-title" to={`/travelAgency/trip/${trip._id}`} ><b>{trip.title}</b></Link>
                  </div>
                  <button type="button" onClick={(e) => this.handleSubmit(e, trip._id)} ><i className="fa fa-edit"></i></button>
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
                        <img style={{height:'10rem'}} className="card-img-top img-thumbnail" src={trip.images[0]} alt="Card image cap" />
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

            </div>
        )
    }
}

export default UpdateTripAdminPage;