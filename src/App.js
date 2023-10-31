import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import Chat from "./Chat";

const socket = io.connect("http://192.168.1.106:3000");

function App() {
  //user state
  const [username, setUsername] = useState("");
  //room state
  const [room, setRoom] = useState("");
  //message state
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");
 
  const joinRoom = () => {
    if ( username !== "" && room !== "" ) {
       socket.emit("join_room", room);
    }
  }

  const sendMessage = () => {
    socket.emit("send_message", { message, room });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
    });
  }, [socket]);

  return (
    <div className="container">
      <input 
      type="text"
      placeholder="Room number..." 
      onChange={(event) => {
        setRoom(event.target.value);
      }}
      />
      <br />
      <input
        type="text"
        placeholder="Enter your name..."
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <br />
      <button onClick={joinRoom}>Join Room</button>
      <Chat socket={socket} username={username} room={room}/>
    </div>
  );
}

export default App;
