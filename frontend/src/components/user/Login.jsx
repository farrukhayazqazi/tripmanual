import React, { Component } from 'react';
import login from '../assets/images/login.jpg';
class Login extends Component{

    render(){
        
        return(
            <div className='container auth'>
            
            <div className="row m-5 no-gutters shadow-lg">
            <div className="col-md-6 d-none d-md-block">
              <img src={login} className="img-fluid" style={{minHeight: '100%'}} />
            </div>
            <div className="col-md-6 bg-white p-5">
              <h3 className="pb-3">Log in</h3>
              <div className="form-style">
                <form>
                  <div className="form-group pb-3">    
                    <input type="email" placeholder="Email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />   
                  </div>
                  <div className="form-group pb-3">   
                    <input type="password" placeholder="Password" className="form-control" id="exampleInputPassword1" />
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
                  Do no have an account? <a href="/signup/">Sign Up</a>
                </div>
              </div>
            </div>
          </div>
        </div>  
    )

}
}
export default Login;