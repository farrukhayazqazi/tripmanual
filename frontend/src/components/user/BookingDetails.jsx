import React from 'react'
import { Component } from 'react';


class BookingDetails extends Component{

    state = {
        NumOfTravelers : 1
    }

    handleClick = (e) =>{
        e.preventDefault();
        if(e.target.id == 'plus'){
        this.setState({NumOfTravelers: this.state.NumOfTravelers + 1 })
        
        }
        else if(e.target.id == 'minus'){
           this.state.NumOfTravelers > 1 ? this.setState({NumOfTravelers: this.state.NumOfTravelers - 1 }) : alert("can't be less than that :)")
        }
    }



    render(){

      const numberOfTravelers = () =>{
        var travellors = [];
        
        
        for(let t = 0; t < this.state.NumOfTravelers; t++){
          travellors.push(
            <div >
            <h4> Traveller # {t+1} Details</h4><br/>
        
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="inputFirstName4">First Name</label>
                <input type="FirstName" className="form-control" id="inputFirstName4" placeholder="FirstName" />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="inputLastName4">Last Name</label>
                <input type="LastName" className="form-control" id="inputLastName4" placeholder="LastName" />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="inputAddress">Address</label>
              <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" />
            </div>
            <div className="form-group">
              <label htmlFor="inputAddress2">Address 2</label>
              <input type="text" className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" />
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="inputCity">City</label>
                <input type="text" className="form-control" id="inputCity" />
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="inputState">State</label>
                <select id="inputState" className="form-control">
                  <option selected>Choose...</option>
                  <option>...</option>
                </select>
              </div>
              <div className="form-group col-md-2">
                <label htmlFor="inputZip">Zip</label>
                <input type="text" className="form-control" id="inputZip" />
              </div>
            </div>
            </div>);
          
        }
      return travellors
        
      }


    return(
        <div className='container'>
            
        
        
        <div className="container">
        <br/> <br/> <br/>
            <div className="row">
            <div className="col-8">
                <div className="card">
                <div className="card-horizontal">
                    <div className="img-square-wrapper">
                    <img className src="https://storage.googleapis.com/wzukusers/user-18718137/images/5a614fd1db303ife9Ait/amazing-736885.png" alt="Card image cap" />
                    </div>
                    <div className="card-body">
                    <h4 className="card-title">Card title</h4>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                    </div>
                    
                    
                    
                    
                    </div>

                    <div>
                    <br/> <br/>
                    <h4>Number of travelers:  &nbsp; <input  className="col-1" value={this.state.NumOfTravelers} disabled="true"/>                    
                    &nbsp; <a style={{cursor: `pointer`}} id="plus" className="fas fa-plus-circle" onClick={this.handleClick}></a>
                    &nbsp; <a style={{cursor: `pointer`}} id="minus" className="fas fa-minus-circle" onClick={this.handleClick}></a>
                    </h4>
                    </div>

                    <br/>
        <hr/><br/>
        <form>

        

        { this.state.NumOfTravelers == 1 ? (
          
          <div>
          <h4> Traveller Details</h4><br/>
        
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputFirstName4">First Name</label>
              <input type="FirstName" className="form-control" id="inputFirstName4" placeholder="FirstName" />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputLastName4">Last Name</label>
              <input type="LastName" className="form-control" id="inputLastName4" placeholder="LastName" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="inputAddress">Address</label>
            <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" />
          </div>
          <div className="form-group">
            <label htmlFor="inputAddress2">Address 2</label>
            <input type="text" className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" />
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputCity">City</label>
              <input type="text" className="form-control" id="inputCity" />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="inputState">State</label>
              <select id="inputState" className="form-control">
                <option selected>Choose...</option>
                <option>...</option>
              </select>
            </div>
            <div className="form-group col-md-2">
              <label htmlFor="inputZip">Zip</label>
              <input type="text" className="form-control" id="inputZip" />
            </div>
          </div>    
          </div>
        ): numberOfTravelers()
          }

       


        <div className="form-group">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="gridCheck" />
            <label className="form-check-label" htmlFor="gridCheck">
              Check me out
            </label>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Sign in</button>
        <br/><br/>
        <hr/>

        <h4>Payment Details</h4><br/>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="inputFirstName4">First Name</label>
            <input type="FirstName" className="form-control" id="inputFirstName4" placeholder="FirstName" />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="inputLastName4">Last Name</label>
            <input type="LastName" className="form-control" id="inputLastName4" placeholder="LastName" />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="inputAddress">Address</label>
          <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" />
        </div>
        <div className="form-group">
          <label htmlFor="inputAddress2">Address 2</label>
          <input type="text" className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" />
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="inputCity">City</label>
            <input type="text" className="form-control" id="inputCity" />
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="inputState">State</label>
            <select id="inputState" className="form-control">
              <option selected>Choose...</option>
              <option>...</option>
            </select>
          </div>
          <div className="form-group col-md-2">
            <label htmlFor="inputZip">Zip</label>
            <input type="text" className="form-control" id="inputZip" />
          </div>
        </div>
        <div className="form-group">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="gridCheck" />
            <label className="form-check-label" htmlFor="gridCheck">
              Check me out
            </label>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Sign in</button>
        <br/><br/>
        <hr/>
      </form>

                <div className="col-4">

                </div>
            </div>


            </div>
        </div>
        </div>
        )
    }
}

export default BookingDetails;