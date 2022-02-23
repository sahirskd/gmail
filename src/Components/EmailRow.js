import { Star, StarBorderOutlined } from '@mui/icons-material';
import { Checkbox, Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectMail } from '../features/mailSlice';
import { db } from './firebase'
import './EmailRow.css'

function EmailRow({ mykey, checkAll, setcheckAll, time, description, subject, sender, senderMail, senderPhoto, starred }) {

    const navigate = useNavigate();

    const [checkedBox, setcheckedBox] = useState(checkAll);

    const [starredIcon, setStarredIcon] = useState(false);

    const dispatch = useDispatch();

    const hadlestarClick = (e) => {
        e.stopPropagation()
        var starId = e.target.id;
        var isStarred = e.target.checked;
        setStarredIcon(isStarred)
        // console.log(e)
        db.collection("mails").doc(starId).set({
            starred: isStarred
        }, { merge: true })
            .then(() => {
                // console.log("Starred successfully!");
            })
            .catch((error) => {
                console.error("Error staring: ", error);
            });
    }

    const checkBoxChanged = (e) => {
        setcheckedBox(!checkedBox);
        e.stopPropagation();

    }

    useEffect(() => {
        setcheckedBox(checkAll)
    }, [checkAll]);


    const openMail = () => {
        dispatch(selectMail({
            mykey, time, description, subject, sender, senderMail, senderPhoto, starred
        }))
        navigate("/Mail")
    }

    return (
        <div key={mykey} onClick={openMail} className='emailRow' >
            <div className='emailRow__options'>
                <Tooltip title={checkedBox ? "Selected" : "Not selected"}>
                    <Checkbox onClick={checkBoxChanged} checked={checkedBox} size="small" />
                </Tooltip>

                <Tooltip title={starredIcon ? "Starred" : "Not Starred"}>
                    <Checkbox checked={starred ? true : false} id={mykey} onClick={hadlestarClick} icon={<StarBorderOutlined />} checkedIcon={<Star className="emailRow__checkedStar" />} size="small" />
                </Tooltip>


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
