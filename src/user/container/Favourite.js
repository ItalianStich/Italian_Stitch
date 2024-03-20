import React from 'react';
import { useSelector } from 'react-redux';
import TitleBox from '../UI/titlePart/TitleBox';
import { NavLink } from 'react-router-dom';

function Favourite() {
    const ProductData = useSelector((state) => state.product);
    const favouriteState = useSelector(state => state.favourites);

    let newFilterProductData = favouriteState.favItmes.map((item) => {
        let filterData = ProductData.product.find((value) => value.id === item.fid);

        if (filterData) {
            return { ...filterData, ...item };
        } else {
            return { id: item.fid };
        }
    });

    return (
        <>
            <section id="favourite" className="favourite">
                <div className="container">
                    <TitleBox
                        titleText='My Wishlist'
                        subTitleText={[
                            'Welcome to your wishlist. You can see your wishlist products here. Thank you!!!'
                        ]}
                    />
                </div>
            </section >

            {
                newFilterProductData.length > 0 ? (
                    <section id="product2" className="section-p2" style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {newFilterProductData.map((item, index) => (
                            <NavLink to={'/product_details/' + item.id} key={item.id} target="_blank">
                                <div className="col-md-3" key={`${item.id}_${index}`} style={{ flex: '0 0 25%' }}>
                                    <div className="product-card">

                                        <div className="badge">Hot</div>
                                        <div className="product-tumb">
                                            <img src={item.prec} alt={item.alt} />
                                        </div>
                                        <div className="product-details">
                                            <span className="product-catagory">{item.name} </span>

                                            {item.desc && (
                                                <p>{`${item.desc.substring(0, 25)}...`}</p>
                                            )}
                                            <div className="product-bottom-details">
                                                <div className="product-price">₹ {item.price} &nbsp; </div>
                                                <div className="product-price1">₹ {item.mrp}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </NavLink>
                        ))}
                    </section>
                ) : null
            }
        </>
    );
}

export default Favourite;
