import React, { useRef, useState, useEffect } from 'react';
import * as firebase from "firebase/app";
import { getFirestore, addDoc, collection, query, orderBy, limit, queryEqual, onSnapshot, serverTimestamp, where } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
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
  console.log(user);

  return (
    <div className="App">
      <NavBar user={user} currentRoom={currentRoom} setCurrentRoom={setCurrentRoom}/>
      <header>
        <h1>Willkommen im Chat</h1>
        <SignOut />
      </header>

      <section>
        {user ? <ChatRoom currentRoom={currentRoom} /> : <SignIn />}
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

function useCollectionData(query) {
  const [data, setData] = useState([])
  const [queryState, setQueryState] = useState(query)
  useEffect(() => {
    if (!queryEqual(queryState, query)) {
      setQueryState(query)
    }
  }, [query])
  useEffect(() => {
    const unsubscribe = onSnapshot(queryState, snapshot => console.log(snapshot) || setData(snapshot.docs.map(doc => doc.data())))
    return () => { unsubscribe() }
  }, [queryState])
  return data
}


function ChatRoom({ currentRoom }) {
  const dummy = useRef();
  const messagesRef = collection(firestore, "messages");

  const q = query(messagesRef, where("room", "==", currentRoom), orderBy("createdAt"), limit(25));

  const messages = useCollectionData(q, { idField: 'id' });

  const [formValue, setFormValue] = useState('');


  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await addDoc(messagesRef, {
      text: formValue,
      createdAt: serverTimestamp(),
      uid,
      photoURL,
      room: currentRoom
    });

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

function Rooms ({ currentRoom, setShowListMenu, setCurrentRoom}) {
  const handleRoomChange = (room) => {
    setCurrentRoom(room);
    setShowListMenu(false);
  };
  return (
    <div className="rooms">
      <h2>Select room</h2>
      <ul>
        <li
          onClick={() => {
            handleRoomChange("Iphone Werkstatt");
          }}
          className={currentRoom === "Iphone Werkstatt" ? "active" : ""}
        >
          Iphone Werkstatt
        </li>
        <li
          onClick={() => {
            handleRoomChange("Android Werkstatt");
          }}
          className={currentRoom === "Android Werkstatt" ? "active" : ""}
        >
          Android Werkstatt
        </li>
        <li
          onClick={() => {
            handleRoomChange("General");
          }}
          className={currentRoom === "General" ? "active" : ""}
        >
          General
        </li>
        <li
          onClick={() => {
            handleRoomChange("Logistik");
          }}
          className={currentRoom === "ReactJs" ? "active" : ""}
        >
          Logistik
        </li>
      </ul>
    </div>
  );
}

function NavBar({ user, currentRoom, setCurrentRoom }) {
  const [showListMenu, setShowListMenu] = useState(false);
  return (
    <nav>
      <h1>
        {user ? (
          <>
            Current room: <strong>{currentRoom}</strong>
          </>
        ) : (
          <strong>Chat App</strong>
        )}
      </h1>
      {user ? (
        <>
          <button
            className="menu"
            onClick={() => {
              setShowListMenu(!showListMenu);
            }}
          >
            <img
              src="https://github.com/DwinaTech/public-images/blob/main/menu-bars.png?raw=true"
              alt="menu"
              style={{ opacity: showListMenu ? 0 : 1 }}
            />
            <img
              src="https://github.com/DwinaTech/public-images/blob/main/cross-menu-icon.png?raw=true"
              alt="menu-cross"
              style={{ opacity: showListMenu ? 1 : 0 }}
            />
          </button>
          <ul
            className="list-menu"
            style={{ top: showListMenu && user ? "10vh" : "-100vh" }}
          >
            <li>
              <SignOut setShowListMenu={setShowListMenu} />
            </li>
            <li>
              <Rooms
                currentRoom={currentRoom}
                setCurrentRoom={setCurrentRoom}
                setShowListMenu={setShowListMenu}
              />
            </li>
          </ul>
        </>
      ) : null}
    </nav>
  );

}


export default App;