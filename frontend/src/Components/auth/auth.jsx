import React, { useState } from 'react';
import './auth.css';
import { useNavigate ,useLocation} from 'react-router-dom';

const Auth = () => {
    const [otp, setOtp] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;
    const username = location.state?.username;

     const [timer, setTimer] = useState(30);

     React.useEffect(() => {
         if (timer > 0) {
             const countdown = setInterval(() => {
                 setTimer(prevTime => prevTime - 1);
             }, 1000);

             return () => clearInterval(countdown);
         } else {
             alert("OTP session expired. Please try again.");
             navigate('/');
         }
     }, [timer, navigate]);

     const formatTime = (seconds) => {
         const minutes = Math.floor(seconds / 60);
         const remainingSeconds = seconds % 60;
         return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
     };

    
     const verifyOtp = async () => {
        try {
            //from login or not
            const isLogin = location.state?.login || false;
            
            const response = await fetch('http://localhost:5000/verify_otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    email: email, 
                    otp: otp,
                    login: isLogin  //backend kay liye
                }) 
            });
            const data = await response.json();
    
            if (response.ok) {
                setMessage(data.status || 'OTP verified successfully!');
                
                if (isLogin) {
                    localStorage.setItem('user', JSON.stringify({
                        username: username,
                        loggedIn: true,
                        email: email
                    }));
                    navigate('/dashboard', { 
                        state: { username: location.state?.username } 
                    });
                } else {
                    //registration
                    alert("ACCOUNT CREATED---Track back and login");
                    navigate('/');
                }
            } else {
                setMessage(data.error || 'Invalid OTP');
            }
        } catch (error) {
            setMessage('Failed to connect to server');
            console.error('Error:', error);
        }
    };
    return (
        <div className='main-body'>
            <div className='container'>
                <div className='header'>
                    <div className="text">OTP</div>
                    <div className="underline"></div>
                </div>
                <div className='inputs'>
                    <div className='input'>
                        <input 
                            type="text" 
                            placeholder='Enter OTP' 
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />
                    </div>
                </div>
                
                <div className="otp">
                    OTP has been sent to registered email which is valid for only <br />
                    {formatTime(timer)} minutes. You will be redirected to login page if OTP is not verified.
                </div>
                <div className='submit_button' onClick={verifyOtp}>Submit</div>
                {message && <p className="message">{message}</p>}
            </div>
        </div>
    );
};

export default Auth;
