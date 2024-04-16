import React from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../../context/GlobalContext';
import { MdDelete, MdKeyboardArrowLeft } from 'react-icons/md';
import './userprofile.css';

const UserProfile = () => {
    const { currentUser } = useGlobalContext();

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
                        <div className='separator'></div>
                        {/* <div className="detail">
       <div className="label-pair">
        <label>Total Trades:</label>
        <p>{currentUser.totalTrades}</p>
      </div>
      </div>
            <div className='separator'></div> */}
                         <div className='actions-container'>
                            <div className='link-container'>
                                <Link to='/purchased-bids' className='profile-link'>
                                    Purchased Bids
                                </Link>
                            </div>
                            <div className='link-container'>
                                <Link to='/placed-bids' className='profile-link'>
                                    Placed Bids
                                </Link>
                            </div>
                            <div className='delete-account-button-container'>
                                <button className='delete-account-button'>
                                    <MdDelete className='trash-icon' />
                                    <span className='delete-account-message'>
                                        Delete Account
                                    </span>
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div>Loading...</div>
                )}
            </div>

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
