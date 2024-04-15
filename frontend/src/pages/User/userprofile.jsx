import React, { useState } from 'react';
import axios from 'axios';
import './userprofile.css';
import { useGlobalContext } from '../../context/GlobalContext';

const UserProfile = () => {
    const {currentUser} = useGlobalContext();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    // useEffect(() => {
    //   const fetchUserData = async () => {
    //     try {
    //       const response = await axios.get('/api/user');
    //       setUserData(response.data);
    //       setLoading(false);
    //     } catch (error) {
    //       setError(error.message);
    //       setLoading(false);
    //     }
    //   };
    
    //   fetchUserData();
    // }, [currentUser]);s
    
  
    // if (loading) {
    //   return <div>Loading...</div>;
    // }
  
    // if (error) {
    //   return <div>Error: {error}</div>;
    // }
    console.log('currentUser:', currentUser);
  
  return (
    <div className="user-profile">
      <h2>Personal and Account Information</h2>
      <div className="detail">
        <label>Username:</label>
        <p>{currentUser.username}</p>
      </div>
      <div className="separator"></div>
      <div className="detail">
        <label>User ID:</label>
        <p>{currentUser.id}</p>
      </div>
      {/* <div className="separator"></div>
      <div className="detail">
        <label>Password:</label>
        <p>{userData.password}</p>
      </div> */}
      <div className="separator"></div>
      <div className="detail">
        <label>Email:</label>
        <p>{currentUser.email}</p>
      </div>
      <div className="separator"></div>
      <div className="detail">
        <label>Phone:</label>
        <p>{currentUser.phone}</p>
      </div>
      <div className="separator"></div>
      <div className="detail">
        <label>User Type:</label>
        <p>{currentUser.userType}</p>
      </div>
      {/* <div className="separator"></div>
      <div className="detail">
        <label>Total Trades:</label>
        <p>{userData.totalTrades}</p>
      </div> */}
      <div className="separator"></div>
    </div>
  );
};

export default UserProfile;
