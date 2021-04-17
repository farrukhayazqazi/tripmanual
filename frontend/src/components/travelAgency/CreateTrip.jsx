import React from 'react'
import { Component } from 'react';


class CreateTrip extends Component{



    state = {
        NumOfDays : 1,
        itinerary : [],
        file: []
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
                <form className="input-group mb-3" onSubmit={this.addItinerary}>
                    <input type="text" className="form-control"  ref={(ip) => {this.newText = ip}} placeholder={`Day ${d}`} aria-label="Day 01" aria-describedby="basic-addon2" />
                    <button className="btn btn-outline-secondary" onClick={this.addItinerary} type="button">+</button>
                </form>
              );

              }
                return days
            }




    return(
        <div className='container create-trip'>
            <h1 style={{fontWeight:'bolder'}} >Create Trip</h1>
            <hr/>

            <div>
            <br/> <br/>
            <h4>Trip Days:  &nbsp; <input  className="col-1" value={this.state.NumOfDays} disabled="true"/>                    
            &nbsp; <a style={{cursor: `pointer`}} id="plus" className="fas fa-plus-circle" onClick={this.handleClick}></a>
            &nbsp; <a style={{cursor: `pointer`}} id="minus" className="fas fa-minus-circle" onClick={this.handleClick}></a>
            </h4>
            </div>

            <form>
            <div className="form-group">
                <div className="create-title">
                <h5>Upload Images</h5>
                </div>
                <br/>
                    <label htmlFor="exampleFormControlFile1">Upload images of trip destination for better trip experience</label>
                    //

                  <div className="col-sm-9">
                    <span className="btn btn-default btn-file">
                      <input id="input-2" name="input2[]"  type="file" className="file" multiple data-show-upload="true" data-show-caption="true" />
                    </span>
                  </div>
                    
                    //
                
                
                
                
                
                
                
                
                
                <br/>
                <hr/>

                <div className="create-title">
                <h5>Trip Itinernary</h5>
                </div>
                <br/>

            
                {   
                    this.state.itinerary.map(function(itinerary) {
                    return <li>{itinerary}</li>
               })}
              
               <br/><br/>

                { this.state.NumOfDays == 1 ? (
                 
                <div className="input-group mb-3">
                    <input type="text" className="form-control" ref={(ip) => {this.newText = ip}} placeholder="Day 01" aria-label="Day 01" aria-describedby="basic-addon2" />
                    <button className="btn btn-outline-secondary" onClick={this.addItinerary} type="button">+</button>
                                 
                </div>

                ) : numberOfDays() 
                
                }

                <br/>
                <hr/>

                <div className="create-title">
                <h5>What's Included</h5>
                </div>
                <br/>
                    <input className="form-check-input" type="checkbox" defaultValue id="defaultCheck1" />
                    <label className="form-check-label" htmlFor="defaultCheck1">Dedicated Transportation Air conditioned XLI 2012 to 2015 Model Car latest Model</label>
                <br/><br/>
                    <input className="form-check-input" type="checkbox" defaultValue id="defaultCheck2" />
                    <label className="form-check-label" htmlFor="defaultCheck2">Default checkbox </label>
                <br/>
                <br/>
                <input className="form-check-input" type="checkbox" defaultValue id="defaultCheck3" />
                <label className="form-check-label" htmlFor="defaultCheck3">Dedicated Transportation Air conditioned XLI 2012 to 2015 Model Car latest Model</label>
            <br/><br/>
            </div>
          </form>

        </div>
        )
}
}
export default CreateTrip;