import React, { useState } from 'react';

import user from '../assets/person.png'
import lock from '../assets/password.png'
import email from '../assets/email.png'

import './Login_Signup.css'

const Login_Signup = () => {

    const [action, setAction] = useState('Sign Up');
    return (
        <div className='container'>
            <div className='header'>
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div>
            
            <div className='inputs'>
                {action==='Login'?<div></div>:
                    <div className='input'>
                        <img src={user} alt="" />
                        <input type="text" placeholder='Full Name'/>
                    </div>
                }
                

                <div className='input'>
                    <img src={email} alt="" />
                    <input type="email" placeholder='Email'/>
                </div>

                <div className='input'>
                    <img src={lock} alt="" />
                    <input type="password" placeholder='Password'/>
                </div>
            </div>
            

            

            {action==='Sign Up'?<div></div>:
                    <div className="forget_password">Lost Password? <span>Click Here</span> </div>
                }
            <div className='submit-container'>
                <div className={action==='Login'?'submit gray':'submit'} onClick={()=>setAction('Sign Up')}>Sign Up</div>
                <div className={action==='Sign Up'?'submit gray':'submit' } onClick={()=>setAction('Login')}>Login</div>
            </div>
        </div>
    )
}

export default Login_Signup;