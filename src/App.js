import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io.connect("http://localhost:3001");

function App() {
  //room state
  const [room, setRoom] = useState("");
  //message state
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  const joinRoom = () => {
    if(room !== "") {
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
      placeholder="Room number..." 
      onChange={(event) => {
        setRoom(event.target.value);
      }}
      />
      <br />
      <button onClick={joinRoom}>Join Room</button>
      <br />
      <input
        placeholder="Message..."
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      />
      <br />
      <button onClick={sendMessage}>Send Message</button>
      <h2>Message: </h2>
      {messageReceived}
    </div>
  );
}

export default App;
