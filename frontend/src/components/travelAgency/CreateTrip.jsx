import React from 'react'
import { Component } from 'react';


class CreateTrip extends Component{



    state = {
        NumOfDays : 1,
        itinerary : [],
        file: [],
        title: '',
        included: [],
        seats: null,
        DateAndTime: []

    }





    handleSubmit = (e) =>{
        e.preventDefault();
    }

    handleClick = (e) =>{
        e.preventDefault();
        if(e.target.id === 'plus'){
        this.setState({NumOfDays: this.state.NumOfDays + 1 })
        
        }
        else if(e.target.id === 'minus'){
           this.state.NumOfDays > 1 ? this.setState({NumOfDays: this.state.NumOfDays - 1 }) : alert("can't be less than that :)")
        }
    }

    itineraryCount = 1;

    addItinerary = (e) =>{
        e.preventDefault();
        
        // console.log('in addItinerary', this.state.itinerary)
        var itinerary = [...this.state.itinerary];
        itinerary.push('Day '+ this.itineraryCount + ': '+ this.newText.value);
        console.log(itinerary)
        this.setState({itinerary});
        // this.newText.type = 'hidden'
        // e.target.value = 'hidden'
        this.setState({ NumOfDays: this.state.NumOfDays - 1})
        this.newText.placeholder = 'Day '+ this.itineraryCount;
        this.itineraryCount++;
    }

    itinerary = (e) =>{

        this.setState({ itinerary: [e.target.value] });
        console.log(this.state.itinerary)
    }

    itineraryListing = (e) =>{
       return <li>{this.state.itinerary}<a></a></li>
    }

    submitHandler(e){
        e.preventDefault();

    }


    render(){

        const numberOfDays = () =>{
            var days = [];
            
            
            for(let d = this.state.NumOfDays; d > 0; d--){
              days.push(
                <div className="input-group mb-3" onSubmit={this.addItinerary}>
                    <input type="text" className="form-control"  ref={(ip) => {this.newText = ip}} placeholder={`Day ${d}`} aria-label="Day 01" aria-describedby="basic-addon2" />
                    <button className="btn btn-outline-secondary" onClick={this.addItinerary} type="button">+</button>
                </div>
              );

              }
                return days
            }




    return(
        <div className='container create-trip'>
            <h1 style={{fontWeight:'bolder'}} >Create Trip</h1>
            <hr/>
            
            <br/><br/>
            <div>
            <h4>Trip Days:  &nbsp; <input  className="col-1" value={this.state.NumOfDays} disabled="true"/>                    
            &nbsp; <a style={{cursor: `pointer`}} id="plus" className="fas fa-plus-circle" onClick={this.handleClick}></a>
            &nbsp; <a style={{cursor: `pointer`}} id="minus" className="fas fa-minus-circle" onClick={this.handleClick}></a>
            </h4>
            <br/>
            <hr/>
            <br/><br/><br/>
            </div>

            <form>
            <div className="input-group mb-3">
            <h4>Trip Title: &nbsp; &nbsp;</h4>
            <input type="text" className="form-control"  placeholder='Trip Title' aria-label="Trip Title" aria-describedby="basic-addon2" />
            </div>
            <br/><br/>
            <hr/>
            <div className="form-group">
                <div className="create-title">
                <h5>Upload Images</h5>
                </div>
               
                    <label htmlFor="exampleFormControlFile1">Upload images of trip destination for better trip experience</label>
                    

                  <div className="col-sm-9">
                    <span className="btn btn-default btn-file">
                      <input id="input-2" name="input2[]"  type="file" className="file" multiple data-show-upload="true" data-show-caption="true" />
                    </span>
                  </div>
                    
                <br/>
                <hr/>

                <div className="create-title">
                <h5>Trip Itinernary</h5>
                </div>
                

            
                {   
                    this.state.itinerary.map(function(itinerary) {
                    return <li>{itinerary}</li>
               })}
              
               <br/>

                { this.state.NumOfDays == 1 ? (
                 
                    <div className="input-group mb-3" onSubmit={this.addItinerary}>
                        <input type="text" className="form-control"  ref={(ip) => {this.newText = ip}} placeholder='Day 1' aria-label="Day 01" aria-describedby="basic-addon2" />
                        <button className="btn btn-outline-secondary" onClick={this.addItinerary} type="button">+</button>
                    </div>

                ) : numberOfDays() 
                
                }

                <br/>
                <hr/>

                <div className="create-title">
                <h5>What's Included</h5>
                </div>
                

                <div className="row">
                    <div className="col-4">
                        <input className="form-check-input" type="checkbox" defaultValue id="defaultCheck1" />
                        <label className="form-check-label" htmlFor="defaultCheck1">Dedicated Transportation Air conditioned latest Model Vehicle</label>
                    <br/><br/>
                        <input className="form-check-input" type="checkbox" defaultValue id="defaultCheck2" />
                        <label className="form-check-label" htmlFor="defaultCheck2">All Fees and Taxes</label>
                    <br/>
                    <br/>
                        <input className="form-check-input" type="checkbox" defaultValue id="defaultCheck3" />
                        <label className="form-check-label" htmlFor="defaultCheck3">luxury 3 Star  Accomodations</label>
                    <br/><br/>
                        <input className="form-check-input" type="checkbox" defaultValue id="defaultCheck1" />
                        <label className="form-check-label" htmlFor="defaultCheck1">Sightseeing Tour</label>
                    <br/><br/>
                </div>

                <div className="col-4">
                    <input className="form-check-input" type="checkbox" defaultValue id="defaultCheck1" />
                    <label className="form-check-label" htmlFor="defaultCheck1">Breakfast</label>
                <br/><br/>
                    <input className="form-check-input" type="checkbox" defaultValue id="defaultCheck1" />
                    <label className="form-check-label" htmlFor="defaultCheck1">Lunch</label>
                <br/><br/>
                    <input className="form-check-input" type="checkbox" defaultValue id="defaultCheck1" />
                    <label className="form-check-label" htmlFor="defaultCheck1">Dinner</label>
                <br/><br/>
                    <input className="form-check-input" type="checkbox" defaultValue id="defaultCheck1" />
                    <label className="form-check-label" htmlFor="defaultCheck1">Hotel Accomodations</label>
                <br/><br/>
                </div>

                <div className="col-4">
                    <input className="form-check-input" type="checkbox" defaultValue id="defaultCheck2" />
                    <label className="form-check-label" htmlFor="defaultCheck2">4X4 Jeep Rides</label>
                <br/>
                <br/>
                    <input className="form-check-input" type="checkbox" defaultValue id="defaultCheck3" />
                    <label className="form-check-label" htmlFor="defaultCheck3">Tour Guide</label>
                <br/>
                <br/>
                    <input className="form-check-input" type="checkbox" defaultValue id="defaultCheck1" />
                    <label className="form-check-label" htmlFor="defaultCheck1">Sightseeing Tour</label>
                <br/>
                <br/>
                </div>
                </div>
            </div>

            <hr/>
                
            <div className="create-title">
                <h5>Available Seats &nbsp; &nbsp;<input max='30' className="col-1" type="number" min='1' defaultValue='1' /></h5>
            </div>
            <hr/>

            <div className="create-title">
                <h5>Date and Time</h5><br/><br/>
                From :&nbsp;<input type='date' />&nbsp;&nbsp; at:&nbsp;<input type='time'/> <br/><br/>
                To :&nbsp;<input type='date' />&nbsp;&nbsp;at:&nbsp;<input type='time'/>
            </div>
            

            <br/><br/><br/>
            <input style={{marginLeft:'300px'}} className="form-check-input" type="checkbox" defaultValue id="defaultCheck1" /> 
            <p style={{ fontSize: '15px' }}>Make sure you have agreed to all the terms & conditions of tripmanual</p>
            <button type="button" class="btn btn-secondary btn-lg btn-block">Create Trip</button>

          </form>

        </div>
        )
}
}
export default CreateTrip;