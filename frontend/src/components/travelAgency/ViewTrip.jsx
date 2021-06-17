import {Component} from 'react';
import { Redirect, Link } from 'react-router-dom';


class ViewTrip extends Component{

  state = {
    id: null,
    trip: [] 
  }


  async componentDidMount(){
      let tripId = this.props.match.params.id;
      const trip = this.props.trips.filter(trip => trip._id == tripId)
        this.setState({ trip })
    }

  handleClick = (e) =>{
    e.preventDefault();
    this.props.history.push(`/user/BookingDetails/${this.state.id}`);
  }

    render(){
    return(
        
        
        <div className="container">
        
        <br/><br/>

        <div aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/travelAgency/dashboard">Dashboard</Link></li>
          <li className="breadcrumb-item active" aria-current="page">{this.state.trip.map(trip =>trip.title)}</li>
        </ol>      
        </div>
        <br/>
        {this.state.trip.length > 0 ? (<> 
            {this.state.trip.map(trip => (<> 
        <h2>{trip.title}</h2>
        <br/>
      <div className="row">
        <div className="col-8">
        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
        <ol className="carousel-indicators">
          <li data-target="#carouselExampleIndicators" data-slide-to={0} className="active" />
          <li data-target="#carouselExampleIndicators" data-slide-to={1} />
          <li data-target="#carouselExampleIndicators" data-slide-to={2} />
          <li data-target="#carouselExampleIndicators" data-slide-to={3} />
          <li data-target="#carouselExampleIndicators" data-slide-to={4} />
        </ol>


                <div className="carousel-inner">
                

                {trip.images.map((image, index) => (
                <div className={`carousel-item ${index == 0 ? "active" : ""}`} key={index}>
                    <img className="d-block w-100" src={image} alt="First slide" />
                </div>
                ))}
                </div>
                


        <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="sr-only">Next</span>
        </a>
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
          <h6>Tour Operator: <b> {this.props.tripOperator}</b></h6><br/>
          <h6>Available Seats: <b>{trip.seats}</b></h6><br/>
          <h6>Days: <b>{trip.days}</b></h6><br/>
          <h6>Departure from: <b>{trip.city}</b></h6><br/>
          <h6>Starting Date and Time: <b>{trip.startingDateAndTime[0].date}|&nbsp;{trip.startingDateAndTime[0].time}</b></h6><br/>
          <h6>Ending Date and Time: <b>{trip.endingDateAndTime[0].date}|&nbsp;{trip.endingDateAndTime[0].time}</b></h6><br/>
          <p>price per traveler: <h5><b>{trip.price}&nbsp;PKR</b></h5></p>
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
              {trip.description}
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
             {trip.included.map(item => (
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
            <h6>Starting Date and Time: <b>{trip.startingDateAndTime[0].date}|&nbsp;{trip.startingDateAndTime[0].time}</b></h6>
            <h6>Ending Date and Time: <b>{trip.endingDateAndTime[0].date}|&nbsp;{trip.endingDateAndTime[0].time}</b></h6>
  
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
            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
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
            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
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
            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
          </div>
        </div>
      </div>


      </div>
        <br/> <br/>
        </>))}
        </>) : null }
        </div>
        )}
}

export default ViewTrip;