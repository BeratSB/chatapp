import { auth } from "../src/components/Configuration";
import { useState, useEffect, useRef } from "react";
import SignIn from "../src/components/SignIn";
import NavBar from "../src/components/NavBar";
import ChatRoom from "../src/components/ChatRoom";


import { useAuthState } from "react-firebase-hooks/auth";

function App (){
  const [user] = useAuthState(auth);
  const [currentRoom, setCurrentRoom] = useState("General");
  console.log(user)



  return (
    <div className="app">
      <NavBar
        user={user}
        currentRoom={currentRoom}
        setCurrentRoom={setCurrentRoom}
      />
      <div className="content">
        {user ? <ChatRoom currentRoom={currentRoom} /> : <SignIn />}
      </div>
    </div>
  );
};

export default App;