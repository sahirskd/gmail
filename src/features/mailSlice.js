import { createSlice } from '@reduxjs/toolkit';


export const mailSlice = createSlice({
    name: 'mail',
    initialState: {
        sendMessageDialogIsOpen: false,
        selectedMail: null
    },

    reducers: {

        selectMail: (state, action) => {
            state.selectedMail = action.payload;
        },

        openSendMessageDialog: state => {
            state.sendMessageDialogIsOpen = true;
        },

        closeSendMessageDialog: state => {
            state.sendMessageDialogIsOpen = false;
        },

    },
})


export const { selectMail, openSendMessageDialog, closeSendMessageDialog } = mailSlice.actions;

export const selectSendMessageDialogIsOpen = (state) => state.mail.sendMessageDialogIsOpen;

export const openSelectedMail = (state) => state.mail.selectedMail;

export default mailSlice.reducer;