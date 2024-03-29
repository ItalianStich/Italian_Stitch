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
        <>

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

            <br />

            <hr />

            <div className='d-flex align-items-center justify-content-center'>
                <h3 className='mb-0' style={{ color: 'gray' }}>User Information</h3>
            </div>

            <div className="product-card" style={{ width: '600px', marginLeft: '250px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)', padding: '20px' }}>
                {
                    filteredData.map((value, index) => {
                        return value.address.map((addressItem, index) => (
                            <div key={index} className="product-details">
                                <span className="product-catagory" style={{ color: 'gray' }}>User Name: {addressItem.c_fname} {addressItem.c_lname}</span>
                                <p>Shipping Address: {addressItem.c_address} {addressItem.appartment} {addressItem.c_state_country} - {addressItem.c_postal_zip}</p>
                                <p>Mobile Number: {addressItem.c_phone}</p>
                            </div>
                        ));
                    })
                }
                <div className="product-details1" style={{ paddingLeft: '30px' }}>
                    <label htmlFor="shippingStatus">Shipping Status:</label>
                    <select id="shippingStatus" style={{ marginLeft: '10px', padding: '8px 16px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#fff', color: '#333', cursor: 'pointer', outline: 'none', width: '200px' }} value={selectedStatus} onChange={(e) => { setSelectedStatus(e.target.value) }}>
                        <option value="shipping">Shipping</option>
                        <option value="pending">Pending</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>
                <div className="product-details">
                    <button className="submit-btn" onClick={handleStatusChanged} style={{ padding: '10px 20px', backgroundColor: 'lightgrey', border: 'none', cursor: 'pointer' }}>Submit</button>
                </div>
            </div>
        </>
    )
}

export default OrderDetails;