// import React, { useState } from 'react';
// import user from '../assets/person.png';
// import lock from '../assets/password.png';
// import email from '../assets/email.png';
// import './Login_Signup.css';
// import { Link, useNavigate } from 'react-router-dom';

// const Login_Signup = () => {
//     const [action, setAction] = useState('Sign Up');
//     const [emailInput, setEmailInput] = useState('');
//     const [user_password,setUserPassword]=useState('')
//     const [message, setMessage] = useState('');
//     const navigate = useNavigate();

//     const requestOtp = async () => {
//         try {
//             const response = await fetch('/generate_otp', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ email: emailInput,password:user_password })
//             });
//             const data = await response.json();
//             navigate('/authentication', { state: { email: emailInput } });
//             if (response.ok) {
//                 setMessage(data.status || 'OTP sent to your email!');
//                 navigate('/authentication', { state: { email: emailInput } });
//             } else {
//                 setMessage(data.error || 'Error requesting OTP');
//             }
//         } catch (error) {
//             setMessage('Failed to connect to server');
//         }
//     };
//     const login_user = async () =>{
//         try {
//             const response = await fetch('/login', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ email: emailInput, password: userPassword })
//             });
//             const data = await response.json();
//             setLoading(false);

//             if (response.ok) {
//                 setMessage(data.status || 'Login successful!');
//                 alert("LOGIN SUCCESSFULL")
//                 // navigate('/dashboard');
//             } else {
//                 setMessage(data.error || 'Invalid login credentials');
//             }
//         } catch (error) {
//             setMessage('Failed to connect to server');
//         }
//     };
//     return (
//         <div className='login-body'>
//             <div className='container'>
//                 <div className='header'>
//                     <div className="text">{action}</div>
//                     <div className="underline"></div>
//                 </div>
                
//                 <div className='inputs'>
//                     {action === 'Login' ? <div></div> :
//                         <div className='input'>
//                             <img src={user} alt="" />
//                             <input type="text" placeholder='Full Name'/>
//                         </div>
//                     }

//                     <div className='input'>
//                         <img src={email} alt="" />
//                         <input 
//                             type="email" 
//                             placeholder='Email' 
//                             value={emailInput}
//                             onChange={(e) => setEmailInput(e.target.value)}
//                         />
//                     </div>

//                     <div className='input'>
//                         <img src={lock} alt="" />
//                         <input 
//                         type="password" 
//                         placeholder='Password'
//                         value = {user_password}
//                         onChange={(e)=>setUserPassword(e.target.value)}
                        
//                         />
//                     </div>
//                 </div>
                
//                 {action === 'Sign Up' ? <div></div> :
//                     <div className="forget_password">Lost Password? <span>Click Here</span> </div>
//                 }

//                 <div className='submit-container'>
//                     <div className={action === 'Login' ? 'submit gray' : 'submit'} onClick={() => setAction('Sign Up')}>Sign Up</div>
//                     <div className={action === 'Sign Up' ? 'submit gray' : 'submit' } onClick={() => setAction('Login')}>Login</div>
//                 </div>
                
//                 <div className='submit_button' onClick={action === 'Sign Up' ? requestOtp : login_user}>
//                 Submit
//                 </div>
//                 {message && <p className="message">{message}</p>}
//             </div>
//         </div>
//     );
// };

// export default Login_Signup;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import React, { useState } from 'react';
import user from '../assets/person.png';
import lock from '../assets/password.png';
import email from '../assets/email.png';
import './Login_Signup.css';
import { Link, useNavigate } from 'react-router-dom';

const Login_Signup = () => {
    const [action, setAction] = useState('Sign Up');
    const [emailInput, setEmailInput] = useState('');
    const [user_password, setUserPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const requestOtp = async () => {
        try {
            const response = await fetch('http://localhost:5000/generate_otp', { // Update endpoint if needed
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: emailInput, password: user_password })
            });
            const data = await response.json();

            if (response.ok) {
                setMessage(data.status || 'OTP sent to your email!');
                navigate('/authentication', { state: { email: emailInput } });
            } else {
                setMessage(data.error || 'Error requesting OTP');
            }
        } catch (error) {
            console.error('Error requesting OTP:', error); // Log error for debugging
            setMessage('Failed to connect to server');
        }
    };

    const login_user = async () => {
        try {
            const response = await fetch('http://localhost:5000/login', { // Update endpoint if needed
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: emailInput, password: user_password }) // Fixed typo here
            });
            const data = await response.json();

            if (response.ok) {
                setMessage(data.status || 'Login successful!');
                alert('LOGIN SUCCESSFUL');
                navigate('/dashboard'); // Uncomment or adjust this for actual navigation
            } else {
                setMessage(data.error || 'Invalid login credentials');
            }
        } catch (error) {
            console.error('Error during login:', error); // Log error for debugging
            setMessage('Failed to connect to server');
        }
    };

    return (
        <div className="login-body">
            <div className="container">
                <div className="header">
                    <div className="text">{action}</div>
                    <div className="underline"></div>
                </div>

                <div className="inputs">
                    {action === 'Login' ? null : (
                        <div className="input">
                            <img src={user} alt="" />
                            <input type="text" placeholder="Full Name" />
                        </div>
                    )}

                    <div className="input">
                        <img src={email} alt="" />
                        <input
                            type="email"
                            placeholder="Email"
                            value={emailInput}
                            onChange={(e) => setEmailInput(e.target.value)}
                        />
                    </div>

                    <div className="input">
                        <img src={lock} alt="" />
                        <input
                            type="password"
                            placeholder="Password"
                            value={user_password}
                            onChange={(e) => setUserPassword(e.target.value)}
                        />
                    </div>
                </div>

                {action === 'Sign Up' ? null : (
                    <div className="forget_password">
                        Lost Password? <span>Click Here</span>
                    </div>
                )}

                <div className="submit-container">
                    <div
                        className={action === 'Login' ? 'submit gray' : 'submit'}
                        onClick={() => setAction('Sign Up')}
                    >
                        Sign Up
                    </div>
                    <div
                        className={action === 'Sign Up' ? 'submit gray' : 'submit'}
                        onClick={() => setAction('Login')}
                    >
                        Login
                    </div>
                </div>

                <div
                    className="submit_button"
                    onClick={action === 'Sign Up' ? requestOtp : login_user}
                >
                    Submit
                </div>
                {message && <p className="message">{message}</p>}
            </div>
        </div>
    );
};

export default Login_Signup;

