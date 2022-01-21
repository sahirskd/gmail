import React from 'react'
import './Sidebar.css'
import { Button, IconButton } from '@mui/material'
import { Link } from "react-router-dom";
import ComposeIcon from './images/composeIcon.png'
import SidebarOption from './SidebarOption'
import InboxIcon from '@mui/icons-material/Inbox';
import SendIcon from '@mui/icons-material/Send';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import StarIcon from '@mui/icons-material/Star';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import PersonIcon from '@mui/icons-material/Person';
import DuoIcon from '@mui/icons-material/Duo';
import ChatIcon from '@mui/icons-material/Chat';
import { openSendMessageDialog } from '../features/mailSlice';
import { useDispatch } from 'react-redux';

function Sidebar() {

    const dispatch = useDispatch()

    return (
        <div className='sidebar'>
            <div className='compose__button_container'>
                <Button onClick={() => dispatch(openSendMessageDialog())} className='compose__button'> <img src={ComposeIcon} /> <span>Compose</span></Button>
            </div>
            <SidebarOption selected={true} title={"Inbox"} Icon={InboxIcon} number={5} />
            <SidebarOption selected={false} title={"Sent"} Icon={SendIcon} number={54} />
            <SidebarOption selected={false} title={"Snoozed"} Icon={WatchLaterIcon} number={4} />
            <SidebarOption selected={false} title={"Starred"} Icon={StarIcon} number={40} />
            <SidebarOption selected={false} title={"Important"} Icon={LabelImportantIcon} number={9} />
            <SidebarOption selected={false} title={"Draft"} Icon={InsertDriveFileIcon} number={56} />
            <SidebarOption selected={false} title={"More"} Icon={ExpandMoreIcon} number={""} />

            <div className='sidebar__footer'>
                <div className='sidebar__footerIcons'>
                    <IconButton>
                        <PersonIcon />
                    </IconButton>
                    <IconButton>
                        <DuoIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>

                </div>
            </div>
        </div>
    )
}

export default Sidebar
