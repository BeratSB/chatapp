import '../styles/globals.css'
import React, { useRef, useState, useEffect } from 'react';
import * as firebase from "firebase/app";
import { getFirestore, addDoc, collection, query, orderBy, limit, queryEqual, onSnapshot, serverTimestamp, where } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useAuthState, } from 'react-firebase-hooks/auth';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
