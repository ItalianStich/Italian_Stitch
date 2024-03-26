import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOrder, updateOrderStatus } from '../../../user/redux/slice/OrderSlice';
import { getProduct } from '../../../user/redux/slice/Product.slice';

function OrderDetails(props) {
    const { id } = useParams();
    const order = useSelector((state => state.order))
    const product = useSelector((state => state.product))
    const dispatch = useDispatch();
    const [filteredData, setFilteredData] = React.useState([]);
    const [productData, setProductData] = React.useState([]);
    const [selectedStatus, setSelectedStatus] = React.useState('');

    React.useEffect(() => {
        dispatch(getOrder(id));
        const filtered = order.order.filter(item => item.id === id);
        setFilteredData(filtered);
        dispatch(getProduct(id));
    }, [dispatch, id, order.order]);

    React.useEffect(() => {
        let orderMap = filteredData.map((orderData) => {
            let orderItemData = orderData.items.map((OrderItems) => {
                let productDataFilter = product.product.find((productData) => {
                    return OrderItems.product_id === productData.id;
                });
                return { ...productDataFilter, ...orderData };
            });
            return orderItemData;
        });
        orderMap = orderMap.flat();
        setProductData(orderMap);
    }, [filteredData, product.product]);

    const handleStatusChanged = () => {
        dispatch(updateOrderStatus({ orderId: id, newStatus: selectedStatus }))
    }

    return (
        // <section id='cart' className='section-p1'>
        //     <div>
        //         <table>
        //             <thead>
        //                 <tr>
        //                     <td>Image</td>
        //                     <td>Person Name</td>
        //                     <td>Price</td>
        //                     <td>Address</td>
        //                     <td>Status</td>
        //                 </tr>
        //             </thead>
        //             <tbody>
        //                 {
        //                     productData.map((item, index) => {
        //                         return (
        //                             <tr>
        //                                 <td><img src={item.prec} alt='' /></td>
        //                                 <td>{item.name}</td>
        //                                 <td>{item.price} ₹</td>
        //                                 <td>{item.flat}...</td>
        //                                 <td>
        //                                     {
        //                                         index === 0 ? <select
        //                                             value={selectedStatus}
        //                                             onChange={(e) => { setSelectedStatus(e.target.value) }}
        //                                         >
        //                                             <option value="processing">Processing</option>
        //                                             <option value="shipped">Shipped</option>
        //                                             <option value="cancelled">Cancelled</option>
        //                                         </select> : ''
        //                                     }
        //                                 </td>
        //                             </tr>
        //                         )
        //                     })
        //                 }

        //             </tbody>
        //         </table>

        //         <div role='none' style={{ paddingLeft: '800px' }}>
        //             <button id='prev' className='_1Pr1m wQxKC _2fXFm _2zWIL' style={{ backgroundColor: 'lightgrey', color: 'black' }} type='submit' aria-label='Submit' tabIndex={0}
        //                 onClick={handleStatusChanged}
        //             >
        //                 <span>
        //                     <strong>Submit</strong>
        //                 </span>
        //             </button>
        //         </div>
        //     </div>
        // </section>

        <div className='mt-5'>
            {
                productData.map((item, index) => {
                    return (
                        <div className="product-card" key={item.id}>
                            <div className="badge">Hot</div>
                            <div className="product-tumb">
                                <img src={item.prec} alt={item.alt} />
                            </div>
                            <div className="product-details">
                                <span className="product-catagory">{item.name}</span>
                                <p>{item.desc && typeof item.desc === 'string' ? `${item.desc.substring(0, 25)}` : ''}</p>
                                <div className="product-bottom-details">
                                    <div className="product-price">₹ {item.price} &nbsp; </div>
                                    <div className="product-price1">₹ {item.mrp}</div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default OrderDetails;