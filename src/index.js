import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import SignIn from './signin';
import Signup from './signup';
import Home from './home';
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDaED4NMYuyIi2SP5yLCl2q2Ub5EAZabLU",
  authDomain: "meme-a679b.firebaseapp.com",
  projectId: "meme-a679b",
  storageBucket: "meme-a679b.appspot.com",
  messagingSenderId: "482739488218",
  appId: "1:482739488218:web:1f08c3d57990e2c8392ce3"
};

initializeApp(firebaseConfig);

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, user => {
      if (user) {
        // User is signed in, navigate to the home page
        navigate('/home');
      } else {
        // User is signed out, navigate to the sign-in page
        navigate('/signin');
      }
    });
  }, [navigate]);

  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
