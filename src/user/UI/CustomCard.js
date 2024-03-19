// CustomCard.js

import React from 'react';

function CustomCard({ cardData, onClick, btnText }) {
    const { id, name, desc, price, mrp, prec, alt } = cardData;

    return (
        <div className="product-card">
            <div className="badge">Hot</div>
            <div className="product-tumb">
                <img src={prec} alt={alt} />
            </div>
            <div className="product-details">
                <span className="product-catagory">{name}</span>
                <p>{desc}</p>
                <div className="product-bottom-details">
                    <div className="product-price">₹ {price} &nbsp; </div>
                    <div className="product-price1">₹ {mrp}</div>
                </div>
            </div>
            <button onClick={() => onClick(id)}>{btnText}</button>
        </div>
    );
}

export default CustomCard;
