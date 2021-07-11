import React from 'react'
import { Link } from 'react-router-dom'


const Card = ({trips}) =>{
  console.log("trips in Cards: ",trips  )
    return(
        <div className="container">
        <div className="heading">
        <h4 class="heading-1" style={{"font-family": "carson"}}><span><b>Places you would love to visit</b></span></h4>
        </div>
          <div className="row">
          {trips.length > 0 ? trips.map((trip, index) =>( 
          <div className="trip-card">
          
          
            <div className="card" style={{width: '19rem', height:'30rem', marginLeft: '21px'}}>   
            <img src={trip.images[0]} />
                <div className="card-body">
                  <Link to={`/user/trip/${trip._id}`}><h5 className="card-title"><b>{trip.title}</b></h5></Link>
                  <p style={{"font-size":"16px"}} className="card-text">{trip.description.slice(0,100)+ "..."}</p>
                  <Link href className="btn btn-outline-success btn-sm" to={`/user/trip/${trip._id}`}>Read More</Link>
                  <a href className="btn btn-outline-danger btn-sm"><i className="far fa-heart" /></a>
                  </div>
                  </div>
                 
              </div>
              )) : null }
              </div>
        </div>

    
        )
}

export default Card;