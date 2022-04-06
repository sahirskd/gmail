import React, { useState } from 'react';
import { Close, Delete, Minimize, Maximize, RecordVoiceOverRounded, VoiceOverOffRounded } from '@mui/icons-material';
import { Button, Checkbox, IconButton, Tooltip } from '@mui/material';
import './ComposeMail.css'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { closeSendMessageDialog, minimizeComposeModal, maximizeComposeModal, selectComposeModalIsMin } from '../features/mailSlice';
import { selectUser } from '../features/userSlice';
import { serverTimestamp } from "firebase/firestore";
import { db } from './firebase';
import MicRecorder from 'mic-recorder-to-mp3';

function ComposeMail() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [micPermission, setmicPermission] = useState(false);
    const [micCheckbox, setmicCheckbox] = useState(false)

    // const recorder = new MicRecorder({ bitRate: 128 });
    const [recorder, setrecorder] = useState(new MicRecorder({ bitRate: 128 }))

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

    const startStopRecording = (e) => {
        console.log(e.target.checked)
        if (!micPermission) {
            return navigator.getUserMedia({ audio: true, video: false },
                () => {
                    console.log('Permission Granted');
                    setmicPermission(true)
                    setmicCheckbox(true)
                    handleRecording(true)
                },
                () => {
                    console.log('Permission Denied');
                    setmicPermission(false)
                    setmicCheckbox(false)
                },
            );
        }
        setmicCheckbox(!micCheckbox)

        if (e.target.checked) {
            handleRecording(true)
        } else {
            handleRecording(false)
        }

        // recorder.start().then(() => {
        //     // something else
        // }).catch((e) => {
        //     console.error(e);
        // });

    }
    const recordingAPI = async (url = '', data = {}) => {
        // Default options are marked with *
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            // credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects
    }



    const handleRecording = (startRec) => {
        if (startRec) {
            recorder.start().then(() => {
                // console.log("started recording")
                // something else
            }).catch((e) => {
                console.error(e);
            });
        } else {
            recorder.stop().getMp3().then(([buffer, blob]) => {
                // do what ever you want with buffer and blob
                // Example: Create a mp3 file and play
                const file = new File(buffer, 'song.mp3', {
                    type: blob.type,
                    lastModified: Date.now()
                });


                recordingAPI('http://localhost:3300/api/deepgram', { file: file })
                    .then(data => {
                        console.log(data); // JSON data parsed by `data.json()` call
                    });

                console.log(blob)
                console.log(file)
                console.log(URL.createObjectURL(file))
                // const player = new Audio(URL.createObjectURL(file));
                // player.play();


            }).catch((e) => {
                alert('We could not retrieve your message');
                console.log(e);
            });

        }
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
                    <div className='composeMail__footerRight'>
                        <Tooltip title="Click for voice to text">
                            <Checkbox icon={<VoiceOverOffRounded />} onChange={startStopRecording} checkedIcon={<RecordVoiceOverRounded />} checked={micCheckbox} size="small" />
                        </Tooltip>
                        <IconButton onClick={() => dispatch(closeSendMessageDialog())}>
                            <Delete className='composeMail__deleteIcon' />
                        </IconButton>
                    </div>
                </div>
            </form>


        </div>
    );
}

export default ComposeMail;
