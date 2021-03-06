import React, { Component } from 'react';
import tsignup from '../assets/images/tsignup.jpg';
import { Link } from 'react-router-dom';

class TSignup extends Component{

    state = {
      name: null,
      email: null,
      password: null,
      confirmPassword: null,
      phone: null
    }

    handleChange = (e) =>{
      this.setState({ [e.target.id] : e.target.value })
    };

    handleSubmit = (e) =>{
      e.preventDefault();

      const { password, confirmPassword, phone } = this.state;

      if(password !== confirmPassword){
        return alert("passwords do not match !")
      }
  
      if(password.length <= 6){
        return alert("password should be atleast 7 characters long!")
      }
  
  
      if(phone.toString().length !== 11 ){
        return alert("please enter correct phone number (11 digits)") 
      }
  
      this.props.tsignUp(this.state);
      this.props.history.push("/travelAgency/tlogin")
    }
    
    render(){
        
        return(
            <div className='container auth'>
            
            <div className="row m-5 no-gutters shadow-lg">
            <div className="col-md-6 d-none d-md-block">
              <img src={tsignup} className="img-fluid" style={{minHeight: '100%'}} />
            </div>
            <div className="col-md-6 bg-white p-5">
              <h3 className="pb-3">Sign up</h3>
              <div className="form-style">
                <form onSubmit={this.handleSubmit}>
                <div className="form-group pb-3">    
                <input type="firstname" placeholder="Travel Agency Name" className="form-control" required="true" onChange={this.handleChange} id="name" aria-describedby="FirstNameHelp" />   
                </div>
                  <div className="form-group pb-3">    
                    <input type="email" placeholder="Email" className="form-control" required="true" onChange={this.handleChange} id="email" aria-describedby="emailHelp" />   
                  </div>
                  <div className="form-group pb-3">   
                    <input type="password" placeholder="Password" className="form-control" required="true" onChange={this.handleChange} id="password" />
                  </div>

                  <div className="form-group pb-3">   
                  <input type="password" placeholder="Re-enter Password" className="form-control" required="true" onChange={this.handleChange} id="confirmPassword" />
                </div>
                <div className="form-group pb-3">    
                <input type="number" placeholder="Phone" className="form-control" required="true" onChange={this.handleChange} id="phone" aria-describedby="PhoneHelp" />   
              </div>
                  <div className="d-flex align-items-center justify-content-between">
                   
                  </div>
                  <div className="pb-2">
                    <button type="submit" className="btn btn-dark w-100 font-weight-bold mt-2">Submit</button>
                  </div>
                </form>

                <div className="pt-4 text-center">
                <h6>Want to login in as a travel agency? <Link to="/travelAgency/tlogin/">Login</Link></h6>
                </div>

              </div>
            </div>
          </div>
        </div>  
    )

}
}
export default TSignup;