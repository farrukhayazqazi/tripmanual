import React from 'react'
import { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class TripListing extends Component{

  state={
    trips:[]
  }

 componentDidMount = async () =>{
  let title = this.props.match.params.id;
  const BASIC_URL = "http://localhost:5000";
  
  const response = await axios.get(`${BASIC_URL}/trip/all/${title}`)
  console.log("response.data in tripListing: ",response.data)
  const trips = response.data

  if(response.data){
    this.setState({ trips })
  }
  console.log("this is the state: ",this.state.trips)
}
    render(){
    return(
        <div className='container'>
          <div className="container">
            <div className="search-title">
               <h4>Showing results for "{this.props.match.params.id}"</h4>
            </div>
            <div className="row">
             <div className="col">
               { this.state.trips ? (this.state.trips.map((trip,index) => (
                 
              <div className="card card-tripListing" key={index}>
              <div className="card-horizontal">
                <div className="img-square-wrapper">
                  <Link to={`/user/trip/${trip._id}`}><img src={trip.images[0]} alt="Card image cap" /></Link>
                </div>
                <div className="card-body">
                <Link to={`/user/trip/${trip._id}`}><h4 className="card-title"><b>{trip.title}</b></h4></Link>
                  <p className="card-text">{trip.description.slice(0,150)+"..."}</p>
                </div>
                
              </div>
              
              </div>
              
              ))) 
              :
              <p>No search results for "{this.props.match.params}"</p> }
          </div>
          
        </div>
        
      </div>
      
        </div>
        
        )
}
}

export default TripListing;