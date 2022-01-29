import React from 'react';
import { Close, Delete, Minimize } from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';
import './ComposeMail.css'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { closeSendMessageDialog } from '../features/mailSlice';
import { serverTimestamp } from "firebase/firestore";
import { db } from './firebase'

function ComposeMail() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const dispatch = useDispatch();


    const composeSubmit = async (data) => {
        // console.log(data);

        const formData = {
            recipients: data.Recipients,
            subject: data.Subject,
            message: data.Message,
            timestamp: serverTimestamp()
        }

        db.collection('mails').add(formData);

        // db.collection('mails').onSnapshot(snapshot => {
        //     console.log("fire data", snapshot.docs.map(doc => doc.data()))
        // })


        dispatch(closeSendMessageDialog());
    }

    return (
        <div className='compseMail'>
            <div className='composeMail__header'>
                <h3>New Message</h3>
                <div className='composeMail__headIcon'>
                    <Minimize className='composeMail__headCloseBtn' fontSize="small" />
                    <Close className='composeMail__headCloseBtn' onClick={() => dispatch(closeSendMessageDialog())} fontSize="small" />
                </div>
            </div>
            <form onSubmit={handleSubmit(composeSubmit)}>
                <input type="email" placeholder='Recipients' {...register("Recipients", { required: "Recipient is required" })} />
                {errors.Recipients && <p className='composeMail__errorMessage'>{errors.Recipients.message}</p>}
                <input name='Subject' type="text" placeholder='Subject' {...register("Subject", { required: "Subject is required" })} />
                {errors.Subject && <p className='composeMail__errorMessage'>{errors.Subject.message}</p>}

                <textarea name='Message' type="text" placeholder='Message...' className='composeMail__message' {...register("Message", { required: "Message is required" })} />
                {errors.Message && <p className='composeMail__errorMessage'>{errors.Message.message}</p>}

                <div className='composeMail__footer'>
                    <Button className='composeMail__footerSend' type="submit" variant="contained">Send</Button>
                    <IconButton >
                        <Delete className='composeMail__deleteIcon' />
                    </IconButton>
                </div>
            </form>


        </div>
    );
}

export default ComposeMail;
