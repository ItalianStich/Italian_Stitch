import { useFormik } from 'formik';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as Yup from "yup";
import { setAlert } from '../redux/slice/Alert.slice';
import { useNavigate } from 'react-router-dom';
import { addOrder } from '../redux/slice/OrderSlice';
import { getProduct } from '../redux/slice/Product.slice';

const CheckoutSchema = Yup.object({
    c_fname: Yup.string()
        .matches(/^[A-Za-z ]+$/, "Name must only contain characters.")
        .min(2)
        .required("Fname Required"),
    c_lname: Yup.string().required("Lname Required"),
    c_address: Yup.string().required("Address Required"),
    appartment: Yup.string().required("Appartment Required"),
    c_state_country: Yup.string().required("Country Required"),
    c_postal_zip: Yup.number().required("Pincode Required"),
    c_email_address: Yup.string().email().required("Email Required"),
    c_phone: Yup.number().required("Phone Required"),
});

const initialValues = {
    c_fname: '',
    c_lname: '',
    c_address: '',
    appartment: '',
    c_state_country: '',
    c_postal_zip: '',
    c_email_address: '',
    c_phone: ''
};

function Checkout(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const authentication = useSelector((state => state.auth.user));
    const product = useSelector((state => state.product));
    const cartState = useSelector((state => state.cart));

    // const productIds = cartState.items.map(item => item.pid);
    // const quantities = cartState.items.map(item => item.quantity);

    const productMapData = cartState.items.map((value) => ({
        product_id: value.pid,
        cart_quantity: value.quantity
    }))

    const handlePlaceOrder = (addressValues) => {
        let dataObj = {
            address: [addressValues],
            user_id: authentication.uid,
            items: productMapData
        }
        dispatch(addOrder(dataObj))
    }

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        validationSchema: CheckoutSchema,
        initialValues: initialValues,
        onSubmit: async (values, { resetForm }) => {
            // try {
            //     // dispatch(addOrder(values));
            //     dispatch(setAlert({ text: 'Your order has been confirmed successfully!', color: 'success' }));
            //     resetForm();
            //     navigate('/payment');
            // } catch (error) {
            //     console.error('Error sending message:', error);
            //     dispatch(setAlert({ text: 'An error occurred while processing your order. Please try again later.', color: 'error' }));
            // }
            handlePlaceOrder(values)
        }
    });

    return (
        <div className="untree_co-section">
            <div className="container">
                <div className="row mb-5">
                    <div className="col-md-12">
                        <div className="border p-4 rounded" role="alert">
                            Returning customer? <NavLink to={'/authentication'}>Click here</NavLink> to login
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 mb-5 mb-md-0">
                        <h2 className="h3 mb-3 text-black">Billing Details</h2>
                        <div className="p-3 p-lg-5 border bg-white">
                            <form id="checkoutForm" onSubmit={handleSubmit}>
                                <div className="form-group row">
                                    <div className="col-md-6">
                                        <label htmlFor="c_fname" className="text-black">First Name <span className="text-danger">*</span></label>
                                        <input type="text" className="form-control" id="c_fname" name="c_fname"
                                            onChange={handleChange} onBlur={handleBlur} value={values.c_fname}
                                        />
                                        {errors.c_fname && touched.c_fname ? <span className='form-error'>{errors.c_fname}</span> : null}
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="c_lname" className="text-black">Last Name <span className="text-danger">*</span></label>
                                        <input type="text" className="form-control" id="c_lname" name="c_lname"
                                            onChange={handleChange} onBlur={handleBlur} value={values.c_lname}
                                        />
                                        {errors.c_lname && touched.c_lname ? <span className='form-error'>{errors.c_lname}</span> : null}
                                    </div>
                                </div>
                                {/* <div className="form-group row">
                                <div className="col-md-12">
                                    <label htmlFor="c_companyname" className="text-black">Company Name </label>
                                    <input type="text" className="form-control" id="c_companyname" name="c_companyname" />
                                </div>
                            </div> */}
                                <div className="form-group row">
                                    <div className="col-md-12">
                                        <label htmlFor="c_address" className="text-black" style={{ paddingTop: 10 }}>Address <span className="text-danger">*</span></label>
                                        <input type="text" className="form-control" id="c_address" name="c_address" placeholder="Street address"
                                            onChange={handleChange} onBlur={handleBlur} value={values.c_address}
                                        />
                                        {errors.c_address && touched.c_address ? <span className='form-error'>{errors.c_address}</span> : null}
                                    </div>
                                </div>
                                <div className="form-group mt-3" style={{ paddingTop: 10 }}>
                                    <input type="text" className="form-control" name='appartment' placeholder="Apartment, suite, unit etc. (optional)"
                                        onChange={handleChange} onBlur={handleBlur} value={values.appartment}
                                    />
                                    {errors.appartment && touched.appartment ? <span className='form-error'>{errors.appartment}</span> : null}
                                </div>
                                <div className="form-group row">
                                    <div className="col-md-6">
                                        <label htmlFor="c_state_country" className="text-black" style={{ paddingTop: 10 }}>State / Country <span className="text-danger">*</span></label>
                                        <input type="text" className="form-control" id="c_state_country" name="c_state_country"
                                            onChange={handleChange} onBlur={handleBlur} value={values.c_state_country}
                                        />
                                        {errors.c_state_country && touched.c_state_country ? <span className='form-error'>{errors.c_state_country}</span> : null}
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="c_postal_zip" className="text-black" style={{ paddingTop: 10 }}>Pincode <span className="text-danger">*</span></label>
                                        <input type="number" className="form-control" id="c_postal_zip" name="c_postal_zip"
                                            onChange={handleChange} onBlur={handleBlur} value={values.c_postal_zip}
                                        />
                                        {errors.c_postal_zip && touched.c_postal_zip ? <span className='form-error'>{errors.c_postal_zip}</span> : null}
                                    </div>
                                </div>
                                <div className="form-group row mb-5">
                                    <div className="col-md-6">
                                        <label htmlFor="c_email_address" className="text-black" style={{ paddingTop: 10 }}>Email Address <span className="text-danger">*</span></label>
                                        <input type="email" className="form-control" id="c_email_address" name="c_email_address"
                                            onChange={handleChange} onBlur={handleBlur} value={values.c_email_address}
                                        />
                                        {errors.c_email_address && touched.c_email_address ? <span className='form-error'>{errors.c_email_address}</span> : null}
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="c_phone" className="text-black" style={{ paddingTop: 10 }}>Phone <span className="text-danger">*</span></label>
                                        <input type="tel" className="form-control" id="c_phone" name="c_phone" placeholder="Phone Number"
                                            onChange={handleChange} onBlur={handleBlur} value={values.c_phone}
                                        />
                                        {errors.c_phone && touched.c_phone ? <span className='form-error'>{errors.c_phone}</span> : null}
                                    </div>
                                </div>


                            </form>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="row mb-5">
                            <div className="col-md-12">
                                <h2 className="h3 mb-3 text-black">Coupon Code</h2>
                                <div className="p-3 p-lg-5 border bg-white">
                                    <label htmlFor="c_code" className="text-black mb-3">Enter your coupon code if you have one</label>
                                    <div className="input-group w-75 couponcode-wrap">
                                        <input type="text" className="form-control me-2" id="c_code" placeholder="Coupon Code" aria-label="Coupon Code" aria-describedby="button-addon2" />
                                        <div className="input-group-append">
                                            {/* <button className="btn1 btn-black btn-sm" type="button" id="button-addon2">Apply</button> */}
                                            <button className="btn2 btn2-primary" type='button'>Apply</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row mb-5">
                            <div className="col-md-12">
                                <h2 className="h3 mb-3 text-black">Your Order</h2>
                                <div className="p-3 p-lg-5 border bg-white">
                                    <table className="table site-block-order-table mb-5">
                                        <thead>
                                            <tr><th>Product</th>
                                                <th>Total</th>
                                            </tr></thead>
                                        <tbody>
                                            <tr>
                                                <td>Top Up T-Shirt <strong className="mx-2">x</strong> 1</td>
                                                <td>$250.00</td>
                                            </tr>
                                            <tr>
                                                <td>Polo Shirt <strong className="mx-2">x</strong>   1</td>
                                                <td>$100.00</td>
                                            </tr>
                                            <tr>
                                                <td className="text-black font-weight-bold"><strong>Cart Subtotal</strong></td>
                                                <td className="text-black">$350.00</td>
                                            </tr>
                                            <tr>
                                                <td className="text-black font-weight-bold"><strong>Order Total</strong></td>
                                                <td className="text-black font-weight-bold"><strong>$350.00</strong></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div className="form-group">
                                        {/* <button className="btn1 " onclick="window.location='thankyou.html'">Place Order</button> */}
                                        {/* <button className="btn2 btn2-primary">Place Order</button> */}
                                        <button form="checkoutForm" type='submit' className="btn2 btn2-primary">Place Order</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* </form> */}
            </div>
        </div>

    );
}

export default Checkout;