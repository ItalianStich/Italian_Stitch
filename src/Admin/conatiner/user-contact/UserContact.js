import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact, getContact } from '../../../user/redux/slice/Contact.slice';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';

function UserContact() {
    const dispatch = useDispatch();
    const contactData = useSelector(state => state.contact.contact); // Assuming your contact data is stored in Redux state

    useEffect(() => {
        dispatch(getContact());
    }, [dispatch]);

    const handleDeleteContact = (contactId) => {
        dispatch(deleteContact(contactId));
    };

    return (
        <div>
            <div className='d-flex align-items-center justify-content-between py-5'>
                <h3 className='mb-0' style={{ color: '#FF6337' }}>User Contact</h3>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body"  style={{padding: '0px'}}>
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">Index</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Email</th>
                                                <th scope="col">Subject</th>
                                                <th scope='col'>Number</th>
                                                <th scope="col">Message</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {contactData.map((contact, contactIndex) => {
                                                return (
                                                    <tr key={`${contactIndex}`}>
                                                         <td style={{ width: '2%' }}>{contactIndex + 1}</td>
                                                        <td style={{ width: '14%' }}>{contact.name}</td>
                                                        <td style={{ width: '13%' }}>{contact.email}</td>
                                                        <td style={{ width: '20%' }}>{contact.subject}</td>
                                                        <td style={{ width: '10%' }}>{contact.number}</td>
                                                        <td style={{ width: '25%' }}>{contact.message}</td>
                                                        <td style={{ width: '4%' }}>
                                                            <IconButton aria-label="delete" type='button' size='small' onClick={() => handleDeleteContact(contact.id)} >
                                                                <DeleteIcon sx={{ fontSize: '20px' }} />
                                                            </IconButton>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>

                                </div>

                            </div>

                        </div>

                    </div>
                </div>
            </div>



        </div>
    );
}

export default UserContact;
