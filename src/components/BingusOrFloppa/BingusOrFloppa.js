import React from 'react';
import './BingusOrFloppa.css';
import ImageUpload from '../ImageUpload/ImageUpload';

const BingusOrFloppa = () => {

  const random = Math.random();
return (
    <div>
        <div className="centered-div">
            <h1>Are you <span className="bingus">Bingus</span> or <span className="floppa">Floppa</span>?</h1>
            <h2>Upload a picture of yourself and I will tell you!</h2>
            <ImageUpload />
        </div>
    </div>
);
}

export default BingusOrFloppa;