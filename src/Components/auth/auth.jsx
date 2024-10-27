import React, { useState } from 'react';
import './auth.css'
const Auth = () => {
    
    return (
        <div className='main-body'>
            <div className='container'>
                <div className='header'>
                    <div className="text">OTP</div>
                    <div className="underline"></div>
                </div>

                <div className='inputs'>
                    <div className='input'>
                        <input type="email" placeholder='Enter OTP'/>
                    </div>
                </div>
                <div className="otp">OTP has been sent to registered email which is valid for only <br />5 minutes. <span>Send Again</span> </div>
                
            </div>
        </div>
    );}

export default Auth;