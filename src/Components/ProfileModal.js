import React from 'react';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import Divider from '@mui/material/Divider';
import './ProfileModal.css'
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from '../features/userSlice';
import { Button } from '@mui/material';
import { auth } from './firebase';


function ProfileModal({ closeUserModal, anchorEl, open }) {

    const user = useSelector(selectUser);

    const dispatch = useDispatch();

    const logoutUser = () => {
        auth.signOut()
            .then(() => {
                console.log("logged out");
            })

        dispatch(logout());
    }

    return (
        <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={closeUserModal}
            // onClick={closeUserModal}
            PaperProps={{
                elevation: 0,
                sx: {
                    background: '#fff',
                    border: '1px solid #ccc',
                    borderColor: 'rgba(0,0,0,.2)',
                    width: '354px',
                    overflow: 'visible',
                    borderRadius: '8px',
                    boxShadow: '0 2px 10px rgb(0 0 0 / 20%)',
                    mt: .5,
                    '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: .5,
                    }
                },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            <div className='userPopup__userDetails'>
                <Avatar className="userPopup__userAvatar" src={user.userPhoto} fontSize="large" />
                {console.log(user.userPhoto)}
                <p className='userPopup__name'>{user.userName}</p>
                <p className='userPopup__email'>{user.userEmail}</p>
            </div>

            <Divider />

            <Button onClick={logoutUser} className='userPopup__logout'>Sign out from Gmail</Button>


        </Menu>
    );
}

export default ProfileModal;
