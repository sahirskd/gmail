import React, { useState } from 'react';
import { Close, Delete, Minimize, Maximize, RecordVoiceOverRounded, VoiceOverOffRounded } from '@mui/icons-material';
import { Button, Checkbox, IconButton, Tooltip } from '@mui/material';
import './ComposeMail.css'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { closeSendMessageDialog, minimizeComposeModal, maximizeComposeModal, selectComposeModalIsMin } from '../features/mailSlice';
import { selectUser } from '../features/userSlice';
import { serverTimestamp } from "firebase/firestore";
import { db, storageRef } from './firebase';
import MicRecorder from 'mic-recorder-to-mp3';
import firebase from 'firebase/compat/app';

function ComposeMail() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [micPermission, setmicPermission] = useState(false);
    const [micCheckbox, setmicCheckbox] = useState(false)

    // const recorder = new MicRecorder({ bitRate: 128 });
    const [recorder, setrecorder] = useState(new MicRecorder({ bitRate: 128 }))

    const dispatch = useDispatch();

    const [mailSub, setMailSub] = useState("")

    const [mailMessage, setmailMessage] = useState("")

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
            message: mailMessage,
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
        // console.log(e.target.checked)
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
    }
    const recordingAPI = async (url, audioURL) => {
        // console.log(audioURL)
        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url: audioURL })
        });
        return response.json();
    }

    const handleRecording = (startRec) => {
        if (startRec) {
            recorder.start().then(() => {
                // console.log("started recording")
            }).catch((e) => {
                console.error(e);
            });
        } else {
            recorder.stop().getMp3().then(([buffer, blob]) => {

                const file = new File(buffer, `voice-${(new Date()).getTime()}.mp3`, {
                    type: blob.type,
                    lastModified: Date.now()
                });
                // console.log(file)
                // console.log(URL.createObjectURL(file))

                var metadata = {
                    contentType: 'audio/mp3'
                };

                var uploadTask = storageRef.child('audio/' + file.name).put(file, metadata);

                uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
                    (snapshot) => {
                        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        // console.log('Upload is ' + progress + '% done');
                    },
                    (error) => {
                        switch (error.code) {
                            case 'storage/unauthorized':
                                alert("You don't have permission")
                                break;
                            case 'storage/canceled':
                                alert("You cancelld the voice")
                                break;
                            case 'storage/unknown':
                                break;
                        }
                    },
                    () => {
                        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                            // console.log('File available at', downloadURL);
                            console.log(downloadURL)
                            recordingAPI('https://floating-crag-70091.herokuapp.com/api/deepgram', downloadURL)
                                .then(data => {
                                    // console.log(data.transcript); // data already parsed by `data.json()`
                                    setmailMessage(mailMessage + " " + data.transcript);
                                    storageRef.child('audio/' + file.name).delete().then(() => {
                                        // File deleted successfully
                                        // console.log("audio deleted from server");
                                    }).catch((error) => {
                                        // Uh-oh, an error occurred!
                                        console.log(error)
                                    });
                                });
                        });
                    }
                );

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
                <input type="email" placeholder='Recipients' {...register("Recipients", { required: "Recipient is required!" })} />
                {errors.Recipients && <p className='composeMail__errorMessage'>{errors.Recipients.message}</p>}

                <input onKeyUp={(e) => setMailSub(e.target.value)} name='Subject' type="text" placeholder='Subject' {...register("Subject", { required: "Subject is required!" })} />
                {errors.Subject && <p className='composeMail__errorMessage'>{errors.Subject.message}</p>}

                <textarea value={mailMessage} onChange={(e) => setmailMessage(e.target.value)} name='Message' type="text" placeholder='Message...' className='composeMail__message' />
                {/* {!mailMessage && <p className='composeMail__errorMessage'>Message is required!</p>} */}


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
