import React, { useState } from 'react';
import './Authentication.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { forgotPassRequest, loginRequest, signupRequest } from '../../redux/action/auth.action';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '../../UI/button/Button';
import { NavLink } from 'react-router-dom';

function Authentication(props) {
    const [formType, setFormType] = useState('login');
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const Auth = useSelector(state => state.auth)

    const handleSignup = (data) => {
        console.log(data)
        dispatch(signupRequest(data));
    }

    const handleLogin = (values) => {
        console.log(values)
        dispatch(loginRequest({
            data: values,
            callback: (route) => {
                navigate(route);
            }
        }));
    }

    const handleForgotPass = (data) => {
        dispatch(forgotPassRequest(data))
    }

    let validSchema = {};
    let initialVal = { name: '', email: '', password: '' };
    if (formType === 'login') {
        validSchema = {
            email: Yup.string().email().required(),
            password: Yup.string().required().min(8, 'Password is too short - should be 8 chars minimum.')
                .matches(
                    /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
                    'Must password have, Numbers , alphabets, and Special Character'
                )
        };
        initialVal = { email: '', password: '' };
    } else if (formType === 'signup') {
        validSchema = {
            name: Yup.string().min(2).required().matches(/^[A-Za-z ]+$/, 'Name must only contain characters.'),
            email: Yup.string().email().required(),
            password: Yup.string().required().min(8, 'Password is too short - should be 8 chars minimum.')
                .matches(
                    /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
                    'Must password have, Numbers , alphabets, and Special Character'
                )
        };
        initialVal = { name: '', email: '', password: '' };
    } else if (formType === 'forgot') {
        validSchema = {
            email: Yup.string().email().required()
        };
        initialVal = { email: '' };
    }

    let authSchema = Yup.object(validSchema);
    const { errors, values, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        validationSchema: authSchema,
        initialValues: initialVal,
        enableReinitialize: true,
        onSubmit: (values, action) => {
            if (formType === "login") {
                handleLogin(values)
            } else if (formType === "signup") {
                handleSignup(values);
            } else {
                handleForgotPass(values)
            }
            action.resetForm();
        }
    });
    return (
        <div className="containerLoginPage">
            <div className="forms">
                <div className="form-content">
                    <div className="login-form">
                        <div className="title">{formType === 'forgot' ? 'Forgot your password?' : formType === 'login' ? 'Login' : 'Signup'}</div>
                        <form onSubmit={handleSubmit}>
                            <div className="input-boxes">
                                {formType === 'signup' ? (
                                    <div className="input-box">
                                        <i className="fas fa-user" />
                                        <input type="text" placeholder="Enter your name" className='name' name="name"
                                            value={values.name}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            errorText={errors.name && touched.name ? errors.name : null}
                                        />
                                    </div>
                                ) : null}

                                <div className="input-box">
                                    <i className="fas fa-envelope" />
                                    <input type="text" placeholder="Enter your email" className='email' name='email'
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        errorText={errors.email && touched.email ? errors.email : null}
                                    />
                                </div>

                                {formType === 'forgot' ? null : (
                                    <div className="input-box">
                                        <i className="fas fa-lock" />
                                        <input type="password" placeholder="Enter your password" className='password' name='password'
                                            value={values.password}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            autoComplete="current-password"
                                            errorText={errors.password && touched.password ? errors.password : null}
                                        />
                                    </div>
                                )}

                                <div className="col-md-12 my-4">
                                    {
                                        formType === "login" ?
                                            <Button type="submit">Login</Button>
                                            : formType === "signup" ?
                                                <Button type="submit">Signup</Button>
                                                : <Button type="submit">Request Reset Link</Button>
                                    }
                                </div>

                                <div className="text sign-up-text">
                                    {
                                        formType === 'forgot' ?
                                            <span>Back to<NavLink onClick={() => setFormType('login')}> Login? </NavLink></span>
                                            : formType === 'login' ?
                                                <span>Don't have an account? <NavLink onClick={() => setFormType('signup')}> Signup </NavLink></span>
                                                :
                                                <span>Already have an account? <NavLink onClick={() => setFormType('login')}> Login </NavLink></span>
                                    }
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        </div >

    );
}

export default Authentication;