import React from 'react';
import { getProduct } from '../../redux/slice/Product.slice';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { addToCart, incrementQuantity, decrementQuantity } from '../../redux/action/cart.action';
import { setAlert } from '../../redux/slice/Alert.slice';
import { addOnStoreAndAPI, removeOnStoreAndAPI } from '../../redux/action/favourite.action';
import { addReview, getReview } from '../../redux/slice/Review.slice';

function ShopDetails(props) {
    const { id } = useParams();
    const dispatch = useDispatch();
    
    const [isAlreadyFavourite, setIsAlreadyFavourite] = React.useState(false);
    const [quantity, setQuantity] = React.useState(1);

    const product = useSelector((state => state.product));
    const favouriteState = useSelector((state => state.favourites));
    const reviews = useSelector(state => state.reviews);
    
    const [reviewData, setReviewData] = React.useState({
        rating: 0,
        comment: '',
        email: ''
    });

    React.useEffect(() => {
        dispatch(getProduct())
        dispatch(getReview())
    }, [id, dispatch]);

    React.useEffect(() => {
        setIsAlreadyFavourite(favouriteState.favItmes.some(item => item.fid === id));
    }, [favouriteState, id]);

    const handleAddReview = (e) => {
        e.preventDefault();
        if (!reviewData.rating || !reviewData.comment || !reviewData.email) {
            dispatch(setAlert({ text: 'Please fill in all the required fields.', color: 'error' })) // Display error message
            return; // Exit the function if validation fails
        }
        dispatch(addReview({ productId: id, reviewData }));
        setReviewData(prevState => ({ ...prevState, comment: '', email: '' })); // Reset comment and email fields

        dispatch(setAlert({ text: 'Review submitted successfully.', color: 'success' }));
    };

    const handleChangeComment = (e) => {
        setReviewData(prevState => ({
            ...prevState,
            comment: e.target.value
        }));
    };

    const handleChangeEmail = (e) => {
        setReviewData(prevState => ({
            ...prevState,
            email: e.target.value
        }));
    };

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
                                                    <img style={{ maxWidth: '100%', maxHeight: '100vh', margin: 'auto' }} className="rounded-4 fit" src={value.prec} alt={value.name} />
                                                </NavLink>
                                            </div>
                                        </aside>
                                        <main className="col-lg-6">
                                            <div className="ps-lg-3">
                                                <h4 className="title text-dark"> {value.name} </h4>
                                                <p>{value.desc}</p>
                                                <div className="mb-3">
                                                    <span className="h5">₹ {value.price} </span>
                                                    <span className="line-through">₹ {value.mrp} </span>
                                                    <span className="text-muted" style={{ fontSize: '18px' }}> ({Math.round((value.mrp - value.price) * 100 / value.mrp)}% off)</span>
                                                </div>
                                                <div className="d-flex flex-row my-3">
                                                    <div style={{ color: 'black' }}>Availability: </div><span className="text-success ms-2">
                                                        {
                                                            value.sizesAndStocks.some(sizeOption => sizeOption.stock > 0) ? <span>In Stock</span> : <span>Out of Stock</span>
                                                        }
                                                    </span>
                                                </div>
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
                                                    <div className="col-md-4 col-6" style={{ marginBottom: 30 }}>
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
                                                    <i className="me-1 fa fa-heart fa-lg" /> {isAlreadyFavourite ? 'Remove to Wishlist' : 'Add to Wishlist'}
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
            <hr style={{ width: '80%', marginLeft: '10%' }} />
            <div className="container">
                <div className="reviews-container">
                    {reviews && reviews.map(review => (
                        <div className="review-item" key={review.id}>
                            <div className="review-rating">
                                {/* Star ratings */}
                                {Array.from({ length: 5 }).map((_, index) => (
                                    <i key={index} className={`fa fa-star${index < review.rating ? '' : '-o'}`} />
                                ))}
                            </div>
                            <div className="review-comment">{review.comment}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="container">
                <form onSubmit={handleAddReview} style={{ textAlign: 'center' }}>
                    <div className="form-group">
                        <h6 className="review-h6" style={{ marginLeft: '-437px' }}>Your Review is matter.</h6>
                        <h6 className="review-h6" style={{ marginBottom: '15px' }}>Have you used this product before?</h6>

                        <div className="rating-stars" style={{ color: '#f2b600', marginLeft: '-315px' }}>
                            <label className="form-label" style={{ marginLeft: '-80px', marginRight: '15px' }}>Rating</label>
                            {[...Array(5)].map((_, index) => (
                                <i
                                    key={index}
                                    className={`fa fa-star${index < reviewData.rating ? '' : '-o'}`}
                                    onClick={() => setReviewData(prevState => ({ ...prevState, rating: index + 1 }))}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="col-12 mb-3 form_field position-relative">
                        <label htmlFor="c_email_address" className="form-label" style={{ paddingTop: 10, marginLeft: '-500px' }}>Email Address</label>
                        <input style={{ width: '55%', marginLeft: '23%' }} type="email" className="form-control" id="c_email_address" name="c_email_address"
                            value={reviewData.email}
                            onChange={handleChangeEmail}
                        />
                    </div>

                    <label className="form-label" style={{ marginLeft: '-500px' }}>Description</label>
                    <div className="col-12 mb-3 form_field position-relative">

                        <textarea style={{ width: '55%' }} rows={"5"} cols={"60"} className='m-0' margin="dense" id="desc" label="Description" type="text" fullWidth multiline name='desc' variant="standard"
                            onChange={handleChangeComment}
                            value={reviewData.comment}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ marginLeft: '-440px' }}>Submit Review</button>
                </form>
            </div >


        </div >
    );
}

export default ShopDetails;

