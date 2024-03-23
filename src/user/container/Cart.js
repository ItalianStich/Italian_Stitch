import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getProduct } from '../redux/slice/Product.slice';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../UI/button/Button';
import { decrementQuantity, incrementQuantity, removeItemFromCart } from '../redux/action/cart.action';
import { setAlert } from '../redux/slice/Alert.slice';
import CloseIcon from '@mui/icons-material/Close';
import TitleBox from '../UI/titlePart/TitleBox';

function Cart(props) {
    const dispatch = useDispatch();
    const product = useSelector((state) => state.product);
    const cartState = useSelector((state) => state.cart);
    const [quantity, setQuantity] = useState({}); // Initialize quantity state

    useEffect(() => {
        dispatch(getProduct())
    }, [dispatch]);

    useEffect(() => {
        // Initialize quantity state with quantities from cartState
        const initialQuantityState = {};
        cartState.items.forEach(item => {
            initialQuantityState[item.pid] = item.quantity;
        });
        setQuantity(initialQuantityState);
    }, [cartState.items]);

    let productToCart = cartState.items.map((cartItem) => {
        let filterData = product.product.find((medicine) => medicine.id === cartItem.pid);
        return { ...filterData, ...cartItem }
    })

    const calculateTotalAmount = () => {
        let tempTotal = productToCart.reduce((acc, val) => acc + parseInt(val.price) * quantity[val.pid], 0);
        return tempTotal;
    }

    const quantityDecrement = (id) => {
        dispatch(decrementQuantity(id));
        setQuantity(prevState => ({ ...prevState, [id]: prevState[id] - 1 }));
    }

    const quantityIncrement = (id) => {
        dispatch(incrementQuantity(id));
        setQuantity(prevState => ({ ...prevState, [id]: prevState[id] + 1 }));
    }

    const removeFromCart = (id) => {
        let addedCartItem = product.product.find((val) => val.id === id)
        dispatch(setAlert({ text: addedCartItem.name + ' is successfully removed from cart', color: 'success' }))
        dispatch(removeItemFromCart(id));
        // Remove quantity from local state
        setQuantity(prevState => {
            const newState = { ...prevState };
            delete newState[id];
            return newState;
        });
    }

    return (
        <div className="untree_co-section1">
            <TitleBox
                titleText='Your Carts'
                subTitleText={[
                    'Welcome to cart. You can see here your cart product. Thank you !!!'
                ]} />
            <div className="container">
                <div className="row mb-5">
                    <form className="col-md-12" method="post">
                        <div className="site-blocks-table">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th className="product-thumbnail">Image</th>
                                        <th className="product-name">Product</th>
                                        <th className="product-price">Price</th>
                                        <th className="product-quantity">Quantity</th>
                                        <th className="product-total">Total</th>
                                        <th className="product-remove">Remove</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productToCart.map((item) => (
                                        <tr key={item.id}>
                                            <td className="product-thumbnail">
                                                <img src={item.prec} alt="Product" className="img-fluid" />
                                            </td>
                                            <td className="product-name">
                                                <h2 className="h5 text-black">{item.name}</h2>
                                            </td>
                                            <td>₹ {item.price}.00</td>
                                            <td>
                                                <div className="input-group mb-3 d-flex align-items-center quantity-container" style={{ maxWidth: 120 }}>
                                                    <div className="input-group-prepend">
                                                        <button className="btn1 btn-outline-black decrease" type="button" onClick={() => quantityDecrement(item.pid)}>−</button>
                                                    </div>
                                                    <input type="text" className="form-control text-center quantity-amount" placeholder={item.quantity} />
                                                    <div className="input-group-append">
                                                        <button className="btn1 btn-outline-black increase" type="button" onClick={() => quantityIncrement(item.pid)}>+</button>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>₹ {item.quantity * item.price}</td>
                                            <td>
                                                <Button onClick={() => removeFromCart(item.pid)} classes='p-0 bg-transparent'>
                                                    <CloseIcon sx={{ color: 'gray' }} />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </form>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="row mb-5">
                            <div className="col-md-6">
                                <NavLink to={"/shop"} >
                                    <button className="btn2 btn2-primary"> Continue Shopping </button>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 pl-5">
                        <div className="row justify-content-end">
                            <div className="col-md-7">
                                <div className="row">
                                    <div className="col-md-12 text-right border-bottom mb-5">
                                        <h3 className="text-black h4 text-uppercase">Cart Totals</h3>
                                    </div>
                                </div>
                                <div className="row mb-5">
                                    <div className="col-md-6">
                                        <span className="text-black">Total</span>
                                    </div>
                                    <div className="col-md-6 text-right">
                                        <strong className="text-black">₹ {calculateTotalAmount()}</strong>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <NavLink to={"/checkout"}>
                                            <button className="btn2 btn2-primary"> Proceed to Checkout</button>
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;
