import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { getProduct } from '../../redux/slice/Product.slice';
import Loader from '../../UI/loader/Loader';

function ShopSub(props) {
    const [filteredData, setFilteredData] = React.useState([]);

    const { id } = useParams();
    const dispatch = useDispatch();

    const product = useSelector((state => state.product.product));
    const isLoading = useSelector((state) => state.product.loading || state.category.loading); 

    React.useEffect(() => {
        dispatch(getProduct());
        const filtered = product.filter(item => item.sub_id === id);
        setFilteredData(filtered)
    }, [id]);

    return (
        <div>
            {isLoading ? (
                <Loader style={{ height: 'calc(100vh - 64px' }} />
            ) : (
                filteredData.map((item, index) => {
                    return (
                        <NavLink to={'/product_details/' + item.id} key={item.id} target="_blank">
                            <div className="product-card">

                                <div className="badge">Hot</div>
                                <div className="product-tumb">
                                    <img src={item.prec} alt={item.alt} />
                                </div>
                                <div className="product-details">
                                    <span className="product-catagory">{item.name}</span>
                                    <p>{`${item.desc}`}</p>
                                    <div className="product-bottom-details">
                                        <div className="product-price">₹ {item.price} &nbsp; </div>
                                        <div className="product-price1">₹ {item.mrp}</div>
                                    </div>
                                </div>
                            </div>
                        </NavLink>
                    )
                })
            )}
        </div>
    );
}

export default ShopSub;