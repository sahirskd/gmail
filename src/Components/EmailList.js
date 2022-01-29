import React, { useEffect, useState } from 'react';
import './EmailList.css'
import { Checkbox, IconButton, Tooltip } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import RedoIcon from '@mui/icons-material/Redo';
import { ChevronLeft, ChevronRight, KeyboardHide, MoreVert, Settings, LabelImportant } from '@mui/icons-material';
import Inbox from '@mui/icons-material/Inbox';
import PeopleIcon from '@mui/icons-material/People';
import Section from './Section';
import EmailRow from './EmailRow';
import { db } from './firebase';
import { useDispatch } from 'react-redux';
import { updateMailListCount } from '../features/mailSlice';

function EmailList() {

    const [emailList, setemailList] = useState([]);

    const dispatch = useDispatch();


    useEffect(() => {

        db.collection("mails").orderBy("timestamp", "desc").onSnapshot((snapshot) => setemailList(snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
        })
        )))

        // console.log(emailList.length);

    }, []);

    useEffect(() => {
        dispatch(updateMailListCount(emailList.length))
    }, [emailList, dispatch]);




    return (
        <div className='emailList'>
            <div className='emailList__settings'>
                <div className='emailList__settingsLeft'>
                    <Tooltip title="Select all">
                        <Checkbox size='small' />
                    </Tooltip>
                    <IconButton>
                        <ArrowDropDownIcon fontSize="small" />
                    </IconButton>
                    <Tooltip title="Undo">
                        <IconButton>
                            <RedoIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="More">
                        <IconButton>
                            <MoreVert fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </div>
                <div className='emailList__settingsRight'>
                    <Tooltip title="Previous">
                        <IconButton>
                            <ChevronLeft fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Next">
                        <IconButton>
                            <ChevronRight fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Hide Keyboard">
                        <IconButton>
                            <KeyboardHide fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Settings">
                        <IconButton>
                            <Settings fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </div>
            </div>
            <div className='emailList__sections'>
                <div className='emailList__sectionItems'>
                    <Section Icon={Inbox} title="Primary" color="#d93025" selected={true} />
                    <Section Icon={PeopleIcon} title="Social" color="#1a73e8" selected={false} />
                    <Section Icon={LabelImportant} title="Promotions" color="#188038" selected={false} />
                </div>
            </div>

            <div className='emailList__row'>
                <div className='emailrow__Items'>
                    {emailList.map(({ id, data: { message, recipients, subject, timestamp } }) => (
                        <EmailRow
                            mykey={id}
                            key={id}
                            title={recipients}
                            subject={subject}
                            description={message}
                            time={new Date(timestamp?.seconds * 1000).toUTCString()}
                        />
                    ))
                    }
                </div>
            </div>
        </div>
    )
}

export default EmailList
