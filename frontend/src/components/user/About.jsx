import React from 'react';
import about from'../assets/images/about.jpg'

const About = () => {
    return (
        <div className="container about-us">
        <div>
        <h1>About</h1>
        <div className="row">
        <div className="col-6">
        <p>People often get bored with their daily life routine, because work load, stress, family problems and other things that fell them sick. To overcome the stress, people look forward towards tours or trips to calm their minds with nature and relax their minds after a stress load. Some of the people don’t have any idea which place to visit or which destination to choose. This web application fulfills the needs of people who are wanting to go on a trip but are not sure which place or travel package to choose. This web application connects the travelers and the touring companies. It provides friends or individuals the opportunity to gather, make good memories and spend quality time together. </p>
        
        </div>
        <div className="col-2">
        <img src={about} />
        </div>
        </div>
        </div>
        </div>
    )
}


export default About