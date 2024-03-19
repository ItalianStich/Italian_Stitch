import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/action/cart.action';
import { setAlert } from '../redux/slice/Alert.slice';
import TitleBox from '../UI/titlePart/TitleBox';
import CartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

function Favourite() {
    const dispatch = useDispatch();
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

    const handleCart = (id) => {
        let addedCartItem = ProductData.product.find((val) => val.id === id)
        dispatch(setAlert({ text: addedCartItem.name + ' is successfully added in cart', color: 'success' }))
        dispatch(addToCart(id))
    }

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
                                            {/* <Link onClick={() => handleCart(item.id)} style={{ marginLeft: '168px' }}>
                                            <CartIcon sx={{ color: '#2c4964', fontSize: '23px' }} />
                                        </Link> */}

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
