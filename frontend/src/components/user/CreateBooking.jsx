import React from 'react'
import { Component } from 'react';
import axios from 'axios';


class CreateBooking extends Component{

    state = {
        NumOfTravellers : 1,
        travelersDetail: [{ firstName: '', lastName: '', address: '', city: '', address: '', phoneNumber: '', city: '', state: '', zip: ''}],        
        trip: null,
        paymentScreenshot: [],
        totalAmount: null

    }


    ///////
    setPaymentScreenshot = (e) =>{
      e.preventDefault();
      this.setState({ paymentScreenshot: [] });
      const imageFiles = e.target.files

      for(var i = 0; i < imageFiles.length; i++){
          let reader = new FileReader();
          let file = imageFiles[i];

          reader.onloadend = () =>{
              this.setState({ paymentScreenshot: this.state.paymentScreenshot.concat(reader.result) });
          }

          reader.readAsDataURL(file);
      }
    }
    //////
     handleDelete = (screenshot) =>{
      let paymentScreenshot = this.state.paymentScreenshot.filter(item => item !== screenshot);
      this.setState({...this.state, paymentScreenshot })
  }
    //////

    componentDidMount = async () =>{
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:5000/trip/${this.props.match.params.id}`, { headers: { "Authorization": `Bearer ${token}` } });
      console.log(this.state.travelersDetail)
      try{
        if(response.data){
          this.setState({trip: response.data, totalAmount: parseInt(response.data.price)});
          console.log("Booking Details state: ",this.state.trip)
        }
      }
      catch(e){
        console.log(e)   
       }
    }


    //handle traveller detail changes
    handleTDChange(e, index, updateField) {
      const travelersDetail = [...this.state.travelersDetail];
      travelersDetail[index][updateField] = e.target.value;
      this.setState({ travelersDetail });
  }

    // handleSubmit
    handleSubmit = (e) =>{
      e.preventDefault();
      if( this.state.travelersDetail.firstName == "",
          this.state.travelersDetail.lastName == "" ,
          this.state.travelersDetail.address == "" , 
          this.state.travelersDetail.phoneNumber == "" ,
          this.state.travelersDetail.city == "" ,
          this.state.travelersDetail.state == "" ,
          this.state.travelersDetail.zip == "" , 
          this.state.trip == null ,
           this.state.paymentScreenshot.length == 0){
          return alert("Please fill in all the fileds!")
      }
      this.props.createBooking(this.state);
      console.log("state CreateBooking: ",this.state)
    }

    // To increase or decrease the number of travelers
    handleClick = (e) => {
      e.preventDefault();
      const travelersDetailCopy = [...this.state.travelersDetail];
      let totalAmount;
      if (e.target.id == 'plus') {
          travelersDetailCopy.push({
              firstName: '', lastName: '', address: '', city: '', address: '', phoneNumber: '', city: '', state: '', zip: '' // Add empty data
          });
          totalAmount = parseInt(this.state.trip.price)*travelersDetailCopy.length;

      } else if (e.target.id == 'minus') {
          if (this.state.travelersDetail.length === 1) {
              alert("Can't be less than 1");
          } else {
              travelersDetailCopy.pop();
              totalAmount = parseInt(this.state.trip.price)*travelersDetailCopy.length;
          }
      }
      this.setState({
          travelersDetail: travelersDetailCopy,
          totalAmount
      });
  }




    render(){


const numberOfTravelers = () => {
  return this.state.travelersDetail.map((travelerDetail, index) => {
      return (
          <div key={index}>
              <div>{ this.state.travelersDetail.length == 1 ? <h4>Traveller Details</h4> : <h4>Traveller # {index + 1} Details </h4> }</div> <br />

              <div className="form-row">
                  <div className="form-group col-md-6">
                      <label htmlFor="firstName">First Name</label>
                      <input type="firstName" className="form-control" onChange={(event) => {this.handleTDChange(event, index, "firstName")}} id="firstName" placeholder="FirstName" />
                  </div>
                  <div className="form-group col-md-6">
                      <label htmlFor="lastName">Last Name</label>
                      <input type="lastName" className="form-control" onChange={(event) => {this.handleTDChange(event, index, "lastName")}} id="lastName" placeholder="LastName" />
                  </div>
              </div>
              <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <input type="text" className="form-control" onChange={(event) => {this.handleTDChange(event, index, "address")}} id="address" placeholder="1234 Main St" />
              </div>
              <div className="form-group">
                  <label htmlFor="phoneNumber">Phone Number</label>
                  <input type="tel" className="form-control" onChange={(event) => {this.handleTDChange(event, index, "phoneNumber")}} id="phoneNumber" placeholder="+92..." />
              </div>
              <div className="form-row">
                  <div className="form-group col-md-6">
                      <label htmlFor="city">City</label>
                      <select onChange={(event) => {this.handleTDChange(event, index, "city")}} id="city" className="form-control">
                          <option selected>Choose...</option>
                          <option>Lahore</option>
                          <option>Islamabad</option>
                          <option>Karachi</option>
                          <option>Rawalpindi</option>
                          <option>Quetta</option>
                          <option>Multan</option>
                      </select>
                  </div>
                  <div className="form-group col-md-4">
                      <label htmlFor="state">State</label>
                      <select onChange={(event) => {this.handleTDChange(event, index, "state")}} id="state" className="form-control">
                          <option selected>Choose...</option>
                          <option>Pakistan</option>
                      </select>
                  </div>
                  <div className="form-group col-md-2">
                      <label htmlFor="zip">Zip</label>
                      <input type="text" className="form-control" onChange={(event) => {this.handleTDChange(event, index, "zip")}} id="zip" />
                  </div>
              </div>
              <br/><br/>
          </div>
      )
  })
}


    return(
        <div className='container'>
            
        
        
        <div className="container">
        <br/> <br/> <br/>
            <div className="row">
            <div className="col-8">
                {this.state.trip ? (
                <div className="card">
                <div className="card-horizontal">
                    <div className="img-square-wrapper">
                    <img className src={this.state.trip.images[0]} alt="Card image cap" />
                    </div>
                    <div className="card-body">
                    <h4 className="card-title">{this.state.trip.title}</h4>
                    <p className="card-text">{this.state.trip.description.slice(0,150)+"..."}</p>
                    </div>
                    </div>     
                    </div>
                    ) : null }
                    <div>
                    
                    <br/> <br/>
                    <h4>Number of travelers:  &nbsp; <input  className="col-1" value={this.state.travelersDetail.length} disabled="true"/>                    
                    &nbsp; <a style={{cursor: `pointer`}} id="plus" className="fas fa-plus-circle" onClick={this.handleClick}></a>
                    &nbsp; <a style={{cursor: `pointer`}} id="minus" className="fas fa-minus-circle" onClick={this.handleClick}></a>
                    </h4>
                    </div>

                    <br/>
        <hr/><br/>


        <form>
        { this.state.travelersDetail.length >= 1 ? numberOfTravelers() : null }
        <br/><br/>
        <hr/>
        <h4>Payment Details</h4><br/>
        <div className="payment-details">
        <b className="payment-info">you can proceed the payment with any of the option and attach the screenshot for either jazzCash or personal bank account.</b>
        <br/><br/>
        <h6>Account Number: <b>003002000426333</b></h6>
        <h6>jazzCash mobile account: <b>03234650357</b></h6>
        <div className="col-sm-9">
        <br/>
        <span className="btn btn-default btn-file">
          <input id="paymentScreenshot" required="true" onChange={this.setPaymentScreenshot} name="input2[]"  type="file" className="file" multiple data-show-upload="true" data-show-caption="true" />
        </span>

        <div className="row">
            {this.state.paymentScreenshot.map((item, index) => (    
                        <div className="trip-images">
                            <i onClick={() => this.handleDelete(item)} class="fas fa-times-circle trash"></i>
                            <img src={item} />
                        </div>
                ))}
        </div><br/>
        <h5>We will verify and get back to you :)</h5>
    </div>

        
        </div>
        <br/><br/><br/>
        <input style={{marginLeft:'100px'}} className="form-check-input" type="checkbox" defaultValue id="defaultCheck1" /> 
        <p style={{ fontSize: '15px' }}>Make sure you have agreed to all the terms & conditions of tripmanual</p>
        <button type="button" onClick={this.handleSubmit}  class="btn btn-secondary btn-lg btn-block">Book Trip</button>
      </form>
      </div>
      </div>
        </div>
        </div>
        )
    }
}

export default CreateBooking;