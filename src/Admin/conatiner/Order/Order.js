import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getOrder } from '../../../user/redux/slice/OrderSlice';
import { NavLink } from 'react-router-dom';
import Loader from '../../../user/UI/loader/Loader';

function Order(props) {
    const dispatch = useDispatch();
    const order = useSelector((state) => state.order.order);
    const isLoading = useSelector((state) => state.order.loading);
    const [selectedOrder, setSelectedOrder] = React.useState(null);

    useEffect(() => {
        dispatch(getOrder());
    }, [dispatch])

    const handleViewPage = (orderItem) => {
        setSelectedOrder(orderItem);
    }

    return (
        <div>
            {isLoading ? (
                <Loader style={{ height: 'calc(100vh - 64px' }} />
            ) : (
                <>
                    <div className='d-flex align-items-center justify-content-between py-5'>
                        <h3 className='mb-0' style={{ color: '#FF6337' }}>Order</h3>
                    </div>

                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-body" style={{ padding: '0px' }}>
                                        <div className="table-responsive">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Index</th>
                                                        <th scope="col">User Name</th>
                                                        <th scope="col">ProductID</th>
                                                        <th scope="col">Quantity</th>
                                                        <th scope="col">Price</th>
                                                        <th scope="col">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                    {order.map((orderItem, orderIndex) => {
                                                        const newww = orderItem.address;
                                                        if (newww && Array.isArray(newww)) { // Check if newww is an array
                                                            return newww.map((addressItem, addressIndex) => {
                                                                return orderItem.items.map((item, itemIndex) => {
                                                                    return (
                                                                        <tr key={`${orderIndex}-${itemIndex}`}>
                                                                            <th scope="row">{orderIndex + 1}</th>
                                                                            <td>{addressItem.c_fname} {addressItem.c_lname}</td>
                                                                            <td>{item.product_id}</td>
                                                                            <td>{item.cart_quantity}</td>
                                                                            <td>₹ {orderItem.TotalAmount}</td>
                                                                            <td>
                                                                                <NavLink to={'/admin/order/orderdetails/' + orderItem.id}>
                                                                                    <button
                                                                                        className="btn btn-primary"
                                                                                        onClick={() => handleViewPage(orderItem)}
                                                                                    >
                                                                                        View
                                                                                    </button>
                                                                                </NavLink>
                                                                            </td>
                                                                        </tr>
                                                                    );
                                                                });
                                                            });
                                                        } else {
                                                            return null; // Handle the case when newww is not an array
                                                        }
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default Order;