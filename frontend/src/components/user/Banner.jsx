import React from 'react'
import Card from './Card'


const Banner = () =>{
    return(
      <div>
        <div className="page-holder bg-cover">
        <div className="container py-5">
          <header className="text-center text-white py-5">
            <h1 className="display-4 font-weight-bold mb-4">Welcome to Trip Manual</h1>

            <div className="container h-100">
            <div className="d-flex justify-content-center h-100">
              
            <form action="user/trip/anytripwhatsoever">
              <div className="searchbar">
                <input className="search_input" type="text" name placeholder="Search..." />
                <a href="/trip/value" className="search_icon"><i className="fas fa-search" /></a>
              </div>
            </form>
  
            </div>
          </div>
          </header>
        </div>
        </div>
        <div className="container">
        <Card />
        </div>
        </div>
        )
}

export default Banner;