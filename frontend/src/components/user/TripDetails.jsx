import {Component} from 'react';
import { Redirect } from 'react-router-dom';
import Review from './Review.jsx';
import axios from 'axios';


class TripDetails extends Component{

  state = {
    trip: null
  }

  

  async componentDidMount(){
    const token = localStorage.getItem("token");
    const response = await axios.get(`http://localhost:5000/trip/${this.props.match.params.id}`, { headers: { "Authorization": `Bearer ${token}` } });
    try{
      if(response.data){
        this.setState({trip: response.data});
        console.log("Trip Details state: ",this.state.trip)
      }
    }
    catch(e){
      console.log(e)   
     }
  }

  handleClick = (e) =>{
    e.preventDefault();
    this.props.history.push(`/user/BookingDetails/${this.props.match.params.id}`);
  }

    render(){
    return(
        <div className="container">
        <br/><br/><br/>
        {this.state.trip ? (<>

        <h2 style={{"fontFamily":"axis"}} ><b>{this.state.trip.title}</b></h2>
        <br/>
      <div className="row">
        <div className="col-8">
        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
        <ol className="carousel-indicators">
        {this.state.trip.images.map((trip, index) =>(<>
          <li data-target="#carouselExampleIndicators" data-slide-to={index} className={ index == 0 ? "active" : "" } />
          </>))}
        </ol>

        <div className="carousel-inner">
        {this.state.trip.images.map((image, index) => (
        <div className={`carousel-item ${index == 0 ? "active" : ""}`} key={index}>
            <img className="d-block w-100" src={image} alt="First slide" />
          <div className="carousel-caption d-none d-md-block">
            <h5><span className="badge badge-pill badge-dark">{index+1}/{this.state.trip.images.length}</span></h5>
          </div>
        </div>
        ))}
        </div>

        {this.state.trip.images.length > 1 ? (<>
        <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="sr-only">Next</span>
        </a>
        </>) : (null)}
        <br/>
        <br/>
        <br/>
        </div>

        </div>

        <div className="col-4">
        <div className="card text">
        <span className="border border-dark">
        <div className="card-header">
          Trip Manual
        </div>
        <div className="card-body">
        {console.log("trip fromadminuser: ",this.state.trip.fromadminuser)}
        {console.log("trip.owner.firstName ",this.state.trip.owner.firstName)}
        <h6>Tour Operator: <b> {this.state.trip.owner.name ? this.state.trip.owner.name : this.state.trip.owner.firstName }</b></h6>
        <br/>
        <h6>Available Seats: <b>{this.state.trip.seats}</b></h6><br/>
        <h6>Days: <b>{this.state.trip.days}</b></h6><br/>
        <h6>Departure from: <b>{this.state.trip.city}</b></h6><br/>
        <h6>Starting Date and Time: <b>{this.state.trip.startingDateAndTime[0].date}|&nbsp;{this.state.trip.startingDateAndTime[0].time}</b></h6><br/>
        <h6>Ending Date and Time: <b>{this.state.trip.endingDateAndTime[0].date}|&nbsp;{this.state.trip.endingDateAndTime[0].time}</b></h6><br/>
        <p>price per traveler: <h5><b>{this.state.trip.price}&nbsp;PKR</b></h5></p> 
        <br/>
          <a href="#" onClick={this.handleClick} className="btn btn-dark btn-lg btn-block">Book Now</a>
        </div>
        <div className="card-footer text-muted">
        
        </div>
        </span>
      </div>
        </div>
        </div>
      <br/><br/>

      <div id="accordion">
        <div className="card">
          <div className="card-header" id="headingOne">
            <h5 className="mb-0">
              <button className="btn btn collapsed" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
              <h4>Overview <i className="fas fa-chevron-circle-down"></i></h4> 
              </button>
            </h5>
          </div>
          <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
            <div className="card-body">
              {this.state.trip.description}
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header" id="headingTwo">
            <h5 className="mb-0">
              <button className="btn btn collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                <h4>What's Included <i className="fas fa-chevron-circle-down"></i></h4> 
              </button>
            </h5>
          </div>
          <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
            <div className="card-body">
            {this.state.trip.included.map(item => (
              <div>
              <li>{item}</li>
              </div>
         ))} 
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header" id="headingThree">
            <h5 className="mb-0">
              <button className="btn btn-collapsed " data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                <h4>Departure & Return <i className="fas fa-chevron-circle-down"></i></h4> 
              </button>
            </h5>
          </div>
          <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordion">
            <div className="card-body">
            <h6>Starting Date and Time: <b>{this.state.trip.startingDateAndTime[0].date}|&nbsp;{this.state.trip.startingDateAndTime[0].time}</b></h6>
            <h6>Ending Date and Time: <b>{this.state.trip.endingDateAndTime[0].date}|&nbsp;{this.state.trip.endingDateAndTime[0].time}</b></h6>
 
            </div>
          </div>
        </div>

        <div className="card">
        <div className="card-header" id="headingFour">
          <h5 className="mb-0">
            <button className="btn btn" data-toggle="collapse" data-target="#collapseFour" aria-expanded="true" aria-controls="collapseFour">
            <h4>What To Expect <i className="fas fa-chevron-circle-down"></i></h4> 
            </button>
          </h5>
        </div>
        <div id="collapseFour" className="collapse show" aria-labelledby="headingFour" data-parent="#accordion">
          <div className="card-body">
            {this.state.trip.itinerary.map((itinerary, index) => <><b>{itinerary.slice(0,5)}&nbsp;</b>{itinerary.slice(5,)}<br/><br/></>)}
         </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header" id="headingFive">
          <h5 className="mb-0">
            <button className="btn btn" data-toggle="collapse" data-target="#collapseFive" aria-expanded="true" aria-controls="collapseFive">
            <h4>Cancellation Info <i className="fas fa-chevron-circle-down"></i></h4> 
            </button>
          </h5>
        </div>
        <div id="collapseFive" className="collapse show" aria-labelledby="headingFive" data-parent="#accordion">
          <div className="card-body">
        For a full refund, cancel at least 24 hours in advance of the start date of the experience.
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header" id="headingSix">
          <h5 className="mb-0">
            <button className="btn btn" data-toggle="collapse" data-target="#collapseSix" aria-expanded="true" aria-controls="collapseSix">
            <h4>Frequently Asked Questions <i className="fas fa-chevron-circle-down"></i></h4> 
            </button>
          </h5>
        </div>
        <div id="collapseSix" className="collapse show" aria-labelledby="headingSix" data-parent="#accordion">
          <div className="card-body">
           <b>Q: What is the policy on face masks and attendee health during Tour ?</b> <br/>
           A: The policies on face masks and attendee health are: <br/><br/>
           Face masks required for guides in public areas. <br/> 
           Face masks provided for travelers Temperature checks for travelers upon arrival See all safety measures taken by Tour . <br/><br/>
           <b>Q: What is the policy on sanitization during Tour ?</b><br/>
           A: The policy on sanitization is: Hand sanitizer available to travelers and staff See all safety measures taken by Tour . <br/><br/>
           <b>Q: What is the social distancing policy during Tour ?</b><br/>
            A: The policy on social distancing is: <br/>
           Contactless payments for gratuities and add-ons See all safety measures taken by Tour .
          </div>
        </div>
      </div>


      </div>
        <br/> <br/>
        <Review/>
        </>) : null}
        </div>
        )}
}

export default TripDetails;