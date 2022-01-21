import React from "react";
import "./Mail.css";
import { IconButton, Tooltip } from "@mui/material";
import {
    AccountCircle,
    ArrowBack,
    CheckCircle,
    Delete,
    Email,
    Error,
    Label,
    LabelImportant,
    LocalOffer,
    MoreVert,
    MoveToInbox,
    Print,
    UnfoldMore,
    WatchLater,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { openSelectedMail } from "../features/mailSlice";
import { useSelector } from "react-redux";

function Mail() {
    const navigate = useNavigate();


    const mailData = useSelector(openSelectedMail)

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
                        <IconButton>
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
                    <Tooltip title="Labels">
                        <IconButton>
                            <Label fontSize="small" />
                        </IconButton>
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
                        <IconButton>
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
                        <AccountCircle fontSize="large" />
                        <LabelImportant fontSize="small" className="bodyHeader__icon" />
                        <p>{mailData?.title}</p>

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
