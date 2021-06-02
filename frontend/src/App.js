import './App.css';
import Home from './components/user/Home.jsx';
import NavBar from './components/Layout/NavBar.jsx';
import Footer from './components/Layout/Footer.jsx';
import Banner from './components/user/Banner.jsx'
import Card from './components/user/Card.jsx'
import TripDetails from './components/user/TripDetails.jsx'
import BookingDetails from './components/user/BookingDetails.jsx'
import Login from './components/user/Login.jsx'
import TLogin from './components/travelAgency/TLogin.jsx'
import { BrowserRouter, Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import Signup from './components/user/Signup.jsx';
import TSignup from './components/travelAgency/TSignup.jsx';
import Dashboard from './components/travelAgency/Dashboard';
import CreateTrip from './components/travelAgency/CreateTrip';
import { Component } from 'react';
import axios from "axios";


class App extends Component {

  state = {
    isLogin: false,
    name: [],
    errors: []
  }

  authenticationCheck = (loginStatus) =>{
    if(!loginStatus){

      return <Redirect to='/user/login' />
    }
  }


  render(){

    // basic URL
    const BASIC_URL = "http://localhost:5000";


    // TO SIGNUP/REGISTER A NEW USER
    const signUp = async (user) =>{

      const response = await axios.post(`${BASIC_URL}/users/signup`,{
                                                                      firstName: user.firstName,
                                                                      lastName: user.lastName,
                                                                      email: user.email,
                                                                      password: user.password,
                                                                      phone: user.phone 
                                                                    });


          try{

            if(response.data.token){
              <Redirect to="/user/login" />
              alert("User registered!")
            }
            else{
              const errors = [];
              errors.push(response.data.error)
              alert(response.data.error)
            }

          }
          catch(e){
            alert(e)
            console.log(e)
          }

    }


  // TO AUTHENTICATE/LOGIN A USER
  const authenticate = async (user) =>{

    const response = await axios.post(`${BASIC_URL}/users/login`, {
                                                                    email: user.email,
                                                                    password: user.password  
                                                                  })
                                                                
      console.log("response.data in login react user: ",response.data.error)
      
    try{
      if(response.data.token){
        localStorage.setItem("token", response.data.token)
        const name = [response.data.user.firstName];
        console.log("name: ",response.data.user.firstName)
        this.setState({ isLogin: true, name})
      }
      else{
        const errors = [];
        errors.push(response.data.error)
        alert(response.data.error)
      }
    }
    catch(e){
      alert(e)
      console.log(e)
    }
  }  


  // TO LOGOUT/SIGNOUT A USER OR A TRAVEL AGENT/TRIP OPERATOR
  const logout = () =>{
    localStorage.removeItem("token");
    this.setState({ isLogin: false });
  }



  //////////////////// TRAVEL AGENCY FUNCTIONS //////////////////////////




  // TO SIGNUP/REGISTER NEW TRAVEL AGENCY/TRIP OPERATOR
  const tsignUp = async (travelAgency) =>{

    const response = await axios.post(`${BASIC_URL}/travelAgency/signup`,{
                                                                    name: travelAgency.name,
                                                                    email: travelAgency.email,
                                                                    password: travelAgency.password,
                                                                    phone: travelAgency.phone 
                                                                  });
        try{

          if(response.data.token){
            <Redirect to="/travelAgency/tlogin" />
            alert("Travel Agency registered!")
          }
          else{
            const errors = [];
            errors.push(response.data.error)
            alert(response.data.error)
          }

        }
        catch(e){
          alert(e)
          console.log(e)
        }

  }

// TO AUTHENTICATE/LOGIN A TRAVEL AGENC/TRIP OPERATOR
const tAuthenticate = async (travelAgency) =>{

  const response = await axios.post(`${BASIC_URL}/travelAgency/login`, {
                                                                  email: travelAgency.email,
                                                                  password: travelAgency.password  
                                                                })

      console.log("response in tAuthenticate: ",response.data)
  try{
    if(response.data.token){
      localStorage.setItem("token", response.data.token)
      const name = [response.data.travelagency.name];
      this.setState({ isLogin: true, name})
      alert("Travel Agency Authenticated !")
      return <Redirect to="/"/>
    }
    else{
      const errors = [];
      errors.push(response.data.error)
      alert(response.data.error)
    }
  }
  catch(e){
    alert(e)
    console.log(e)
  }
}  


  return (
    <BrowserRouter>
    <div className="App">
    <NavBar isLogin={this.state.isLogin} logout={logout} name={this.state.name} />
    {this.authenticationCheck(this.state.isLogin)}
    <Route exact path='/' render={(props) => <Banner {...props} /> } />
    {/*User Routes*/}
    <Route path='/user/trip/:id' render={(props) => <TripDetails {...props} /> } />
    <Route path='/user/BookingDetails/:id' render={(props) => <BookingDetails {...props} /> } />
    <Route path='/user/login/' render={(props) => <Login {...props}  authenticate={authenticate} /> } />
    <Route path='/user/signup/' render={(props) => <Signup {...props} signUp={signUp} errors={this.state.errors} /> } />

    {/*Travel Agency Routes*/}
    <Route path='/travelAgency/tlogin/' render={(props) => <TLogin {...props} tAuthenticate={tAuthenticate} /> } />
    <Route path='/travelAgency/tsignup/' render={(props) => <TSignup {...props} tsignUp={tsignUp} /> } />
    <Route exact path='/travelAgency/dashboard' render={(props) => <Dashboard {...props} /> } />
    <Route exact path='/travelAgency/createtrip' render={(props) => <CreateTrip {...props} /> } />
    <Footer />
    </div>
    </BrowserRouter>
  );

  }
}

export default App;
