import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../../redux/slice/Product.slice'
import { getCategory } from '../../redux/slice/category.slice'
import { NavLink } from 'react-router-dom';
import Loader from '../../UI/loader/Loader';

function Shop(props) {
    const dispatch = useDispatch();

    const category = useSelector((state => state.category.category));
    const product = useSelector((state => state.product.product));
    const isLoading = useSelector((state) => state.product.loading || state.category.loading); 

    useEffect(() => {
        dispatch(getCategory())
        dispatch(getProduct());
    }, [dispatch]);

    return (
        <div>
            {isLoading ? (
                <Loader style={{ height: 'calc(100vh - 64px' }} />
            ) : (
                product.map((item, index) => (
                    <NavLink key={item.id} to={"/product_details/" + item.id}>
                        <div className="product-card">

                            <div className="badge">Hot</div>
                            <div className="product-tumb">
                                <img src={item.prec} alt={item.alt} />
                            </div>
                            <div className="product-details">
                                <span className="product-catagory">{item.name}</span>
                                <p>{`${item.desc.substring(0, 25)}...`}</p>
                                <div className="product-bottom-details">
                                    <div className="product-price">₹ {item.price} &nbsp; </div>
                                    <div className="product-price1">₹ {item.mrp}</div>
                                </div>
                            </div>
                        </div>

                    </NavLink>
                ))
            )}
        </div>

    );
}

export default Shop;