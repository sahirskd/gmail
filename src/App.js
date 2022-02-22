import React, { useEffect } from 'react';
import './App.css';
import Header from './Components/Header'
import Sidebar from './Components/Sidebar';
import Login from './Components/Login';
import { Routes, Route } from "react-router-dom";
import EmailList from './Components/EmailList';
import Mail from './Components/Mail';
import ComposeMail from './Components/ComposeMail';
import { useDispatch, useSelector } from 'react-redux';
import { selectcomposeDialogIsOpen } from './features/mailSlice'
import { selectUser, login } from './features/userSlice';
import { auth } from './Components/firebase';

function App() {

  const composeMailDialogIsOpen = useSelector(selectcomposeDialogIsOpen);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        dispatch(login({
          userName: user.displayName,
          userEmail: user.email,
          userPhoto: user.photoURL,
        }))
      }
    })
  }, []);



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
