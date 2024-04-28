import { useState, useEffect } from 'react';
import "./Chat.css"
import {io} from "socket.io-client"
import axios from 'axios';

function Chat() {
    const [userList, setUserList] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputValue,setInputValue]=useState("")
  const [loading, setLoading] = useState(false);
  const userData = JSON.parse(localStorage.getItem("userInfo"));
  let senderId;
  let receivedId;
  let token;
  let role
  if (userData?.data?.userId) {
    senderId = userData.data.userId;
    receivedId = selectedUserId;
    token=userData.data.token
    role="user"
  } else {
    senderId = userData.data.companyId;
    receivedId = selectedUserId;
    token=userData.data.token
    role="company"

  }
  // Replace with your logic to fetch user list
  let  socketIo = io("https://api.codesplus.online");
  useEffect(() => {
    const fetchUserList = async () => {
      const response = await fetch('https://api.codesplus.online/api/v1/account/user_or_company_list',
    {
        headers:{"Authorization":`internHub__${token}`}
    }); // Replace with your API endpoint
      const data = await response.json();
      setUserList(data.data);
    };

    fetchUserList();
    socketIo.on("message", (receivedMessage) => {
        if (receivedMessage.senderId === selectedUserId || receivedMessage.receivedId === selectedUserId) {
          setMessages([...messages, receivedMessage]);
        }
      });
  
      return () => {
        // Cleanup function to disconnect from socket on component unmount
        socketIo.disconnect();
      };
  }, [selectedUserId,messages]);
  const handleUserSelection = (userId) => {
    setSelectedUserId(userId);
    setMessages([]); // Assuming empty messages initially
  };

  useEffect(() => {
    if (selectedUserId) {
      setLoading(true);
      axios({
        method: "post",
        url: "https://api.codesplus.online/api/v1/account/user_or_company_chat",
        headers: {
          "Content-Type": "application/json",
          Authorization: `internHub__${token}`
        },
        data: {
          receivedId: selectedUserId,
          role
        }
      }).then((res) => {
        setMessages(res.data.data[0].messages);
        setLoading(false);
      }).catch((err) => {
        console.log(err);
        setLoading(false);
      });
    }
  }, [selectedUserId, role, token]);

  const sendMessage = (message) => {
    socketIo.emit("SEND_MESSAGE", {
        message: message,
        senderId,
        receivedId,
      });
    // Implement logic to send the message to the server
    // Update message state locally for UI rendering
    setMessages([...messages, { content: message, senderId: senderId }]);
    setInputValue("")
  };

  const handleInput=(e)=>{
    setInputValue(e.target.value)
  }

  return (
    <div className="App">
      <div className="user-list">
        <h2>{role==="user"?"Companies":"Users"}</h2>
        {userList.map((user) => (
          <div
            key={user.companyId||user.userId}
            className={`user ${selectedUserId === user.companyId||selectedUserId===user.userId ? 'active' : ''}`}
            onClick={() => handleUserSelection(role=="user"?user.companyId:user.userId)}
          >
            {user.companyName||user.userName}
          </div>
        ))}
      </div>
      <div className="chat-window">
        {selectedUserId && (
          <>
            <h2>Chat with: {userList.find((u) => u.companyId === selectedUserId)?.companyName||userList.find((u)=>u.userId===selectedUserId)?.userName}</h2>
            {loading ? (
              <p>Loading messages...</p> // Display loading indicator while fetching messages
            ) : (
              <>
            <div className="chat-messages">
                    {messages.map((message) => (
                        <div
                        key={message.content || message.messageId}
                        className={`chat-message ${message.senderId === senderId ? 'sender' : 'receiver'}`}
                        >
                        <span>{message.senderId===senderId?"You :":""}{message.content}</span>
                        </div>
                    ))}
                    </div>
            <div className="chat-input">
              <input type="text" id="message-input" placeholder="Type your message" value={inputValue} onChange={handleInput}/>
              <button onClick={() => sendMessage(document.getElementById('message-input').value)}>Send</button>
            </div>
            
          </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Chat;
