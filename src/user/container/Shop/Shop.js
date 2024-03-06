import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../../redux/slice/Product.slice'
import { getCategory } from '../../redux/slice/category.slice'
import { NavLink } from 'react-router-dom';

function Shop(props) {
    const dispatch = useDispatch();

    const category = useSelector((state => state.category.category));
    const product = useSelector((state => state.product.product));

    useEffect(() => {
        dispatch(getCategory())
        dispatch(getProduct());
    }, [dispatch]);

    return (
        // <div className="untree_co-section product-section before-footer-section">
        //     <div className="container">
        //         <div className="row">
        //             {product.map((item, index) => (
        //                 <NavLink to={"/product_details/" + item.id}>
        //                     <div key={index} className="col-12 col-md-4 col-lg-3 mb-5">
        //                         <a className="product-item" href="#">
        //                             <img src={item.prec} className="img-fluid product-thumbnail" alt={item.title} />
        //                             <h3 className="product-title">{item.name}</h3>
        //                             <strong className="product-price">₹ {item.price}</strong>
        //                             <span className="icon-cross">
        //                                 <img src="../assets/images/cross.svg" className="img-fluid" alt="cross" />
        //                             </span>
        //                         </a>
        //                     </div>
        //                 </NavLink>
        //             ))}
        //         </div>
        //     </div>
        // </div>
        <div>
            {
                product.map((item, index) => (
                    <NavLink to={"/product_details/" + item.id}>
                        <div className="product-card">

                            <div className="badge">Hot</div>
                            <div className="product-tumb">
                                <img src={item.prec} alt />
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
            }
        </div>

    );
}

export default Shop;