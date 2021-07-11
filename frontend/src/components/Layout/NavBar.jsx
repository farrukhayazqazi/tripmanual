import React from 'react'
import { Component } from 'react';
import { NavLink, Link, Redirect } from 'react-router-dom';
import axios from 'axios';
class NavBar extends Component{

    state = {
      searchValue : null
    }

    handleChange = (e) =>{
      this.setState({ [e.target.id]: e.target.value })
    }

    handleSubmit = async (e) =>{
      e.preventDefault();
      let searchValue = this.state.searchValue;

      // const { searchValue } = this.state
      const BASIC_URL = "http://localhost:5000";
      
      const response = await axios.get(`${BASIC_URL}/trip/all/${searchValue}`)
      console.log("response.data in tripListing: ",response.data)
      const trips = response.data
    
      
      if(response.data){
        this.props.mapTripsToState(trips)
        this.props.history.push(`/user/tripListing/${searchValue}`);
        document.getElementById('city').selectedIndex = 0; 
        document.getElementById('searchValue').value = ''
      }
      else{
        console.log("trip not found!")
      }

    }


    render(){
    return(
        <div>
        { this.props.travelAgencyAuthenticated ? (
        
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className='container'>
        <NavLink className="navbar-brand" to="/travelAgency/Dashboard">Trip Manual</NavLink>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>


        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <NavLink className="nav-link" to="/travelAgency/dashboard"><span className="sr-only"></span></NavLink>
            </li>
            <NavLink className="nav-link" to="/travelAgency/dashboard">Dashboard <span className="sr-only"></span></NavLink>
            <NavLink className="nav-link" to="/travelAgency/getBookings">Bookings</NavLink>
            </ul>



          </div>

         { localStorage.getItem("token") ? 
          
          <>
          <ul className="navbar-nav mr-auto">
          <li className="navbar-nav">
            <a id="username">&nbsp;{this.props.name} |</a>
            <a ><NavLink className="nav-link" onClick={() =>this.props.logout()} to="/user/login/">Logout </NavLink><span className="sr-only">(current)</span></a>
          </li>
          </ul>
          </>
          : 
          
          <>
          <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <a className="nav-link"><NavLink className="nav-link" to="/user/login/">Login </NavLink><span className="sr-only">(current)</span></a>
          </li>

          <li className="nav-item">
          <a className="nav-link"><NavLink className="nav-link" to="/user/signup/">Signup</NavLink><span className="sr-only">(current)</span></a>
          </li>
          </ul>
          </> }


          
        </div>
      </nav>

      ) 
      : ( this.props.adminAuthenticated ? 
      
      (<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className='container'>
        <NavLink className="navbar-brand" to="/">Trip Manual</NavLink>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>


        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <NavLink className="nav-link" to="/">Home <span className="sr-only"></span></NavLink>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/travelAgency/dashboard">Dashboard</Link>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Bookings
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          
                <Link className="dropdown-item" to="/user/bookings/all">My Bookings</Link>
                <div className="dropdown-divider" />
                <Link className="dropdown-item" to="/travelAgency/getBookings">Trips Booked</Link>
                <div className="dropdown-divider" />
                <Link className="dropdown-item" to="/admin/all/bookings">All bookings</Link>
              </div>
            </li>
            <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Trip
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">        
              <Link className="dropdown-item" to="/admin/updatetrip">Update Trip</Link>
              <div className="dropdown-divider" />
              <Link className="dropdown-item" to="/admin/deletetrip">Delete Trip</Link>
            </div>
          </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/approvePayments">Approve Payments</Link>
            </li>
          </ul>


          <form className="form-inline my-2 my-lg-0" onSubmit={this.handleSubmit}>
            <input className="form-control mr-sm-2" type="search" onChange={this.handleChange} placeholder="Search" id="searchValue" aria-label="Search" />
            <Link className="btn btn-outline-success my-2 my-sm-0" to={`/user/tripListing/${this.state.searchValue}`} type="submit"><i class="fas fa-search"></i></Link>
          </form>
          </div>

         { localStorage.getItem("token") ? 
          
          <>
          <ul className="navbar-nav mr-auto">
          <li className="navbar-nav">
            <a id="username">&nbsp;{this.props.name} |</a>
            <a ><NavLink className="nav-link" onClick={() =>this.props.logout()} to="/user/login/">Logout </NavLink><span className="sr-only">(current)</span></a>
          </li>
          </ul>
          </>
          : 
          
          <>
          <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <a className="nav-link"><NavLink className="nav-link" to="/user/login/">Login </NavLink><span className="sr-only">(current)</span></a>
          </li>

          <li className="nav-item">
          <a className="nav-link"><NavLink className="nav-link" to="/user/signup/">Signup</NavLink><span className="sr-only">(current)</span></a>
          </li>
          </ul>
          </> }


          
        </div>
      </nav>) 
      : 
      (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className='container'>
        <NavLink className="navbar-brand" to="/">Trip Manual</NavLink>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>


        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <NavLink className="nav-link" to="/">Home <span className="sr-only"></span></NavLink>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link" to="/contact">Contact</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/user/bookings/all">Bookings</Link>
            </li>
          </ul>


          <form className="form-inline my-2 my-lg-0" onSubmit={this.handleSubmit}>
            <input className="form-control mr-sm-2" type="search" onChange={this.handleChange} placeholder="Search" id="searchValue" aria-label="Search" />
            <Link className="btn btn-outline-success my-2 my-sm-0" to={`/user/tripListing/${this.state.searchValue}`} type="submit"><i class="fas fa-search"></i></Link>
          </form>
          </div>

         { localStorage.getItem("token") ? 
          
          <>
          <ul className="navbar-nav mr-auto">
          <li className="navbar-nav">
            <a id="username">&nbsp;{this.props.name} |</a>
            <a ><NavLink className="nav-link" onClick={() =>this.props.logout()} to="/user/login/">Logout </NavLink><span className="sr-only">(current)</span></a>
          </li>
          </ul>
          </>
          : 
          
          <>
          <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <a className="nav-link"><NavLink className="nav-link" to="/user/login/">Login </NavLink><span className="sr-only">(current)</span></a>
          </li>

          <li className="nav-item">
          <a className="nav-link"><NavLink className="nav-link" to="/user/signup/">Signup</NavLink><span className="sr-only">(current)</span></a>
          </li>
          </ul>
          </> }


          
        </div>
      </nav>  
      )
        
      )}

      </div>
    )
}
}

export default NavBar;