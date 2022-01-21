import React, { useEffect, useState } from 'react';
import './EmailList.css'
import { Checkbox, IconButton } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import RedoIcon from '@mui/icons-material/Redo';
import { ChevronLeft, ChevronRight, KeyboardHide, MoreVert, Settings, LocalOffer, LabelImportant } from '@mui/icons-material';
import Inbox from '@mui/icons-material/Inbox';
import PeopleIcon from '@mui/icons-material/People';
import Section from './Section';
import EmailRow from './EmailRow';
import { db } from './firebase';

function EmailList() {

    const [emailList, setemailList] = useState([]);


    useEffect(() => {

        db.collection("mails").orderBy("timestamp", "desc").onSnapshot((snapshot) => setemailList(snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
        }))))

    }, []);



    return (
        <div className='emailList'>
            <div className='emailList__settings'>
                <div className='emailList__settingsLeft'>

                    <Checkbox size='small' />
                    <IconButton>
                        <ArrowDropDownIcon fontSize="small" />
                    </IconButton>
                    <IconButton>
                        <RedoIcon fontSize="small" />
                    </IconButton>
                    <IconButton>
                        <MoreVert fontSize="small" />
                    </IconButton>
                </div>
                <div className='emailList__settingsRight'>
                    <IconButton>
                        <ChevronLeft fontSize="small" />
                    </IconButton>
                    <IconButton>
                        <ChevronRight fontSize="small" />
                    </IconButton>
                    <IconButton>
                        <KeyboardHide fontSize="small" />
                    </IconButton>
                    <IconButton>
                        <Settings fontSize="small" />
                    </IconButton>
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
