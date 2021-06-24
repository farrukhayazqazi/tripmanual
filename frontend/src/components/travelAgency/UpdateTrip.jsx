import React from 'react'
import { Component } from 'react';
import axios from 'axios';

class UpdateTrip extends Component{



    state = {
        _id: null,
        days : 1,
        itinerary : [],
        images: [],
        title: '',
        description:'',
        included: [],
        price: '',
        city:'',
        seats: null,
        startingDateAndTime: { "date" : null, "time": null},
        endingDateAndTime: { "date" : null, "time": null},

    }

    async componentDidMount(){
        let BASIC_URL = "http://localhost:5000";
  
          try{
            const response = await axios.get(`${BASIC_URL}/trip/${this.props.match.params.id}`);
            console.log("Trips are retrieved: ",response.data);
            const trip = response.data
            this.setState({  
                _id: trip._id,      
                days :trip.days ,
                itinerary :trip.itinerary,
                images:trip.images,
                title:trip.title,
                description:trip.description,
                included:trip.included,
                price:trip.price,
                city:trip.city,
                seats:trip.seats,
                startingDateAndTime:{ "date":trip.startingDateAndTime.date, "time":trip.startingDateAndTime.time} ,
                endingDateAndTime: { "date":trip.endingDateAndTime.date, "time":trip.endingDateAndTime.time}
                })
            // this.props.mapTripsToState(trips);
            console.log(this.state)
          }
          catch(e){
            console.log("Unable to retrieve trips!")
          } 
    }
    handleSubmit = (e) =>{
        e.preventDefault();
        console.log(this.state)
        let { days, itinerary, images, title, description, included, seats, startingDateAndTime, endingDateAndTime } = this.state;


        if( days == 0 || itinerary.length !== days || images.length == 0 || title === '' || description === '' || seats == null || startingDateAndTime["date" && "time"] == null || endingDateAndTime["date" && "time"] ==  null ){

            return alert("Please fill out all of the fields!")
        }

        this.props.updateTrip(this.state);
        console.log(this.props)
        console.log("state has startingDataAndTime:  ",this.state)
        this.props.history.push("/travelAgency/dashboard")
    }

    handleChange = (e) =>{
        this.setState({ [e.target.id]: null })
        this.setState({
            [e.target.id] : e.target.value
        });
    }

    handleCheckBox = (e) =>{
        let included = [...this.state.included, e.target.id]
        this.setState({included})
    }

    setImages = (e) =>{
        e.preventDefault();
        this.setState({ images: [] });
        const imageFiles = e.target.files

        for(var i = 0; i < imageFiles.length; i++){
            let reader = new FileReader();
            let file = imageFiles[i];

            reader.onloadend = () =>{
                this.setState({ images: this.state.images.concat(reader.result) });
            }

            reader.readAsDataURL(file);
        }
    }

    handleDateAndTime = (e) =>{

        if(e.target.id === "startingDate"){
            let startingDateAndTime = { ...this.state.startingDateAndTime,"date": e.target.value }
            this.setState({startingDateAndTime})
        }

        else if(e.target.id === "startingTime"){
            let startingDateAndTime = {...this.state.startingDateAndTime, "time": e.target.value }
            this.setState({startingDateAndTime})
        }

        else if(e.target.id === "endingDate"){
            let endingDateAndTime = {...this.state.endingDateAndTime,"date": e.target.value }
            this.setState({endingDateAndTime})
        }
     
        else if(e.target.id === "endingTime"){
            let endingDateAndTime = { ...this.state.endingDateAndTime, "time": e.target.value }
            this.setState({endingDateAndTime})
        }

    }


    handleClick = (e) =>{
        e.preventDefault();
        if(e.target.id === 'plus'){
        this.setState({days: this.state.days + 1 })
        this.count++;
        
        }
        else if(e.target.id === 'minus'){
           this.state.days > 1 ? this.setState({days: this.state.days - 1 }) : alert("can't be less than that :)")
            this.count--;
        }
    }

    itineraryCount = 1;
    count = this.state.days;

    addItinerary = (e) =>{
        e.preventDefault();
        this.count--;
        // console.log('in addItinerary', this.state.itinerary)
        var itinerary = [...this.state.itinerary];
        itinerary.push('Day '+ this.itineraryCount + ': '+ this.newText.value);
        console.log(itinerary)
        this.setState({itinerary});
        // this.newText.type = 'hidden'
        // e.target.value = 'hidden'
        // this.setState({ days: this.state.days - 1})
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
            
            
            
            for(let d = this.count ; d > 0; d--){
              days.push(
                <div className="input-group mb-3" onSubmit={this.addItinerary}>
                    <input required="true" type="text" className="form-control" ref={(ip) => {this.newText = ip}} placeholder={`Day ${d}`} aria-label="Day 01" aria-describedby="basic-addon2" />
                    <button className="btn btn-outline-secondary" onClick={this.addItinerary} type="button">+</button>
                </div>
              );

              }
                return days
            }


        // To Delete uploaded trip pictures
        const handleDelete = (image) =>{
            let images = this.state.images.filter(item => item !== image);
            this.setState({...this.state, images })
        }

    return(
        <div className='container create-trip'>
            <h1 style={{fontWeight:'bolder'}} >Update Trip</h1>
            <hr/>
            
            <br/><br/>
            { this.state ? (<> 
            <div>
            <h4>Trip Days:  &nbsp; <input  className="col-1" value={this.state.days} disabled="true"/>                    
            &nbsp; <a style={{cursor: `pointer`}} id="plus" className="fas fa-plus-circle" onClick={this.handleClick}></a>
            &nbsp; <a style={{cursor: `pointer`}} id="minus" className="fas fa-minus-circle" onClick={this.handleClick}></a>
            </h4>
            <br/>
            <hr/>
            <br/><br/><br/>
            </div>

            <form onSubmit={this.handleSubmit} >
            <div className="input-group mb-3">
            <h4>Trip Title: &nbsp; &nbsp;</h4>
            <input type="text" required="true" value={this.state.title} className="form-control" onChange={this.handleChange} id="title" placeholder='Trip Title' aria-label="Trip Title" aria-describedby="basic-addon2" />
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
                      <input id="images" required="true" onChange={this.setImages} name="input2[]"  type="file" className="file" multiple data-show-upload="true" data-show-caption="true" />
                    </span>

                    <div className="row">
                        {this.state.images.map((item, index) => (    
                                    <div className="trip-images">
                                        <i onClick={() => handleDelete(item)} class="fas fa-times-circle trash"></i>
                                        <img src={item} />
                                    </div>
                            ))}
                    </div>

                </div>
                    
                <br/>
                <hr/>

                <div className='create-title'>
                    <h5>Trip Description</h5><br/>
                    <div className="form-group">
                    <textarea required="true" value={this.state.description} className="form-control" onChange={this.handleChange} id="description" placeholder="write detailed description about the trip with timings..." rows={3} defaultValue={""} />
                  </div>
                  </div>
                  <hr/>

                <div className="create-title">
                <h5>Trip Itinernary</h5>
                </div>
                

            
                {   
                    this.state.itinerary.map(function(itinerary) {
                    return <li key={itinerary}>{itinerary}</li>
               })}
              
               <br/>

                { this.state.days == 1 ? (
                 
                    <div className="input-group mb-3" onSubmit={this.addItinerary}>
                        <input required="true" type="text" className="form-control"  ref={(ip) => {this.newText = ip}} placeholder='Day 1' aria-label="Day 01" aria-describedby="basic-addon2" />
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
                        <input className="form-check-input" onChange={this.handleeCheckBox} type="checkbox" defaultValue id="Dedicated Transportation Air conditioned latest Model Vehicle" />
                        <label className="form-check-label" htmlFor="included1">Dedicated Transportation Air conditioned latest Model Vehicle</label>
                    <br/><br/>
                        <input className="form-check-input" onChange={this.handleCheckBox} type="checkbox" defaultValue id="All Fees and Taxes" />
                        <label className="form-check-label" htmlFor="included2">All Fees and Taxes</label>
                    <br/>
                    <br/>
                        <input className="form-check-input" onChange={this.handleCheckBox} type="checkbox" defaultValue id="luxury 3 Star  Accomodations" />
                        <label className="form-check-label" htmlFor="included3">luxury 3 Star  Accomodations</label>
                    <br/><br/>
                        <input className="form-check-input" onChange={this.handleCheckBox} type="checkbox" defaultValue id="Sightseeing Tour" />
                        <label className="form-check-label" htmlFor="included1">Sightseeing Tour</label>
                    <br/><br/>
                </div>

                <div className="col-4">
                    <input className="form-check-input" onChange={this.handleCheckBox} type="checkbox" defaultValue id="Breakfast" />
                    <label className="form-check-label" htmlFor="included1">Breakfast</label>
                <br/><br/>
                    <input className="form-check-input" onChange={this.handleCheckBox} type="checkbox" defaultValue id="Lunch" />
                    <label className="form-check-label" htmlFor="included1">Lunch</label>
                <br/><br/>
                    <input className="form-check-input" onChange={this.handleCheckBox} type="checkbox" defaultValue id="Dinner" />
                    <label className="form-check-label" htmlFor="included1">Dinner</label>
                <br/><br/>
                    <input className="form-check-input" onChange={this.handleCheckBox} type="checkbox" defaultValue id="Hotel Accomodations" />
                    <label className="form-check-label" htmlFor="included1">Hotel Accomodations</label>
                <br/><br/>
                </div>

                <div className="col-4">
                    <input className="form-check-input" onChange={this.handleCheckBox} type="checkbox" defaultValue id="4X4 Jeep Rides" />
                    <label className="form-check-label" htmlFor="included2">4X4 Jeep Rides</label>
                <br/>
                <br/>
                    <input className="form-check-input" onChange={this.handleCheckBox} type="checkbox" defaultValue id="Tour Guide" />
                    <label className="form-check-label" htmlFor="included3">Tour Guide</label>
                <br/>
                <br/>
                    <input className="form-check-input" onChange={this.handleCheckBox} type="checkbox" defaultValue id="Sightseeing Tour" />
                    <label className="form-check-label" htmlFor="included1">Sightseeing Tour</label>
                <br/>
                <br/>
                </div>
                </div>
            </div>

            <hr/>
                
            <div className="create-title">
                <h5>Available Seats &nbsp; &nbsp;<input required="true" max='30' value={this.state.seats} onChange={this.handleChange} id="seats" className="col-1" type="number" min='1' defaultValue='1' /></h5>
            </div>
            <hr/>

            <div className="create-title">
                <h5>Date and Time</h5><br/><br/>
                Start at :&nbsp;<input type='date' required="true" value={this.state.startingDateAndTime.date} onChange={this.handleDateAndTime} id="startingDate"  />&nbsp;&nbsp; at:&nbsp;<input type='time' onChange={this.handleDateAndTime} value={this.state.startingDateAndTime.time} id="startingTime"/> <br/><br/>
                Ends at :&nbsp;<input type='date' required="true"  value={this.state.endingDateAndTime.date} onChange={this.handleDateAndTime} id="endingDate" />&nbsp;&nbsp;at:&nbsp;<input type='time'  onChange={this.handleDateAndTime} value={this.state.endingDateAndTime.time} id="endingTime"/>
            </div>
            
            <hr/><br/>
            <div className="input-group mb-3 col-4 create-title">
            <h4>Departure from: &nbsp; &nbsp;</h4>
            <select  value={this.state.city} onChange={this.handleChange} id="city" className="form-control">
            <option selected={true} disabled={true}>...</option>
            <option>Lahore</option>
            <option>Islamabad</option>
            <option>Karachi</option>
            <option>Rawalpindi</option>
            <option>Quetta</option>
            <option>Multan</option>
        </select>
            </div>
            <hr/>
            <br/>
            <div className="input-group mb-3 col-4 create-title">
            <h4>Price: &nbsp; &nbsp;</h4>
            <input type="number" value={this.state.price} disabled="true" min="1000" required="true" className="form-control" onChange={this.handleChange} id="price" placeholder='price per person in pkr' aria-label="price" aria-describedby="basic-addon2" />
            &nbsp; <b style={{marginTop: "8px", paddingLeft:"5px"}} >PKR</b>
            </div>
            <hr/>
        
            

            <br/><br/><br/>
            <input style={{marginLeft:'300px'}} className="form-check-input" type="checkbox" defaultValue id="defaultCheck1" /> 
            <p style={{ fontSize: '15px' }}>Make sure you have agreed to all the terms & conditions of tripmanual</p>
            <button type="button" onClick={this.handleSubmit} class="btn btn-secondary btn-lg btn-block">Update Trip</button>

          </form>
          </>) : (null) }
        </div>
        )
}
}
export default UpdateTrip;