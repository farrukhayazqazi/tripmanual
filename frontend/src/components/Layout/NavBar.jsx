import React from 'react'
import { Component } from 'react';
import { NavLink, Link, Redirect } from 'react-router-dom';

class NavBar extends Component{

    state = {
      searchValue : null
    }

    handleChange = (e) =>{
      this.setState({ [e.target.id]: e.target.value })
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
      : (
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
              <a className="nav-link" href="#">Link</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Dropdown
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="#">Action</a>
                <a className="dropdown-item" href="#">Another action</a>
                <div className="dropdown-divider" />
                <a className="dropdown-item" href="#">Something else here</a>
              </div>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/user/bookings/all">Bookings</Link>
            </li>
          </ul>


          <form className="form-inline my-2 my-lg-0" action={`/user/tripListing/${this.state.searchValue}`}>
            <input className="form-control mr-sm-2" type="search" onChange={this.handleChange} placeholder="Search" id="searchValue" aria-label="Search" />
            <a className="btn btn-outline-success my-2 my-sm-0" href={`/user/tripListing/${this.state.searchValue}`} type="submit"><i class="fas fa-search"></i></a>
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
      )}

      </div>
    )
}
}

export default NavBar;