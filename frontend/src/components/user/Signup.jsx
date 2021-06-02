import React, { Component } from 'react';
import signup from '../assets/images/signup.jpg';
import { Link } from 'react-router-dom';

class Signup extends Component{

  state = {
    firstName: null ,
    lastName: null ,
    email: null ,
    password: null ,
    confirmPassword: null,
    phone: null
  }



  handleChange = (e) =>{
    this.setState({[e.target.id] : e.target.value });
  }

  handleSubmit = (e) =>{
    e.preventDefault();

    const { password, confirmPassword } = this.state;

    if(password !== confirmPassword){
      return alert("passwords do not match !")
    }

    this.props.signUp(this.state)
    this.props.history.push("/user/login")
    console.log(this.state)
    
  }
    
    render(){
        
        return(
            <div className='container auth'>
            
            <div className="row m-5 no-gutters shadow-lg">
            <div className="col-md-6 d-none d-md-block">
              <img src={signup} className="img-fluid" style={{minHeight: '100%'}} />
            </div>
            <div className="col-md-6 bg-white p-5">
              <h3 className="pb-3">Sign up</h3>
              <div className="form-style">
                <form onSubmit={this.handleSubmit} >
                <div className="form-group pb-3">    
                <input type="firstname" required="true" placeholder="First Name" className="form-control" onChange={this.handleChange} id="firstName" aria-describedby="FirstNameHelp" />   
                </div>
                <div className="form-group pb-3">    
                <input type="secondname" required="true" placeholder="Last Name" className="form-control" onChange={this.handleChange} id="lastName" aria-describedby="SecondNameHelp" />   
                </div>
                  <div className="form-group pb-3">    
                    <input type="email" required="true" placeholder="Email" className="form-control" onChange={this.handleChange} id="email" aria-describedby="emailHelp" />   
                  </div>
                  <div className="form-group pb-3">   
                    <input type="password" required="true" placeholder="Password" className="form-control" onChange={this.handleChange} id="password" />
                  </div>

                  <div className="form-group pb-3">   
                  <input type="password" required="true" placeholder="Re-enter Password" className="form-control" onChange={this.handleChange} id="confirmPassword" />
                </div>
                <div className="form-group pb-3">    
                <input type="tel" required="true" placeholder="Phone" className="form-control" onChange={this.handleChange} id="phone" aria-describedby="PhoneHelp" />   
              </div>
                  <div className="d-flex align-items-center justify-content-between">
                   
                  </div>
                  <div className="pb-2">
                    <button type="submit" className="btn btn-dark w-100 font-weight-bold mt-2">Submit</button>
                  </div>
                </form>

                { this.props.errors.length > 0 ? 
                  
                  <div className="error-messages">
                    <h6>{this.props.errors.error}</h6>
                  </div>

                  : 
                  null }

                <div className="pt-4 text-center">
                  <h6>Already have an account? <Link to="/user/login/">Login</Link></h6>
                </div>

                <div className="pt-4 text-center TLogin">
                <h6>Signup as a travel agency <Link to="/travelAgency/tsignup">TSignup</Link></h6>
              </div>
              </div>
            </div>
          </div>
        </div>  
    )

}
}
export default Signup;