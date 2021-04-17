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


function App() {
  return (
    <BrowserRouter>
    <div className="App">
    <NavBar />
    <Route exact path='/' render={(props) => <Banner {...props} /> } />
    {/*User Routes*/}
    <Route path='/user/trip/:id' render={(props) => <TripDetails {...props} /> } />
    <Route path='/user/BookingDetails/:id' render={(props) => <BookingDetails {...props} /> } />
    <Route path='/user/login/' render={(props) => <Login {...props} /> } />
    <Route path='/user/signup/' render={(props) => <Signup {...props} /> } />

    {/*Travel Agency Routes*/}
    <Route path='/travelAgency/tlogin/' render={(props) => <TLogin {...props} /> } />
    <Route path='/travelAgency/tsignup/' render={(props) => <TSignup {...props} /> } />
    <Route exact path='/travelAgency/dashboard' render={(props) => <Dashboard {...props} /> } />
    <Route exact path='/travelAgency/createtrip' render={(props) => <CreateTrip {...props} /> } />
    <Footer />
    </div>
    </BrowserRouter>
  );
}

export default App;
