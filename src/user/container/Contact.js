import { useFormik } from 'formik';
import React from 'react';
import * as Yup from "yup";
import TitleBox from '../UI/titlePart/TitleBox';
import { useDispatch } from 'react-redux';
import { addNewContact } from '../redux/slice/Contact.slice';
import { setAlert } from '../redux/slice/Alert.slice';

const SignUpSchema = Yup.object({
    name: Yup.string()
        .matches(/^[A-Za-z ]+$/, "Name must only contain characters.")
        .min(2)
        .required("Please enter your name."),
    email: Yup.string()
        .email()
        .required("Please enter email address."),
    subject: Yup.mixed()
        .required("Please enter subject."),
    number: Yup.number().required(),
    message: Yup.mixed()
        .required("Please enter any message.")
});

const initialValues = { name: '', email: '', subject: '', number: '', message: '' }
const Contact = () => {
    const dispatch = useDispatch();

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        validationSchema: SignUpSchema,
        initialValues: initialValues,
        onSubmit: async (values, { resetForm }) => {
            try {
                await dispatch(addNewContact(values));
                resetForm();
                dispatch(setAlert({ text: 'Message sent successfully!', color: 'success' }));
            } catch (error) {
                console.error('Error sending message:', error);
                dispatch(setAlert({ text: 'Failed to send message. Please try again later.', color: 'error' }));
            }
        }
    });

    return (
        <main>
            <section id="contact" className="contact">
                <div className="container">
                    <TitleBox
                        titleText='Contact'
                    />
                </div>
                <div className="container">
                    <div className="row justify-content-center mt-1"> {/* Centering the row */}
                        <div className="col-lg-8">
                            <form onSubmit={handleSubmit} className="php-email-form">
                                <div className="row">
                                    <div className="col-md-6 form-group">
                                        <input type="text" name="name" className="form-control" id="name" placeholder="Your Name"
                                            value={values.name}
                                            onChange={handleChange}
                                            onBlur={handleBlur} />
                                        {errors.name && touched.name ? <span className='form-error'>{errors.name}</span> : null}
                                    </div>
                                    <div className="col-md-6 form-group mt-4 mt-md-0">
                                        <input type="email" className="form-control" name="email" id="email" placeholder="Your Email"
                                            value={values.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur} />
                                        {errors.email && touched.email ? <span className='form-error'>{errors.email}</span> : null}
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className="col-md-6 form-group mt-4">
                                        <input type="text" className="form-control" name="subject" id="subject" placeholder="Subject"
                                            value={values.subject}
                                            onChange={handleChange}
                                            onBlur={handleBlur} />
                                        {errors.subject && touched.subject ? <span className='form-error'>{errors.subject}</span> : null}
                                    </div>

                                    <div className="col-md-6 form-group mt-4">
                                        <input type="tel" className="form-control" name="number" id="number" placeholder="Mobile Number"
                                            value={values.number}
                                            onChange={handleChange}
                                            onBlur={handleBlur} />
                                        {errors.number && touched.number ? <span className='form-error'>{errors.number}</span> : null}
                                    </div>
                                </div>

                                <div className="form-group mt-4">
                                    <textarea className="form-control" name="message" rows={5} placeholder="Message"
                                        value={values.message}
                                        onChange={handleChange}
                                        onBlur={handleBlur} />
                                    {errors.message && touched.message ? <span className='form-error'>{errors.message}</span> : null}
                                </div>
                                <div className="text-center mt-5"><button type="submit" className="btn2 btn2-primary">Send Message</button></div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Contact;
