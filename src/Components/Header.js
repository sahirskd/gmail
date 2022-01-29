import React from 'react';
import './Header.css';
import MenuIcon from '@mui/icons-material/Menu';
import { Avatar, IconButton, Tooltip } from '@mui/material';
import GmailLogo from './images/gmailLogo.png'
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AppsIcon from '@mui/icons-material/Apps';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HelpIcon from '@mui/icons-material/Help';
import { selectUser } from '../features/userSlice';
import { useSelector } from 'react-redux';


function Header() {

    const user = useSelector(selectUser);

    return (
        <div className="header">
            <div className='header__left'>
                <IconButton>
                    <MenuIcon />
                </IconButton>
                <img src={GmailLogo} />
            </div>
            <div className='header__middle'>
                <SearchIcon />
                <input placeholder='Search mail' type='text' />
                <ArrowDropDownIcon className='hader__inputCaret' />
            </div>
            <div className='header__right'>
                <Tooltip title="More apps">
                    <IconButton>
                        <AppsIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Notifications">
                    <IconButton>
                        <NotificationsIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Help">
                    <IconButton>
                        <HelpIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title={user.userName}>
                    <IconButton >
                        <Avatar src={user.userPhoto} />
                    </IconButton>
                </Tooltip>
            </div>
        </div>
    )
}

export default Header
