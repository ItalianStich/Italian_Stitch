// Favourite.js

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/action/cart.action';
import { setAlert } from '../redux/slice/Alert.slice';
import CustomCard from '../UI/CustomCard';
import TitleBox from '../UI/titlePart/TitleBox';

function Favourite() {
    const dispatch = useDispatch();
    const medicineState = useSelector((state) => state.product);
    const favouriteState = useSelector(state => state.favourites);

    console.log(favouriteState)

    const handleCart = (id) => {
        let addedCartItem = medicineState.product.find((val) => val.id === id)
        dispatch(setAlert({ text: addedCartItem.name + ' cloth is successfully added in cart', color: 'success' }))
        dispatch(addToCart(id))
    }
    return (
        <section id="favourite" className="favourite">
            <div className="container">
                <TitleBox
                    titleText='Your Favourites'
                    subTitleText={[
                        'Welcome to your favourites. You can see your favourite products here. Thank you!'
                    ]}
                />
            </div>
            {favouriteState.favItmes.length > 0 ? (
                <section id="product2" className="section-p2">
                    {favouriteState.favItmes.map((item) => (
                        <div className="col-md-3" key={item.fid}>
                            <div className="product-card">

                                <div className="badge">Hot</div>
                                <div className="product-tumb">
                                    <img src={item.prec} alt={item.alt} />
                                </div>
                                <div className="product-details">
                                    <span className="product-catagory">{item.name}</span>
                                    <p>{`${item.desc}...`}</p>
                                    <div className="product-bottom-details">
                                        <div className="product-price">₹ {item.price} &nbsp; </div>
                                        <div className="product-price1">₹ {item.mrp}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </section>
            ) : null}
        </section>
    );
}

export default Favourite;
