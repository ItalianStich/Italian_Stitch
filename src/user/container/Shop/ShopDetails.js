import React from 'react';
import { getProduct } from '../../redux/slice/Product.slice';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { addToCart, incrementQuantity, decrementQuantity } from '../../redux/action/cart.action';
import { setAlert } from '../../redux/slice/Alert.slice';
import { addOnStoreAndAPI, removeOnStoreAndAPI } from '../../redux/action/favourite.action';


function ShopDetails(props) {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [isAlreadyFavourite, setIsAlreadyFavourite] = React.useState(false);
    const [quantity, setQuantity] = React.useState(1);

    const product = useSelector((state => state.product));
    const favouriteState = useSelector((state => state.favourites));

    React.useEffect(() => {
        dispatch(getProduct())
    }, [id]);

    React.useEffect(() => {
        setIsAlreadyFavourite(favouriteState.favItmes.some(item => item.fid === id));
    }, [favouriteState, id]);

    // const quantityDecrement = (id) => {
    //     dispatch(decrementQuantity(id));
    //     setQuantity(quantity - 1);
    // }
    // const quantityIncrement = (id) => {
    //     dispatch(incrementQuantity(id));
    //     setQuantity(quantity + 1);
    // }

    const handleAddToCart = (data) => {
        dispatch(setAlert({ text: data.name + ' is successfully added in cart', color: 'success' }))
        dispatch(addToCart(id, quantity));
    };

    const addToFavourite = (id) => {
        const productToAddOrRemove = product.product.find(val => val.id === id);
        if (isAlreadyFavourite) {
            dispatch(setAlert({ text: productToAddOrRemove.name + ' is successfully removed from Wishlist', color: 'success' }));
            dispatch(removeOnStoreAndAPI(id));
        } else {
            dispatch(setAlert({ text: productToAddOrRemove.name + ' is successfully added to Wishlist', color: 'success' }));
            dispatch(addOnStoreAndAPI(id));
        }
        setIsAlreadyFavourite(!isAlreadyFavourite);
    }

    return (
        <div>
            <section className="py-5">
                <div className="container">

                    {
                        product.product.map((value) => {
                            if (value.id === id) {
                                return (
                                    <div className="row gx-5" key={value.id}>
                                        <aside className="col-lg-6">
                                            <div className="border rounded-4 mb-3 d-flex justify-content-center">
                                                <NavLink className="rounded-4" data-type="image">
                                                    <img style={{ maxWidth: '100%', maxHeight: '100vh', margin: 'auto' }} className="rounded-4 fit" src={value.prec} />
                                                </NavLink>
                                            </div>
                                        </aside>
                                        <main className="col-lg-6">
                                            <div className="ps-lg-3">
                                                <h4 className="title text-dark"> {value.name} </h4>
                                                <div className="d-flex flex-row my-3">
                                                    <div className="text-warning mb-1 me-2">
                                                        <i className="fa fa-star" />
                                                        <i className="fa fa-star" />
                                                        <i className="fa fa-star" />
                                                        <i className="fa fa-star" />
                                                        <i className="fas fa-star-half-alt" />
                                                        <span className="ms-1">
                                                            4.5
                                                        </span>
                                                    </div>
                                                    <div style={{ color: 'black' }}>Availability: </div><span className="text-success ms-2">
                                                        {
                                                            value.sizesAndStocks.some(sizeOption => sizeOption.stock > 0) ? <span>In Stock</span> : <span>Out of Stock</span>
                                                        }
                                                    </span>
                                                </div>

                                                <div className="mb-3">
                                                    <span className="h5">₹ {value.price} </span>
                                                    <span className="line-through">₹ {value.mrp} </span>
                                                    <span className="text-muted" style={{ fontSize: '18px' }}> ({Math.round((value.mrp - value.price) * 100 / value.mrp)}% off)</span>
                                                </div>
                                                <p>{value.desc}</p>
                                                <div className="row">
                                                    <dt className="col-3">Fit Type</dt>
                                                    <dd className="col-9">{value.fittype}</dd>
                                                    <dt className="col-3">Type</dt>
                                                    <dd className="col-9">{value.sleevetype}</dd>
                                                    <dt className="col-3">Material</dt>
                                                    <dd className="col-9">{value.Materialcomposition}</dd>
                                                    <dt className="col-3">Brand</dt>
                                                    <dd className="col-9">{value.brand}</dd>
                                                </div>
                                                <hr />
                                                <div className="row mb-4">
                                                    <div className="col-md-4 col-6" style={{marginBottom: 30}}>
                                                        <label className="mb-2">Size</label>
                                                        <select className="form-select border border-secondary" style={{ height: 40, width: 130 }}>
                                                            {
                                                                value.sizesAndStocks.map((size, index) => (
                                                                    <option key={index} value={size}>{size.size}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                                <button className="btn btn-primary shadow-0" style={{ marginRight: 8 }} onClick={() => handleAddToCart(value)}> <i className="me-1 fa fa-shopping-basket" /> Add to cart </button>
                                                <NavLink className="btn btn-warning shadow-0" style={{ marginRight: 8 }} onClick={() => addToFavourite(value.id)}>
                                                    <i className="me-1 fa fa-heart fa-lg" /> {isAlreadyFavourite ? 'Remove from Wishlist' : 'Add to Wishlist'}
                                                </NavLink>
                                            </div>
                                        </main>
                                    </div>
                                )
                            }
                        })
                    }
                </div>
            </section>
        </div>
    );
}

export default ShopDetails;