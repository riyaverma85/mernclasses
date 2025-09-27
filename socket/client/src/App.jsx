import { useEffect, useState } from 'react';
import { io } from "socket.io-client";


// Initialize socket connection
const socket = io("http://localhost:5000"); // Backend server URL  

const App = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setChat((prevChat) => [...prevChat, { text: data, sender: "other" }]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("send_message", message);
      setChat((prevChat) => [...prevChat, { text: message, sender: "user" }]);
      setMessage("");
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">Chat Application</div>
      
      <div className="chat-messages">
        {chat.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${msg.sender}`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={message}
          placeholder="Type a message..."
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default App;
