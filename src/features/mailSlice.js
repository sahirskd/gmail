import { createSlice } from '@reduxjs/toolkit';


export const mailSlice = createSlice({
    name: 'mail',
    initialState: {
        composeDialogIsOpen: false,
        composeModalIsMin: true,
        selectedMail: null,
        mailListCount: 0,
        isSideBarExpand: true,
    },

    reducers: {

        selectMail: (state, action) => {
            state.selectedMail = action.payload;
        },

        updateSelectedMail: (state) => {
            state.selectedMail = null;
        },

        updateMailListCount: (state, action) => {
            state.mailListCount = action.payload;
        },

        openSendMessageDialog: state => {
            state.composeDialogIsOpen = true;
            state.composeModalIsMin = false;
        },

        closeSendMessageDialog: state => {
            state.composeDialogIsOpen = false;
        },

        minimizeComposeModal: state => {
            state.composeModalIsMin = true;
        },

        maximizeComposeModal: state => {
            state.composeModalIsMin = false;
        },

        toggleSideBar: state => {
            state.isSideBarExpand = !state.isSideBarExpand;
        },
    },
})


export const { selectMail, updateSelectedMail, updateMailListCount, openSendMessageDialog, closeSendMessageDialog, minimizeComposeModal, maximizeComposeModal, toggleSideBar } = mailSlice.actions;

export const selectcomposeDialogIsOpen = (state) => state.mail.composeDialogIsOpen;

export const selectComposeModalIsMin = (state) => state.mail.composeModalIsMin;

export const openSelectedMail = (state) => state.mail.selectedMail;

export const selectMailListCount = (state) => state.mail.mailListCount;

export const selectIsExpandSideBar = (state) => state.mail.isSideBarExpand;

export default mailSlice.reducer;