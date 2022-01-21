import React from 'react';
import './App.css';
import Header from './Components/Header'
import Sidebar from './Components/Sidebar';
import { Routes, Route } from "react-router-dom";
import EmailList from './Components/EmailList';
import Mail from './Components/Mail';
import ComposeMail from './Components/ComposeMail';
import { useSelector } from 'react-redux';
import { selectSendMessageDialogIsOpen } from './features/mailSlice'


function App() {

  const composeMailDialogIsOpen = useSelector(selectSendMessageDialogIsOpen)


  return (
    <div className="app">
      <Header />
      <div className='app__body'>
        <Sidebar />
        <div className='rightSideBar'>
          <Routes>
            <Route path="/" element={<EmailList />} />
            <Route path="/Mail" element={<Mail />} />
          </Routes>

        </div>
      </div>

      {composeMailDialogIsOpen && <ComposeMail />}
    </div>
  );
}

export default App;
