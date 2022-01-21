import { createSlice } from '@reduxjs/toolkit';


export const mailSlice = createSlice({
    name: 'mail',
    initialState: {
        sendMessageDialogIsOpen: false,
        selectedMail: null,
        mailListCount: 0,
    },

    reducers: {

        selectMail: (state, action) => {
            state.selectedMail = action.payload;
        },

        updateMailListCount: (state, action) => {
            state.mailListCount = action.payload;
        },

        openSendMessageDialog: state => {
            state.sendMessageDialogIsOpen = true;
        },

        closeSendMessageDialog: state => {
            state.sendMessageDialogIsOpen = false;
        },

    },
})


export const { selectMail, updateMailListCount, openSendMessageDialog, closeSendMessageDialog } = mailSlice.actions;

export const selectSendMessageDialogIsOpen = (state) => state.mail.sendMessageDialogIsOpen;

export const openSelectedMail = (state) => state.mail.selectedMail;

export const selectMailListCount = (state) => state.mail.mailListCount;

export default mailSlice.reducer;