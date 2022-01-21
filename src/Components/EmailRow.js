import { LabelImportantOutlined, StarBorderOutlined } from '@mui/icons-material';
import { Checkbox, IconButton } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectMail } from '../features/mailSlice';
import './EmailRow.css'

function EmailRow({ mykey, time, description, subject, title, }) {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const openMail = () => {
        dispatch(selectMail({
            mykey, time, description, subject, title
        }))
        navigate("/Mail")
    }

    return (
        <div key={mykey} onClick={openMail} className='emailRow' >
            <div className='emailRow__options'>
                <Checkbox size="small" />
                <IconButton>
                    <StarBorderOutlined fontSize="small" />
                </IconButton>
                <IconButton>
                    <LabelImportantOutlined fontSize="small" />
                </IconButton>
            </div>

            <h3 className='emailRow__title'>{title}</h3>

            <div className='emailRow__message'>
                <h4>
                    {subject}
                    <span className='emailRow__description'>
                        &nbsp;-&nbsp;{description}
                    </span>
                </h4>
            </div>
            <p className='emailRow__time'>
                {time}
            </p>
        </div>
    )
}

export default EmailRow
