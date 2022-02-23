import React, { useEffect, useRef, useState } from "react";
import "./Mail.css";
import { Avatar, Checkbox, IconButton, Tooltip } from "@mui/material";
import {
    ArrowBack,
    CheckCircle,
    Delete,
    Email,
    Error,
    LabelImportant,
    MoreVert,
    MoveToInbox,
    Print,
    Star,
    StarBorderOutlined,
    UnfoldMore,
    WatchLater,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { openSelectedMail, selectMail, updateSelectedMail } from "../features/mailSlice";
import { useSelector, useDispatch } from "react-redux";
import { db } from "./firebase";

function Mail() {
    const [starredIcon, setStarredIcon] = useState(false);

    const navigate = useNavigate();
    const isMountedRef = useRef(null);

    const dispatch = useDispatch();

    const printMail = () => {
        window.print();
    }
    const mailData = useSelector(openSelectedMail);

    const deleteMail = async () => {

        await db.collection("mails").doc(mailData.mykey).delete().then(() => {
            if (isMountedRef.current) {
                dispatch(updateSelectedMail());
            }
            console.log("Message deleted!");
        }).catch((error) => {
            console.error("Error removing message: ", error);
        });
    }

    const hadlestarClick = (e) => {
        e.stopPropagation()
        var starId = e.target.id;
        var isStarred = e.target.checked;
        // console.log(e)
        setStarredIcon(isStarred)
        dispatch(selectMail({
            mykey: mailData?.mykey,
            time: mailData?.mykey,
            description: mailData?.description,
            subject: mailData?.subject,
            sender: mailData?.sender,
            senderMail: mailData?.senderMail,
            senderPhoto: mailData?.senderPhoto,
            starred: isStarred
        }))
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

    useEffect(() => {
        isMountedRef.current = true;
        if (!mailData) {
            navigate("/")
        }

        return () => {
            isMountedRef.current = false;
        };
    }, [mailData, navigate]);




    return (
        <div className="mail">
            <div className="mail__tools">
                <div className="mail__toolsLeft">
                    <Tooltip title="Back">
                        <IconButton onClick={() => navigate("/")}>
                            <ArrowBack fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Archive">
                        <IconButton>
                            <MoveToInbox fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Spam">
                        <IconButton>
                            <Error fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <IconButton onClick={deleteMail} >
                            <Delete fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Email">
                        <IconButton>
                            <Email fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Watch later">
                        <IconButton>
                            <WatchLater fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={starredIcon ? "Starred" : "Unstarred"}>
                        <Checkbox checked={mailData?.starred ? true : false} onClick={hadlestarClick} id={mailData?.mykey} icon={<StarBorderOutlined />} checkedIcon={<Star className="emailRow__checkedStar" />} size="small" />
                    </Tooltip>
                    <Tooltip title="Add to tasks">
                        <IconButton>
                            <CheckCircle fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="More">
                        <IconButton>
                            <MoreVert fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </div>

                <div className="mail__toolsRight">
                    <Tooltip title="Expand">
                        <IconButton>
                            <UnfoldMore fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Print">
                        <IconButton onClick={printMail}>
                            <Print fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </div>
            </div>

            <div className="mail__body">
                <div className="mail__bodyHeader">
                    <div className="mail__headerRight">
                        <h2>{mailData?.subject}</h2>

                    </div>
                </div>

                <div className="mail__senderDetails">
                    <div className="mail__iconTitle">
                        <Avatar src={mailData?.senderPhoto} />
                        <p className="mail__senderName">{mailData?.sender}</p>
                        <LabelImportant fontSize="small" className="bodyHeader__icon" />
                        <p>&lt;{mailData?.senderMail}&gt;</p>

                    </div>
                    <p>{mailData?.time}</p>
                </div>

                <div className="mail__message">
                    <p>{mailData?.description}</p>
                </div>

            </div>

        </div>
    );
}

export default Mail;
