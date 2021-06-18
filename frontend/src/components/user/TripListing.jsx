import React from 'react'
import { Component } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const TripListing = ({ mapTripsToState, trips }) =>{

  
const { id } = useParams();

const retrieveTrips = async (e) =>{
  console.log("retrieveTrips: ",e.target.value);

  let title = id;
  let city = e.target.value;
  const BASIC_URL = "http://localhost:5000";

  const response = await axios.get(`${BASIC_URL}/trip/${city}/${title}`)
  console.log("trip retrieved in retrieveTrips: ",response.data)
  console.log("URL: ",`${BASIC_URL}/trip/${city}/${title}`)
  if(response.data){
    mapTripsToState(response.data)
}
else{
  console.log('error')
}
}


  
      
    return(
        <div className='container'>
        <div className="container">
          <div className="form-group col-md-3 location-menu">
            <label><i className="fas fa-map-marker-alt"></i></label>
              <select id="city" onChange={retrieveTrips} className="form-control">
                  <option selected={true} disabled={true}>Departure from:</option>
                  <option>Lahore</option>
                  <option>Islamabad</option>
                  <option>Karachi</option>
                  <option>Rawalpindi</option>
                  <option>Quetta</option>
                  <option>Multan</option>
              </select>
              <input type="reset" value="Reset" />
          </div>
            <div className="search-title">
               <h4>Showing results for "{id}"</h4>
            </div>
            <div className="row">
             <div className="col">
               { trips ? (trips.map((trip,index) => (
                 
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
              (<p>No search results for "{id}"</p>)
             }
          </div>
          
        </div>
        
      </div>
      
        </div>
        
        )

}


export default TripListing;