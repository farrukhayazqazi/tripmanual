import React, { Component } from 'react';
import login from '../assets/images/login.jpg';
import { Link } from "react-router-dom";
class Login extends Component{

    state = {
      email: null,
      password: null
    }

    
  handleChange = (e) =>{
    this.setState({[e.target.id] : e.target.value });
  }

  handleSubmit = (e) =>{
    e.preventDefault();
    this.props.authenticate(this.state)
  }

    render(){
        
        return(
            <div className='container'>

            <div className="row m-5 no-gutters shadow-lg">  
            <div className="col-md-6 d-none d-md-block">
              <img src={login} className="img-fluid" style={{minHeight: '100%'}} />
            </div>
            <div className="col-md-6 bg-white p-5">
              
              <h3 className="pb-3">Log in</h3>
              <div className="form-style">
                <form  onSubmit={this.handleSubmit} >                                    
                  <div className="form-group pb-3">    
                    <input type="email" placeholder="Email" required="true" className="form-control" onChange={this.handleChange} id="email" aria-describedby="emailHelp" />   
                  </div>
                  <div className="form-group pb-3">   
                    <input type="password" placeholder="Password" required="true" className="form-control" onChange={this.handleChange} id="password" />
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
                  <h6>Do not have an account? <Link to="/user/signup/">Sign Up</Link></h6>
                </div>

                <div className="pt-4 text-center TLogin">
                <h6>Login as a travel agency <Link to="/travelAgency/tlogin/">TLogin</Link></h6>
              </div>
            </div>
              </div>
            </div>
    
        </div>  
    )

}
}
export default Login;