import './App.css';
import Home from './components/user/Home.js';
import NavBar from './components/Layout/NavBar.js';
import Footer from './components/Layout/Footer.js';
import Banner from './components/user/Banner.js'
import Card from './components/user/Card.js'
import TripDetails from './components/user/TripDetails.js'
import BookingDetails from './components/user/BookingDetails.js'
import Login from './components/user/Login.js'
import { BrowserRouter, Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import Signup from './components/user/Signup';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
    <NavBar />
    <Route exact path='/' render={(props) => <Banner {...props} /> } />
    <Route path='/trip/:id' render={(props) => <TripDetails {...props} /> } />
    <Route path='/BookingDetails/:id' render={(props) => <BookingDetails {...props} /> } />
    <Route path='/login/' render={(props) => <Login {...props} /> } />
    <Route path='/signup/' render={(props) => <Signup {...props} /> } />
     <Footer />
    </div>
    </BrowserRouter>
  );
}

export default App;
