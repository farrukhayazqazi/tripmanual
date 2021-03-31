import React, { Component } from 'react';
import tsignup from '../assets/images/tsignup.jpg';

class TSignup extends Component{

    
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
                <form>
                <div className="form-group pb-3">    
                <input type="firstname" placeholder="FirstName" className="form-control" id="exampleInputFirstName" aria-describedby="FirstNameHelp" />   
                </div>
                <div className="form-group pb-3">    
                <input type="secondname" placeholder="SecondName" className="form-control" id="exampleInputSecondName" aria-describedby="SecondNameHelp" />   
                </div>
                  <div className="form-group pb-3">    
                    <input type="email" placeholder="Email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />   
                  </div>
                  <div className="form-group pb-3">   
                    <input type="password" placeholder="Password" className="form-control" id="exampleInputPassword1" />
                  </div>

                  <div className="form-group pb-3">   
                  <input type="password" placeholder="Re-enter Password" className="form-control" id="exampleInputPassword1" />
                </div>
                <div className="form-group pb-3">    
                <input type="tel" placeholder="Phone" className="form-control" id="exampleInputPhone" aria-describedby="PhoneHelp" />   
              </div>
                  <div className="d-flex align-items-center justify-content-between">
                   
                  </div>
                  <div className="pb-2">
                    <button type="submit" className="btn btn-dark w-100 font-weight-bold mt-2">Submit</button>
                  </div>
                </form>

                <div className="pt-4 text-center">
                <h6>Want to login in as a travel agency? <a href="/travelAgency/tlogin/">Login</a></h6>
                </div>

              </div>
            </div>
          </div>
        </div>  
    )

}
}
export default TSignup;