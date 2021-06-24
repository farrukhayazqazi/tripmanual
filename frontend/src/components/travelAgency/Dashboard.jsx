import { Component } from 'react'
import dashboard from '../assets/images/dashboard.jpg';
import create from '../assets/images/create.jpg';
import update from '../assets/images/update.jpg';
import deletee from '../assets/images/deletee.jpg';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Dashboard extends Component {

  // state = {
  //   trips: []
  // }

  async componentDidMount(){
      let BASIC_URL = "http://localhost:5000";
      const token = localStorage.getItem("token");

      if(token){
        try{
          const response = await axios.get(`${BASIC_URL}/trip/travelagency/all`, { headers: { "Authorization": `Bearer ${token}` } });
          console.log("Trips are retrieved: ",response.data);
          const trips = response.data
          // this.setState({trips})
          this.props.mapTripsToState(trips);
        }
        catch(e){
          console.log("Unable to retrieve trips!")
        }
      }


  }


    
    render(){
    
    return (
        <div className="container dashboard">
        
        <div className="jumbotron jumbotron-fluid">
            <div>
            <h1>Travel Agency - Dashboard</h1>
            </div>
        </div>


        
        <div className="row dashboard-card">
        <div className="col">
          <div className="card">
            <img className="card-img" src={create} alt="Bologna" />
            <div className="card-img-overlay text-white d-flex flex-column justify-content-center">
              <Link className="btn btn-success" to="/travelAgency/createtrip">Create Trip</Link>
            </div>
          </div>
        </div>

        

        <div className="col">
        <div className="card">
          <img className="card-img" src={update} alt="Bologna" />
          <div className="card-img-overlay text-white d-flex flex-column justify-content-center">
          <Link className="btn btn-warning" to="/travelAgency/updatetrip">Update Trip</Link>
          </div>
        </div>
      </div>

      

      <div className="col">
      <div className="card">
        <img className="card-img" style={{paddingBottom: "60px"}} src={deletee} alt="Bologna" />
        <div className="card-img-overlay text-dark d-flex flex-column justify-content-center">
        <Link className="btn btn-danger" to="/travelAgency/deletetrip">Delete Trip</Link>
        </div>
      </div>
    </div>
      </div>
        
 
      <h1><hr/>My Trips</h1>
      <br/>
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
              </div>
              </div>
              ) ) 

              : 
              <p>No trip available :)</p>
            
        }




        

      </div>



        </div>
    );
}
}

export default Dashboard;
