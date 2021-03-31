import React from 'react'


const Review = () =>{
    return(
        <div className='container'>

        <div>
        <div className="rating"> <input type="radio" name="rating" defaultValue={5} id={5} /><label htmlFor={5}>☆</label> <input type="radio" name="rating" defaultValue={4} id={4} /><label htmlFor={4}>☆</label> <input type="radio" name="rating" defaultValue={3} id={3} /><label htmlFor={3}>☆</label> <input type="radio" name="rating" defaultValue={2} id={2} /><label htmlFor={2}>☆</label> <input type="radio" name="rating" defaultValue={1} id={1} /><label htmlFor={1}>☆</label>
        </div>
      </div>



        <div>
        <h2 class="text-center">Reviews & Recommendations</h2>
        <div className="container review">
          
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-md-2">
                  <img src="https://image.ibb.co/jw55Ex/def_face.jpg" className="img img-rounded img-fluid" />
                  <p className="text-secondary text-center">15 Minutes Ago</p>
                </div>
                <div className="col-md-10">
                  <p>
                    <a className="float-left" href="#"><strong>Farrukh Ayaz</strong></a>
                    <span className="float-right"><i className="text-warning fa fa-star" /></span>
                    <span className="float-right"><i className="text-warning fa fa-star" /></span>
                    <span className="float-right"><i className="text-warning fa fa-star" /></span>
                    <span className="float-right"><i className="text-warning fa fa-star" /></span>
                  </p><br/>
                  <hr/>
                  <p>Lorem Ipsum is simply dummy text of the pr make  but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                 
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>

        </div>
        )
}

export default Review;
