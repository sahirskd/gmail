import { Google } from '@mui/icons-material';
import { Button } from '@mui/material';
import React from 'react';
import './Login.css'
import googleicon from './images/googleicon.png'
import { auth, provider } from './firebase'
import { useDispatch } from 'react-redux';
import { login } from '../features/userSlice';


function Login() {

    const dispatch = useDispatch();

    const signIn = () => {
        auth.signInWithPopup(provider)
            .then(({ user }) => {
                // console.log(user);
                dispatch(login({
                    userName: user.displayName,
                    userEmail: user.email,
                    userPhoto: user.photoURL,
                }))
            })
    }
    return (
        <div className='login'>
            <div className='login__container'>
                <img src={googleicon} />
                <Button variant="contained" onClick={signIn} className='login__button'><Google className='login__icon' /> Sign in with Google</Button>
            </div>
        </div>
    );
}

export default Login;
