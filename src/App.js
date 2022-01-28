import React from 'react';
import './App.css';
import Header from './Components/Header'
import Sidebar from './Components/Sidebar';
import Login from './Components/Login';
import { Routes, Route } from "react-router-dom";
import EmailList from './Components/EmailList';
import Mail from './Components/Mail';
import ComposeMail from './Components/ComposeMail';
import { useSelector } from 'react-redux';
import { selectSendMessageDialogIsOpen } from './features/mailSlice'
import { selectUser } from './features/userSlice';

function App() {

  const composeMailDialogIsOpen = useSelector(selectSendMessageDialogIsOpen);
  const user = useSelector(selectUser);


  return (
    <div>
      {!user ? (
        <Login />
      ) : (
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
      )}
    </div>
  );
}

export default App;
