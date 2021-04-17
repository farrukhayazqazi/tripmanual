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
              <a className="btn btn-success" href="/travelAgency/createtrip">Create Trip</a>
            </div>
          </div>
        </div>

        

        <div className="col">
        <div className="card">
          <img className="card-img" src={update} alt="Bologna" />
          <div className="card-img-overlay text-white d-flex flex-column justify-content-center">
          <a className="btn btn-warning" href="#">Update Trip</a>
          </div>
        </div>
      </div>

      

      <div className="col">
      <div className="card">
        <img className="card-img" style={{paddingBottom: "60px"}} src={deletee} alt="Bologna" />
        <div className="card-img-overlay text-dark d-flex flex-column justify-content-center">
        <a className="btn btn-danger" href="#">Delete Trip</a>
        </div>
      </div>
    </div>
      </div>
        
 
      <h1><hr/>My Trips</h1>
      <br/>
      <div className="row dashboard-card">
        
        <div className="col">
          <div className="card" style={{width: '20rem'}}>
          <img className="card-img-top" src="..." alt="Card image cap" />
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" className="btn btn-primary">Go somewhere</a>
          </div>
        </div>
      </div>

      <div className="col">
        <div className="card" style={{width: '20rem'}}>
        <img className="card-img-top" src="..." alt="Card image cap" />
        <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <a href="#" className="btn btn-primary">Go somewhere</a>
        </div>
      </div>
    </div>

    <div className="col">
    <div className="card" style={{width: '20rem'}}>
    <img className="card-img-top" src="..." alt="Card image cap" />
    <div className="card-body">
      <h5 className="card-title">Card title</h5>
      <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      <a href="#" className="btn btn-primary">Go somewhere</a>
    </div>
  </div>
</div>

        

      </div>



        </div>
    );
}
}

export default Dashboard;
