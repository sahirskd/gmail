import { Star, StarBorderOutlined } from '@mui/icons-material';
import { Checkbox } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectMail } from '../features/mailSlice';
import './EmailRow.css'

function EmailRow({ mykey, checkAll, setcheckAll, time, description, subject, sender, senderMail, senderPhoto }) {

    const navigate = useNavigate();

    const [checkedBox, setcheckedBox] = useState(checkAll);

    const dispatch = useDispatch();

    const checkBoxChanged = (e) => {
        setcheckedBox(!checkedBox);
        e.stopPropagation();
    }

    useEffect(() => {
        setcheckedBox(checkAll)
    }, [checkAll]);


    const openMail = () => {
        dispatch(selectMail({
            mykey, time, description, subject, sender, senderMail, senderPhoto
        }))
        navigate("/Mail")
    }

    return (
        <div key={mykey} onClick={openMail} className='emailRow' >
            <div className='emailRow__options'>
                <Checkbox onClick={checkBoxChanged} checked={checkedBox} size="small" />

                <Checkbox onClick={(e) => e.stopPropagation()} icon={<StarBorderOutlined />} checkedIcon={<Star className="emailRow__checkedStar" />} size="small" />

            </div>

            <h3 className='emailRow__title'>{sender}</h3>

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
