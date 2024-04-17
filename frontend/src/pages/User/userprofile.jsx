import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../../context/GlobalContext';
import { MdDelete, MdKeyboardArrowLeft } from 'react-icons/md';
import './userprofile.css';

const UserProfile = () => {
    const { currentUser } = useGlobalContext();
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [password, setPassword] = useState('');

    const handleDeleteAccount = () => {
        axios
            .delete('/api/delete-account/', {
                data: { password: password },
            })
            .then((response) => {
                // Handle successful deletion
                console.log(response.data);
                // Redirect or display a success message as needed
            })
            .catch((error) => {
                // Handle errors
                console.error('Error deleting account:', error.response.data);
                // Display an error message to the user
            });
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
                    <input
                        type='password'
                        placeholder='Enter your password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
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
