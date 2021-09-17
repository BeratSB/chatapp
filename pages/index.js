import React, {useRef,useState,useEffect} from 'react';
import * as firebase from "firebase/app";
import {getFirestore,addDoc,collection,query, orderBy, limit, queryEqual, onSnapshot,serverTimestamp} from 'firebase/firestore';
import { getAuth, GoogleAuthProvider,signInWithPopup} from 'firebase/auth';
import { useAuthState, } from 'react-firebase-hooks/auth';


firebase.initializeApp({
  apiKey: "AIzaSyCpfple9ACshBeOimoddYWb3wrM9f53djg",
  authDomain: "chatapp-1efb5.firebaseapp.com",
  projectId: "chatapp-1efb5",
  storageBucket: "chatapp-1efb5.appspot.com",
  messagingSenderId: "255189445867",
  appId: "1:255189445867:web:88cee9af0c37fa9980a2ae"
})

const auth = getAuth();
const firestore = getFirestore();

function App() {
  const [currentRoom, setCurrentRoom] = useState("General");
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>
        <h1>Willkommen im Chat</h1>
        <SignOut />
      </header>

      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>

    </div>
  );
}

function SignIn() {

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  }

  return (
    <>
      <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
      <p>Do not violate the community guidelines or you will be banned for life!</p>
    </>
  )

}

function SignOut() {
  return auth.currentUser && (
    <button className="sign-out" onClick={() => auth.signOut()}>Ausloggen</button>
  )
}

function useCollectionData (query) {
  const [data,setData] = useState([])
  const [queryState, setQueryState] = useState(query)
  useEffect(()=>{
    if(!queryEqual(queryState, query)) {
      setQueryState(query)
    }
  },[query])
  useEffect(()=>{
    const unsubscribe = onSnapshot(queryState, snapshot => console.log(snapshot)||setData(snapshot.docs.map(doc=>doc.data())))
    return ()=>{unsubscribe()}
  },[queryState])
  return data
}


 function ChatRoom() {
   console.log(serverTimestamp)
  const dummy = useRef();
  const messagesRef = collection(firestore, "messages");

  const q = query(messagesRef, orderBy("createdAt"),limit(25));

  const messages = useCollectionData(q, { idField: 'id' });

  const [formValue, setFormValue] = useState('');


  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await addDoc(messagesRef, {
      text: formValue,
      createdAt: serverTimestamp(),
      uid,
      photoURL
    })

    setFormValue('')
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (<>
    <main>

      {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

      <span ref={dummy}></span>

    </main>

    <form onSubmit={sendMessage}>

      <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Sende eine Nachricht" />

      <button type="submit" disabled={!formValue}>Senden</button>

    </form>
  </>)
}


function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (<>
    <div className={`message ${messageClass}`}>
      <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} />
      <p>{text}</p>
    </div>
  </>)
}


export default App;