import * as firebase from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';


firebase.initializeApp({
    apiKey: "AIzaSyCpfple9ACshBeOimoddYWb3wrM9f53djg",
    authDomain: "chatapp-1efb5.firebaseapp.com",
    projectId: "chatapp-1efb5",
    storageBucket: "chatapp-1efb5.appspot.com",
    messagingSenderId: "255189445867",
    appId: "1:255189445867:web:88cee9af0c37fa9980a2ae"
})

export const auth = getAuth();
export const firestore = getFirestore();