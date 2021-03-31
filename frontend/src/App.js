import './App.css';
import Home from './components/user/Home.jsx';
import NavBar from './components/Layout/NavBar.jsx';
import Footer from './components/Layout/Footer.jsx';
import Banner from './components/user/Banner.jsx'
import Card from './components/user/Card.jsx'
import TripDetails from './components/user/TripDetails.jsx'
import BookingDetails from './components/user/BookingDetails.jsx'
import Login from './components/user/Login.jsx'
import { BrowserRouter, Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import Signup from './components/user/Signup.jsx';


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
