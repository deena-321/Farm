import React from "react";
import veg from './veg.jpg';
import veg2 from './veg2.avif';
import rice from './rice.jpg';
import './imageContainer.css';

function imageContainer() {
    return(
        <div className="image-container">
            <div className="image">
            <h2 className="text">Welcome To Farm Society</h2>
            <h2 className="text">Buy and Sell Farm Products</h2>
            </div>
        
            <div className="photo-grid">
                <img src={veg} alt="Veg" />
                <img src={veg2} alt="Veg2" />
                <img src={rice} alt="Rice" />
            </div>
        </div>
    );
}

export default imageContainer;