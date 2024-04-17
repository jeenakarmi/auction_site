import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context/GlobalContext';
import { MdDelete, MdKeyboardArrowLeft } from 'react-icons/md';
import axios from 'axios';
import './userprofile.css';

const UserProfile = () => {
    const { currentUser , client} = useGlobalContext();
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const getCSRFToken = () => {
        const csrfCookie = document.cookie.split('; ').find(cookie => cookie.startsWith('csrftoken='));
        if (csrfCookie) {
            return csrfCookie.split('=')[1];
        } else {
            console.error('CSRF token not found in cookies.');
            return null;
        }
    };

    const handleDeleteAccount = () => {
        const csrfToken = getCSRFToken(); 
        if (csrfToken) {  
        const userId = currentUser.id; // Assuming currentUser contains the user information
        client.delete('/api/delete/', {
            data: { id: userId }, // Send the user ID instead of the password
            headers: {
                'X-CSRFToken': csrfToken,
            },
    
        })
                    .then((response) => {
                        // Handle successful deletion
                        console.log(response.data);
                        alert('Account Deleted!');
                        // Redirect or display a success message as needed
                        navigate('/');// go to home
                    })
                    .catch((error) => {
                        // Handle errors
                        console.error('Error deleting account:', error.response.data);
                        // Display an error message to the user
             });

              console.log(' Deleting account...');
            }
    };

    const handleCancelDelete = () => {
        setConfirmDelete(false);
    };

    const RenderBidsPageButtons = () => {
        if (currentUser.userType === 'BUYER') {
            return (
                <>
                    <div className='link-container'>
                        <Link to='/purchased-bids' className='profile-link'>
                            Purchased Bids
                        </Link>
                    </div>
                    <div className='link-container'>
                        <Link
                            to='/pending-make-payment-bids'
                            className='profile-link'
                        >
                            Pending Payment
                        </Link>
                    </div>
                    <div className='link-container'>
                        <Link to='/placed-top-bids' className='profile-link'>
                            Placed Top Bids
                        </Link>
                    </div>
                </>
            );
        } else {
            return (
                <>
                    <div className='link-container'>
                        <Link to='/sold-lots' className='profile-link'>
                            Sold Lots
                        </Link>
                    </div>
                    <div className='link-container'>
                        <Link
                            to='/pending-receive-payment-bids'
                            className='profile-link'
                        >
                            Pending Payment
                        </Link>
                    </div>
                    <div className='link-container'>
                        <Link to='/my-active-lots' className='profile-link'>
                            Active Bids
                        </Link>
                    </div>
                </>
            );
        }
    };

    return (
        <div>
            <div className='user-profile'>
                <h2>Personal and Account Information</h2>
                {currentUser ? (
                    <>
                        <div className='detail'>
                            <div className='label-pair'>
                                <label>Username:</label>
                                <p>{currentUser.username}</p>
                            </div>
                        </div>
                        <div className='separator'></div>
                        <div className='detail'>
                            <div className='label-pair'>
                                <label>User ID:</label>
                                <p>{currentUser.id}</p>
                            </div>
                        </div>
                        <div className='separator'></div>
                        <div className='detail'>
                            <div className='label-pair'>
                                <label>Email:</label>
                                <p>{currentUser.email}</p>
                            </div>
                        </div>
                        <div className='separator'></div>
                        <div className='detail'>
                            <div className='label-pair'>
                                <label>Phone:</label>
                                <p>{currentUser.phone}</p>
                            </div>
                        </div>
                        <div className='separator'></div>
                        <div className='detail'>
                            <div className='label-pair'>
                                <label>User Type:</label>
                                <p>{currentUser.userType}</p>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className='loading'>Loading...</div>
                )}
            </div>

            <div className='card'>
                {currentUser && RenderBidsPageButtons()}
                <div className='delete-account-button-container'>
                    <button className='delete-account-button' onClick={() => setConfirmDelete(true)}>
                        <MdDelete className='trash-icon' /> {/* Add MdDelete icon */}
                        <span className='delete-account-message'>Delete Account</span>
                    </button>
                </div>
            </div>
                
            {/* Confirmation modal for delete */}
            {confirmDelete && (
                <div className='confirmation-modal'>
                    <p>Are you sure you want to delete your account?</p>
                
                   <div className='confirmation-buttons-container'>
    <button onClick={handleCancelDelete}>Cancel</button>
    <button onClick={handleDeleteAccount}>Delete</button>
  </div>
                </div>
            )}

            <div className='go-back-button-container'>
                <Link to='/' className='go-back-link'>
                    <MdKeyboardArrowLeft className='arrow-icon' />
                    <span>Go Back</span>
                </Link>
            </div>
        </div>
    );
};

export default UserProfile;
