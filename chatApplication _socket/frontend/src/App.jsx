// import { useEffect, useState } from 'react';
// import { io } from 'socket.io-client';


// const socket = io("http://localhost:5000");

// const App = () => {
//   const [message, setMessage] = useState("");
//   const [chat, setChat] = useState([]);

//   const sendMessage = () => {
//     if (message.trim() === "") return;
//     socket.emit("send_message", { message });
//     setChat((prev) => [...prev, { message, self: true }]);
//     setMessage("");
//   };

//   useEffect(() => {
//     socket.on("receive_message", (data) => {
//       setChat((prev) => [...prev, { ...data, self: false }]);
//     });
//     return () => socket.off("receive_message");
//   }, []);

//   return (
//     <div className="app-container">
//       <h1>Cybrom Chat</h1>
//       <div className="chat-container">
//         <div className="chat-box">
//           {chat.map((msg, i) => (
//             <p key={i} className={msg.self ? "my-message" : "received-message"}>
//               {msg.message}
//             </p>
//           ))}
//         </div>
//         <div className="input-container">
//           <input
//             type="text"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             placeholder="Type a message..."
//           />
//           <button onClick={sendMessage}>Send</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';


const socket = io("http://localhost:5000");

const App = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = () => {
    if (message.trim() === "") return;
    socket.emit("send_message", { message });
    setChat((prev) => [...prev, { message, self: true }]);
    setMessage("");
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setChat((prev) => [...prev, { ...data, self: false }]);
    });
    return () => socket.off("receive_message");
  }, []);

  return (
    <div className="app-container">
      <h1>Cybrom Chat</h1>
      <div className="chat-container">
        <div className="chat-box">
          {chat.map((msg, i) => (
            <p key={i} className={msg.self ? "my-message" : "received-message"}>
              {msg.message}
            </p>
          ))}
        </div>
        <div className="input-container">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default App;
