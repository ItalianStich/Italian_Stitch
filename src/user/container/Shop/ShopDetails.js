import React from 'react';
import { getProduct } from '../../redux/slice/Product.slice';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function ShopDetails(props) {
    const { id } = useParams();
    const dispatch = useDispatch();
    const product = useSelector((state => state.product.product))

    React.useEffect(() => {
        dispatch(getProduct())
    }, [id]);

    return (
        <div className="pd-wrap">
            {
                product.map((value, index) => {
                    if (value.id === id) {
                        console.log(value);
                        return (
                            <div className="container" key={index}>
                                <div className="heading-section"></div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div id="slider" className="owl-carousel product-slider">
                                            <div className="productData">
                                                <img src={value.prec} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="product-dtl">
                                            <div className="product-info">
                                                <div className="product-name">{value.name}</div>
                                                <p>{value.desc}</p>
                                            </div>
                                            <div className="product-price-discount">
                                                <span><b>₹ {value.price}</b></span>
                                                <span className="line-through">₹ {value.mrp} </span>
                                                <span style={{ fontSize: '18px' }}>&nbsp; ({Math.round((value.mrp - value.price) * 100 / value.mrp)}% off)</span>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <label htmlFor="size">Size</label>
                                                    <select id="size" name="size" className="form-control">
                                                        {
                                                            value.sizesAndStocks.map((size, index) => (
                                                                <option key={index} value={size}>{size.size}</option>
                                                            ))
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                            <br></br>

                                            <div className="row">
                                                
                                                <div>Availability: &nbsp;
                                                    {
                                                        value.sizesAndStocks.some(sizeOption => sizeOption.stock > 0) ? <span>In Stock</span> : <span>Out of Stock</span>
                                                    }
                                                </div>
                                            </div>
                                            <div className="product-count">
                                                <label htmlFor="size">Quantity</label>
                                                <form action="#" className="display-flex">
                                                    <div className="qtyminus">-</div>
                                                    <input type="text" name="quantity" defaultValue={1} className="qty" />
                                                    <div className="qtyplus">+</div>
                                                </form>
                                                <a href="#" className="round-black-btn">Add to Cart</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="product-info-tabs">
                                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                                        <li className="nav-item">
                                            <a className="nav-link active" id="description-tab" data-toggle="tab" href="#description" role="tab" aria-controls="description" aria-selected="true">Description</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" id="review-tab" data-toggle="tab" href="#review" role="tab" aria-controls="review" aria-selected="false">Reviews (0)</a>
                                        </li>
                                    </ul>
                                    <div className="tab-content" id="myTabContent">
                                        <div className="tab-pane fade show active" id="description" role="tabpanel" aria-labelledby="description-tab">
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.
                                        </div>
                                        <div className="tab-pane fade" id="review" role="tabpanel" aria-labelledby="review-tab">
                                            <div className="review-heading">REVIEWS</div>
                                            <p className="mb-20">There are no reviews yet.</p>
                                            <form className="review-form">
                                                <div className="form-group">
                                                    <label>Your rating</label>
                                                    <div className="reviews-counter">
                                                        <div className="rate">
                                                            <input type="radio" id="star5" name="rate" defaultValue={5} />
                                                            <label htmlFor="star5" title="text">5 stars</label>
                                                            <input type="radio" id="star4" name="rate" defaultValue={4} />
                                                            <label htmlFor="star4" title="text">4 stars</label>
                                                            <input type="radio" id="star3" name="rate" defaultValue={3} />
                                                            <label htmlFor="star3" title="text">3 stars</label>
                                                            <input type="radio" id="star2" name="rate" defaultValue={2} />
                                                            <label htmlFor="star2" title="text">2 stars</label>
                                                            <input type="radio" id="star1" name="rate" defaultValue={1} />
                                                            <label htmlFor="star1" title="text">1 star</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label>Your message</label>
                                                    <textarea className="form-control" rows={10} defaultValue={""} />
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <input type="text" name className="form-control" placeholder="Name*" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <input type="text" name className="form-control" placeholder="Email Id*" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <button className="round-black-btn">Submit Review</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ textAlign: 'center', fontSize: 14, paddingBottom: 20 }}>Get free icon packs for your next project at <a href="http://iiicons.in/" target="_blank" style={{ color: '#ff5e63', fontWeight: 'bold' }}>www.iiicons.in</a></div>
                            </div>
                        )
                    }
                })
            }
        </div>
    );
}

export default ShopDetails;
