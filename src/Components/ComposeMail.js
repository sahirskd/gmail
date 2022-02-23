import React, { useState } from 'react';
import { Close, Delete, Minimize, Maximize } from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';
import './ComposeMail.css'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { closeSendMessageDialog, minimizeComposeModal, maximizeComposeModal, selectComposeModalIsMin } from '../features/mailSlice';
import { selectUser } from '../features/userSlice';
import { serverTimestamp } from "firebase/firestore";
import { db } from './firebase'

function ComposeMail() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const dispatch = useDispatch();

    const [mailSub, setMailSub] = useState("")

    const user = useSelector(selectUser);

    const dialogIsMinimized = useSelector(selectComposeModalIsMin);


    const composeSubmit = async (data) => {
        // console.log(data);

        const formData = {
            recipients: data.Recipients,
            sender: user.userName,
            senderPhoto: user.userPhoto,
            senderMail: user.userEmail,
            subject: data.Subject,
            message: data.Message,
            starred: false,
            timestamp: serverTimestamp()
        }

        db.collection('mails').add(formData)
            .then(() => {
                // console.log("Document successfully written!");
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
                alert("Error writing document: ", error)
            });

        // db.collection('mails').onSnapshot(snapshot => {
        //     console.log("fire data", snapshot.docs.map(doc => doc.data()))
        // })


        dispatch(closeSendMessageDialog());
    }

    return (
        <div className={`compseMail ${dialogIsMinimized ? "composeMail--minimize" : "composeMail--maximize"}`}>
            <div className='composeMail__header'>
                <h3>{mailSub ? mailSub : "New Message"}</h3>
                <div className='composeMail__headIcon'>
                    {dialogIsMinimized ? (
                        <Maximize onClick={() => dispatch(maximizeComposeModal())} className='composeMail__headCloseBtn' fontSize="small" />
                    ) : (
                        <Minimize onClick={() => dispatch(minimizeComposeModal())} className='composeMail__headCloseBtn' fontSize="small" />
                    )}
                    <Close className='composeMail__headCloseBtn' onClick={() => dispatch(closeSendMessageDialog())} fontSize="small" />
                </div>
            </div>
            <form onSubmit={handleSubmit(composeSubmit)}>
                <input type="email" placeholder='Recipients' {...register("Recipients", { required: "Recipient is required" })} />
                {errors.Recipients && <p className='composeMail__errorMessage'>{errors.Recipients.message}</p>}

                <input onKeyUp={(e) => setMailSub(e.target.value)} name='Subject' type="text" placeholder='Subject' {...register("Subject", { required: "Subject is required" })} />
                {errors.Subject && <p className='composeMail__errorMessage'>{errors.Subject.message}</p>}

                <textarea name='Message' type="text" placeholder='Message...' className='composeMail__message' {...register("Message", { required: "Message is required" })} />
                {errors.Message && <p className='composeMail__errorMessage'>{errors.Message.message}</p>}

                <div className='composeMail__footer'>
                    <Button className='composeMail__footerSend' type="submit" variant="contained">Send</Button>
                    <IconButton onClick={() => dispatch(closeSendMessageDialog())}>
                        <Delete className='composeMail__deleteIcon' />
                    </IconButton>
                </div>
            </form>


        </div>
    );
}

export default ComposeMail;
