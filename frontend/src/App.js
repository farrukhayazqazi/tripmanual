import './App.css';
import Home from './components/user/Home.jsx';
import NavBar from './components/Layout/NavBar.jsx';
import Footer from './components/Layout/Footer.jsx';
import Banner from './components/user/Banner.jsx'
import Trips from './components/user/Trips.jsx'
import TripDetails from './components/user/TripDetails.jsx'
import TripListing from './components/user/TripListing.jsx'
import CreateBooking from './components/user/CreateBooking.jsx'
import Login from './components/user/Login.jsx'
import UserBookings from './components/user/UserBookings.jsx'
import TLogin from './components/travelAgency/TLogin.jsx'
import { BrowserRouter, Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import Signup from './components/user/Signup.jsx';
import TSignup from './components/travelAgency/TSignup.jsx';
import Dashboard from './components/travelAgency/Dashboard';
import CreateTrip from './components/travelAgency/CreateTrip';
import { Component } from 'react';
import axios from "axios";
import UserGuardedRoute from './components/UserGuardedRoute';
import TravelAgencyGuardedRoute from './components/TravelAgencyGuardedRoute';
import UserAuthCheck from './components/UserAuthCheck';
import UserSignupCheck from './components/UserSignupCheck';
import TravelAgencyAuthCheck from './components/TravelAgencyAuthCheck';
import TravelAgencySignupCheck from './components/TravelAgencySignupCheck';
import ViewTrip from './components/travelAgency/ViewTrip';
import DeleteTrip from './components/travelAgency/DeleteTrip';
import UpdateTripPage from './components/travelAgency/UpdateTripPage';
import UpdateTrip from './components/travelAgency/UpdateTrip';
import UpdateTripAdminPage from './components/admin/UpdateTripAdminPage';
import UpdateTripAdmin from './components/admin/UpdateTripAdmin';
import DeleteTripAdmin from './components/admin/DeleteTripAdmin';
import ViewBookings from './components/travelAgency/ViewBookings';
import ApprovePayments from './components/admin/ApprovePayments';
import ApprovePaymentPage from './components/admin/ApprovePaymentPage';


class App extends Component {

  state = {
    userAuthenticated: false,
    travelAgencyAuthenticated: false,
    adminAuthenticated: false,
    name: [],
    errors: [],
    trips: [],
    bookings: []
  }
////////////////////////////////////////////////////////////////////////////////////////////////
componentDidMount = async () =>{

  const token = localStorage.getItem("token");
  console.log("token: ",token)
  const trips = await axios.get("http://localhost:5000/trips/latest");
     this.setState({ trips: trips.data })

    try{
      if(token){
      const response = await axios.get("http://localhost:5000/travelAgency/authenticated", { headers: { "Authorization": `Bearer ${token}` } });
          if(response.data == "travel agency not found!"){
               const res = await axios.get("http://localhost:5000/user/authenticated", { headers: { "Authorization": `Bearer ${token}` } });
                      
            if(res.data){
              const bookings = await axios.get("http://localhost:5000/user/bookings/all", { headers: { "Authorization": `Bearer ${token}` } });
                if(res.data.role == "user"){
                 return this.setState({ userAuthenticated: true, name: res.data.firstName, bookings: bookings.data })    
                }
                
              else if(res.data.role == "admin"){
              return this.setState({ adminAuthenticated: true, name: res.data.firstName, bookings: bookings.data })
              }
            }
            else{
              this.setState({ userAuthenticated: false, travelAgencyAuthenticated: false, name: res.data.firstName })
            }
            
          }
          else{
            return this.setState({ travelAgencyAuthenticated: true, name: response.data });
          }
        }

    }
    catch(e){
      console.log(e)
      }
    
  


}

/////////////////////////
  authenticationCheck = (token) =>{
    if(!token){
      return <Redirect to='/user/login' />
    }
  }


  render(){

    // basic URL
    const BASIC_URL = "http://localhost:5000";

/////////////////////*************** USER RELATED FUNCTIONS ********************////////////////

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
                                                                
      console.log("response.data in login react user: ",response.data)
      
    try{
      if(response.data.token){
          localStorage.setItem("token", response.data.token)
          const name = [response.data.user.firstName];

        if(response.data.user.role == "admin"){
        console.log("name: ",response.data.user.firstName)
        return this.setState({ adminAuthenticated:true, name})
        }

        else{
        console.log("name: ",response.data.user.firstName)
        return this.setState({ userAuthenticated:true, name})
        }
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
    this.setState({ userAuthenticated: false, adminAuthenticated: false, travelAgencyAuthenticated: false, bookings: [] });
  }

  //  TO CREATE A BOOKING FOR A NEW TRIP

const createBooking = async (booking) =>{

  let token = localStorage.getItem("token");

  const response = await axios.post(`${BASIC_URL}/user/createBooking`,
            {
              trip: booking.trip._id,
              trip_details: booking.trip,
              seats_booked: booking.travelersDetail.length,
              traveler_details: booking.travelersDetail,
              total_amount: booking.totalAmount,
              payment_screenshot: booking.paymentScreenshot
            }, {
              headers: { "Authorization": `Bearer ${token}` }
            })

            console.log("response.data of booking from backend: ", response.data)

            try{
              if(response.data){
                let bookings = [...this.state.bookings, response.data]
                this.setState({ bookings })
              }
            }
            catch(e){
              console.log("Unable to create booking!",e);
            }
}



  ////////////////////*************** TRAVEL AGENCY FUNCTIONS ***************//////////////////////////




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
      this.setState({ travelAgencyAuthenticated: true, name})
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

//////////////////////////////****************TRIP RELATED FUNCTIONS ************************///////////////////////

const createTrip = async (trip) =>{

  let token = localStorage.getItem("token");

  const response = await axios.post(`${BASIC_URL}/trip/create`,
            {
              title: trip.title,
              days: trip.days,
              images: trip.images,
              description: trip.description,
              itinerary: trip.itinerary,
              included: trip.included,
              seats: trip.seats,
              price: trip.price,
              city: trip.city,
              startingDateAndTime: trip.startingDateAndTime,
              endingDateAndTime: trip.endingDateAndTime
            }, {
              headers: { "Authorization": `Bearer ${token}` }
            })

            console.log("response.data of trip from backend: ", response.data)

            try{
              if(response.data){
                let trips = [...this.state.trips, response.data]
                this.setState({ trips })
              }
            }
            catch(e){
              console.log("Unable to create trip!",e);
            }
}

// to delete a trip
const deleteTrip = async (tripID) =>{

  let token = localStorage.getItem("token")
  const { travelAgencyAuthenticated, adminAuthenticated } = this.state;
  let response = null
  if(travelAgencyAuthenticated){
  response = await axios.delete(`${BASIC_URL}/trip/delete/${tripID}`,
  {
    headers: { "Authorization": `Bearer ${token}` }
  })
  }
  else if(adminAuthenticated){
   response = await axios.delete(`${BASIC_URL}/admin/trip/delete/${tripID}`,
  {
    headers: { "Authorization": `Bearer ${token}` }
  })
  }
  try{
    if(response.data){
      const trips = this.state.trips.filter(trip => trip._id !== tripID)
      this.setState({ trips })
    }
  }
  catch(e){
    console.log("Unable to create trip!",e);
  }
  
  
}

const updateTrip = async (trip) =>{

  let token = localStorage.getItem("token");

const { travelAgencyAuthenticated, adminAuthenticated } = this.state;
let response = null
  if(travelAgencyAuthenticated ){
    response = await axios.patch(`${BASIC_URL}/trip/update/${trip._id}`,
            {
              title: trip.title,
              days: trip.days,
              images: trip.images,
              description: trip.description,
              itinerary: trip.itinerary,
              included: trip.included,
              seats: trip.seats,
              startingDateAndTime: trip.startingDateAndTime,
              endingDateAndTime: trip.endingDateAndTime
            }, {
              headers: { "Authorization": `Bearer ${token}` }
            })
  }
  else if(adminAuthenticated){
     response = await axios.patch(`${BASIC_URL}/admin/trip/update/${trip._id}`,
              {
                title: trip.title,
                days: trip.days,
                images: trip.images,
                description: trip.description,
                itinerary: trip.itinerary,
                included: trip.included,
                seats: trip.seats,
                startingDateAndTime: trip.startingDateAndTime,
                endingDateAndTime: trip.endingDateAndTime
              }, {
                headers: { "Authorization": `Bearer ${token}` }
              })
    }
            try{
              if(response.data){
                let trips = this.state.trips.filter(tripp => tripp._id !== trip._id)
                trips.push(response.data);
                this.setState({ trips })
                alert('Trip Updated!')
              }
            }
            catch(e){
              console.log("Unable to create trip!",e);
            }
}

/////////



///////////////////////////////BOOKINGS RELATED FUNCTIONS////////////////////////////

const mapBookingsToMainState = (bookings) =>{
  this.setState({bookings});
}
///////////////////////////////////////////////////////////////////////////////////

// TO RETRIEVE ALL THE TRIPS FOR A TRAVEL AGENCY
// const getTrips = () =>{
//   let token = localStorage.getItem("token");

//   const response = await axios.get(`${BASIC_URL}/trips/all`, { headers: { "Authorization": `Bearer ${token}` } });

//   console.log("response.data in getTrips: ",response.data)
  // try{

  // }
  // catch(e){

  // }

// }


const mapTripsToState = (trips) =>{
  this.setState({trips});
}

////////////////////////////////////////////////////////////////////////////////////////
// <Route path='/user/trip/:id' render={(props) => <TripDetails {...props} /> } />
// <Route path='/user/BookingDetails/:id' render={(props) => <BookingDetails {...props} /> } />
// <Route path='/user/tripListing/' render={(props) => <TripListing {...props} /> } />

//**********************************************USER */
// <Route path='/user/login/' render={(props) => <Login {...props}  authenticate={authenticate} /> } />
// <Route path='/user/signup/' render={(props) => <Signup {...props} signUp={signUp} errors={this.state.errors} /> } />


///*************************************************** TRAVEL AGENCY*/
// <Route exact path='/travelAgency/dashboard' render={(props) => <Dashboard {...props} /> } />
// <Route exact path='/travelAgency/createtrip' render={(props) => <CreateTrip {...props} /> } />

// <Route path='/travelAgency/tlogin/' render={(props) => <TLogin {...props} tAuthenticate={tAuthenticate} /> } />
// <Route path='/travelAgency/tsignup/' render={(props) => <TSignup {...props} tsignUp={tsignUp} /> } />

// <UserGuardedRoute path='/user/trip/:id'  component={TripDetails} auth={this.state.adminAuthenticated ||  this.state.userAuthenticated} />
  
// <NavBar userAuthenticated={this.state.userAuthenticated} travelAgencyAuthenticated={this.state.travelAgencyAuthenticated} logout={logout} name={this.state.name} />

return (
    <BrowserRouter>
    <div className="App">
    <Route render={(props) => <NavBar {...props} mapTripsToState={mapTripsToState} userAuthenticated={this.state.userAuthenticated} adminAuthenticated={this.state.adminAuthenticated} travelAgencyAuthenticated={this.state.travelAgencyAuthenticated} logout={logout} name={this.state.name} /> } />
    <Route exact path='/' render={(props) => <Banner trips={this.state.trips} {...props} /> } />
    <Route path='/user/tripListing/:id' render={(props) => <TripListing {...props} mapTripsToState={mapTripsToState} trips={this.state.trips} /> } />
    <Route path='/user/trip/:id' render={(props) => <TripDetails {...props} /> } />

    {/*User Routes*/}
    <UserGuardedRoute path='/user/bookings/all' component={UserBookings} mapBookingsToMainState={mapBookingsToMainState} bookings={this.state.bookings} auth={this.state.adminAuthenticated ||  this.state.userAuthenticated} /> 
    <UserGuardedRoute path='/user/BookingDetails/:id' component={CreateBooking} mapBookingsToMainState={mapBookingsToMainState} createBooking={createBooking} auth={this.state.adminAuthenticated ||  this.state.userAuthenticated} /> 
    <UserGuardedRoute exact path='/admin/updatetrip'    component={UpdateTripAdminPage}  updateTrip={updateTrip} trips={this.state.trips} auth={this.state.adminAuthenticated}  />
    <UserGuardedRoute exact path='/admin/updatetrip/:id'    component={UpdateTripAdmin}  updateTrip={updateTrip} trips={this.state.trips} auth={this.state.adminAuthenticated}  />
    <UserGuardedRoute exact path='/admin/approvePayments'    component={ApprovePayments} trips={this.state.trips} auth={this.state.adminAuthenticated}  />
    <UserGuardedRoute exact path='/admin/approvePayment/:id'    component={ApprovePaymentPage} trips={this.state.trips} auth={this.state.adminAuthenticated}  />
    <UserGuardedRoute exact path='/admin/deletetrip'    component={DeleteTripAdmin}  deleteTrip={deleteTrip} trips={this.state.trips} auth={this.state.adminAuthenticated}  />
    <UserAuthCheck path='/user/login/'  component={Login}  authenticate={authenticate}   auth={this.state.adminAuthenticated ||  this.state.userAuthenticated} />
    <UserSignupCheck path='/user/signup/' component={Signup}  signUp={signUp} errors={this.state.errors}   auth={this.state.adminAuthenticated ||  this.state.userAuthenticated} />
    
    {/*Travel Agency Routes*/}
    <TravelAgencyGuardedRoute exact path='/travelAgency/dashboard'    component={Dashboard} mapTripsToState={mapTripsToState} trips={this.state.trips} auth={this.state.adminAuthenticated ||  this.state.travelAgencyAuthenticated}  />
    <TravelAgencyGuardedRoute exact path='/travelAgency/createtrip' component={CreateTrip} createTrip={createTrip} auth={this.state.adminAuthenticated ||  this.state.travelAgencyAuthenticated}  />
    <TravelAgencyGuardedRoute exact path='/travelAgency/trip/:id'    component={ViewTrip}  tripOperator={this.state.name} trips={this.state.trips} auth={this.state.adminAuthenticated ||  this.state.travelAgencyAuthenticated}  />
    <TravelAgencyGuardedRoute exact path='/travelAgency/deletetrip'    component={DeleteTrip}  deleteTrip={deleteTrip} tripOperator={this.state.name} trips={this.state.trips} auth={this.state.adminAuthenticated ||  this.state.travelAgencyAuthenticated}  />
    <TravelAgencyGuardedRoute exact path='/travelAgency/updatetrip'    component={UpdateTripPage}  updateTrip={updateTrip} tripOperator={this.state.name} trips={this.state.trips} auth={this.state.adminAuthenticated ||  this.state.travelAgencyAuthenticated}  />
    <TravelAgencyGuardedRoute exact path='/travelAgency/updatetrip/:id'    component={UpdateTrip}  updateTrip={updateTrip} tripOperator={this.state.name} trips={this.state.trips} auth={this.state.adminAuthenticated ||  this.state.travelAgencyAuthenticated}  />
    <TravelAgencyGuardedRoute exact path='/travelAgency/getBookings'    component={ViewBookings}   auth={this.state.adminAuthenticated ||  this.state.travelAgencyAuthenticated}  />
    <TravelAgencyAuthCheck path='/travelAgency/tlogin/' component={TLogin} tAuthenticate={tAuthenticate}  auth={this.state.adminAuthenticated ||  this.state.travelAgencyAuthenticated} />
    <TravelAgencySignupCheck path='/travelAgency/tsignup/' component={TSignup} tsignUp={tsignUp} auth={this.state.adminAuthenticated ||  this.state.travelAgencyAuthenticated} />

    <Footer />
    </div>
    </BrowserRouter>
  );

  }
}

export default App;
