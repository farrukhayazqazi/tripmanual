import { Component } from 'react'
import dashboard from '../assets/images/dashboard.jpg';
import create from '../assets/images/create.jpg';
import update from '../assets/images/update.jpg';
import deletee from '../assets/images/deletee.jpg';

class Dashboard extends Component {
    
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
              <button className="btn btn-success" href="#">Create Trip</button>
            </div>
          </div>
        </div>

        

        <div className="col">
        <div className="card">
          <img className="card-img" src={update} alt="Bologna" />
          <div className="card-img-overlay text-white d-flex flex-column justify-content-center">
          <button className="btn btn-warning" href="#">Update Trip</button>
          </div>
        </div>
      </div>

      

      <div className="col">
      <div className="card">
        <img className="card-img" style={{paddingBottom: "60px"}} src={deletee} alt="Bologna" />
        <div className="card-img-overlay text-dark d-flex flex-column justify-content-center">
        <button className="btn btn-danger" href="#">Delete Trip</button>
        </div>
      </div>
    </div>

    



        
      </div>
        


        </div>
    );
}
}

export default Dashboard;
