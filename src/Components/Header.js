import React from 'react';
import './Header.css';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';
import GmailLogo from './images/gmailLogo.png'
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AppsIcon from '@mui/icons-material/Apps';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HelpIcon from '@mui/icons-material/Help';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


function Header() {
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
                <IconButton>
                    <AppsIcon />
                </IconButton>
                <IconButton>
                    <NotificationsIcon />
                </IconButton>
                <IconButton>
                    <HelpIcon />
                </IconButton>
                <IconButton >
                    <AccountCircleIcon fontSize="large" />
                </IconButton>
            </div>
        </div>
    )
}

export default Header
