import { limit, orderBy, query, serverTimestamp, where, collection,addDoc } from "@firebase/firestore";
import { useRef, useState } from "react";
import useCollectionData from "../hooks/useCollectionData";
import {firestore, auth} from "./Configuration"
import ChatMessage from "./ChatMessage"


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

  export default ChatRoom