import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './dashboard.css';  // Add this import



const Dashboard = () => {

    

    const location = useLocation();
    const navigate = useNavigate();
    const username = location.state?.username || 'User';
    const handleLogout = () => {
        navigate('/');
    };
    console.log(username);
  return (
    <div className="dashboard">
      <div className="dashboard-body">
        <div className="dashboard-container">
            <div className="dashboard-header">
                <div className="text">Dashboard</div>
                <div className="underline"></div>
            </div>

            <div className="dashboard-greetings">
                <h1 className='dashboard-text'>Welcome to the Dashboard <br /> {username}</h1>
            </div>

            <div className='dashboard_submit_container'>
                 <div className='submit_button' onClick={handleLogout}>Logout</div>
            </div>
           
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
