import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../../redux/slice/Product.slice'
import { NavLink } from 'react-router-dom';

function Shop(props) {
    const dispatch = useDispatch();

    const product = useSelector((state => state.product.product));
    console.log(product);

    useEffect(() => {
        dispatch(getProduct());
    }, [dispatch]);

    return (
        // <div className="untree_co-section product-section before-footer-section">
        //     <div className="container">
        //         <div className="row">
        //             <div className="col-12 col-md-4 col-lg-3 mb-5">
        //                 <a className="product-item" href="#">
        //                     <img src="../assets/images/product-3.png" className="img-fluid product-thumbnail" />
        //                     <h3 className="product-title">Nordic Chair</h3>
        //                     <strong className="product-price">$50.00</strong>
        //                     <span className="icon-cross">
        //                         <img src="../assets/images/cross.svg" className="img-fluid" />
        //                     </span>
        //                 </a>
        //             </div>
        //             <div className="col-12 col-md-4 col-lg-3 mb-5">
        //                 <a className="product-item" href="#">
        //                     <img src="../assets/images/product-1.png" className="img-fluid product-thumbnail" />
        //                     <h3 className="product-title">Nordic Chair</h3>
        //                     <strong className="product-price">$50.00</strong>
        //                     <span className="icon-cross">
        //                         <img src="../assets/images/cross.svg" className="img-fluid" />
        //                     </span>
        //                 </a>
        //             </div>
        //             <div className="col-12 col-md-4 col-lg-3 mb-5">
        //                 <a className="product-item" href="#">
        //                     <img src="../assets/images/product-2.png" className="img-fluid product-thumbnail" />
        //                     <h3 className="product-title">Kruzo Aero Chair</h3>
        //                     <strong className="product-price">$78.00</strong>
        //                     <span className="icon-cross">
        //                         <img src="../assets/images/cross.svg" className="img-fluid" />
        //                     </span>
        //                 </a>
        //             </div>
        //             <div className="col-12 col-md-4 col-lg-3 mb-5">
        //                 <a className="product-item" href="#">
        //                     <img src="../assets/images/product-3.png" className="img-fluid product-thumbnail" />
        //                     <h3 className="product-title">Ergonomic Chair</h3>
        //                     <strong className="product-price">$43.00</strong>
        //                     <span className="icon-cross">
        //                         <img src="../assets/images/cross.svg" className="img-fluid" />
        //                     </span>
        //                 </a>
        //             </div>
        //             <div className="col-12 col-md-4 col-lg-3 mb-5">
        //                 <a className="product-item" href="#">
        //                     <img src="../assets/images/product-3.png" className="img-fluid product-thumbnail" />
        //                     <h3 className="product-title">Nordic Chair</h3>
        //                     <strong className="product-price">$50.00</strong>
        //                     <span className="icon-cross">
        //                         <img src="../assets/images/cross.svg" className="img-fluid" />
        //                     </span>
        //                 </a>
        //             </div>
        //             <div className="col-12 col-md-4 col-lg-3 mb-5">
        //                 <a className="product-item" href="#">
        //                     <img src="../assets/images/product-1.png" className="img-fluid product-thumbnail" />
        //                     <h3 className="product-title">Nordic Chair</h3>
        //                     <strong className="product-price">$50.00</strong>
        //                     <span className="icon-cross">
        //                         <img src="../assets/images/cross.svg" className="img-fluid" />
        //                     </span>
        //                 </a>
        //             </div>
        //             <div className="col-12 col-md-4 col-lg-3 mb-5">
        //                 <a className="product-item" href="#">
        //                     <img src="../assets/images/product-2.png" className="img-fluid product-thumbnail" />
        //                     <h3 className="product-title">Kruzo Aero Chair</h3>
        //                     <strong className="product-price">$78.00</strong>
        //                     <span className="icon-cross">
        //                         <img src="../assets/images/cross.svg" className="img-fluid" />
        //                     </span>
        //                 </a>
        //             </div>
        //             <div className="col-12 col-md-4 col-lg-3 mb-5">
        //                 <a className="product-item" href="#">
        //                     <img src="../assets/images/product-3.png" className="img-fluid product-thumbnail" />
        //                     <h3 className="product-title">Ergonomic Chair</h3>
        //                     <strong className="product-price">$43.00</strong>
        //                     <span className="icon-cross">
        //                         <img src="../assets/images/cross.svg" className="img-fluid" />
        //                     </span>
        //                 </a>
        //             </div>
        //         </div>
        //     </div>
        // </div>
        <div className="untree_co-section product-section before-footer-section">
            <div className="container">
                <div className="row">
                    {/* <NavLink to={'/shopdetails/' + v.id} target="_blank"> */}
                    {product.map((item, index) => (
                        <NavLink to={"/product_details/" + item.id}>
                            <div key={index} className="col-12 col-md-4 col-lg-3 mb-5">
                                <a className="product-item" href="#">
                                    <img src={item.prec} className="img-fluid product-thumbnail" alt={item.title} />
                                    <h3 className="product-title">{item.name}</h3>
                                    <strong className="product-price">₹ {item.price}</strong>
                                    <span className="icon-cross">
                                        <img src="../assets/images/cross.svg" className="img-fluid" alt="cross" />
                                    </span>
                                </a>
                            </div>
                        </NavLink>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Shop;