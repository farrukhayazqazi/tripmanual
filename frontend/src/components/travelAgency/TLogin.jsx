import React, { Component } from 'react';
import tlogin from '../assets/images/tlogin.jpg';
import { Link } from 'react-router-dom';
class TLogin extends Component{

    state={
      email: null,
      password: null
    }

    handleChange = (e) =>{
      this.setState({ [e.target.id]: e.target.value })
    }

    handleSubmit = (e) =>{
      e.preventDefault();
      this.props.tAuthenticate(this.state);
      // this.props.history.push("/travelAgency/dashboard")
    }

    render(){
        
        return(
            <div className='container'>
            
            <div className="row m-5 no-gutters shadow-lg">
            <div className="col-md-6 d-none d-md-block">
              <img src={tlogin} className="img-fluid" style={{minHeight: '100%'}} />
            </div>
            <div className="col-md-6 bg-white p-5">
              
              <h3 className="pb-3">Log in</h3>
              <div className="form-style">
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group pb-3">    
                    <input type="email" placeholder="Email" className="form-control" required="true" onChange={this.handleChange} id="email" aria-describedby="emailHelp" />   
                  </div>
                  <div className="form-group pb-3">   
                    <input type="password" placeholder="Password" className="form-control" required="true" onChange={this.handleChange} id="password" />
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center"><input name type="checkbox" defaultValue /> <span className="pl-2 font-weight-bold">Remember Me</span></div>
                    <div><a href="#">Forget Password?</a></div>
                  </div>
                  <div className="pb-2">
                    <button type="submit" className="btn btn-dark w-100 font-weight-bold mt-2">Submit</button>
                  </div>
                </form>

                <div className="pt-4 text-center">
                  <h6>Want to sign up as a travel agency? <Link to="/travelAgency/tsignup/">Sign Up</Link></h6>
                </div>


              </div>
              </div>
            </div>
    
        </div>  
    )

}
}
export default TLogin;