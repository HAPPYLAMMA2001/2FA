import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import './dashboard.css';

const Dashboard = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const handleLogout = () => {
      localStorage.removeItem('user');
        navigate('/');
    };
    useEffect(() => {

      if (!user || !user.loggedIn) {
          navigate('/');
          return;
      }
  }, [navigate, user]);
  console.log(user);
  if (!user || !user.loggedIn) {
    return (
        <div className="dashboard">
            <div className="dashboard-body">
                <h2>Please log in to access the dashboard</h2>
            </div>
        </div>
    );
  }
  return (
    <div className="dashboard">
      <div className="dashboard-body">
        <div className="dashboard-container">
            <div className="dashboard-header">
                <div className="text">Dashboard</div>
                <div className="underline"></div>
            </div>

            <div className="dashboard-greetings">
                <h1 className='dashboard-text'>Welcome to the Dashboard <br /> {user.username}</h1>
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
