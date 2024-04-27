import { useState, useEffect } from 'react';
import "./Chat.css"
import {io} from "socket.io-client"

function Chat() {
    const [userList, setUserList] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputValue,setInputValue]=useState("")
  const userData = JSON.parse(localStorage.getItem("userInfo"));
  let senderId;
  let receiverId;
  let token;
  let role
  if (userData?.data?.userId) {
    senderId = userData.data.userId;
    receiverId = selectedUserId;
    token=userData.data.token
    role="user"
  } else {
    senderId = userData.data.companyId;
    receiverId = selectedUserId;
    token=userData.data.token
    role="company"

  }
  // Replace with your logic to fetch user list
  let  socketIo = io("http://localhost:3003");
  useEffect(() => {
    const fetchUserList = async () => {
      const response = await fetch('http://localhost:3003/api/v1/account/user_or_company_list',
    {
        headers:{"Authorization":`internHub__${token}`}
    }); // Replace with your API endpoint
      const data = await response.json();
      console.log(data.data);
      setUserList(data.data);
    };

    fetchUserList();
    socketIo.on("message", (receivedMessage) => {
        console.log(receivedMessage);
        if (receivedMessage.senderId === selectedUserId || receivedMessage.receiverId === selectedUserId) {
          setMessages([...messages, receivedMessage]);
        }
      });
  
      return () => {
        // Cleanup function to disconnect from socket on component unmount
        socketIo.disconnect();
      };
  }, [selectedUserId,messages]);

  const handleUserSelection = (userId) => {
    console.log(userId);
    setSelectedUserId(userId);
    // Replace with logic to fetch messages for the selected user
    socketIo.emit("specifyChat",{senderId,receiverId})
    socketIo.on("allchat",(data)=>{
        console.log(data);
    })
    setMessages([]); // Assuming empty messages initially
  };

  const sendMessage = (message) => {
    socketIo.emit("SEND_MESSAGE", {
        message: message,
        senderId,
        receiverId,
      });
    // Implement logic to send the message to the server
    // Update message state locally for UI rendering
    setMessages([...messages, { content: message, sender: 'You' }]);
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
            <div className="chat-messages">
                    {messages.map((message) => (
                        <div
                        key={message.content || message.messageId}
                        className={`chat-message ${message.sender === 'You' ? 'sender' : 'receiver'}`}
                        >
                        <span>{message.content}</span>
                        </div>
                    ))}
                    </div>
            <div className="chat-input">
              <input type="text" id="message-input" placeholder="Type your message" value={inputValue} onChange={handleInput}/>
              <button onClick={() => sendMessage(document.getElementById('message-input').value)}>Send</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Chat;
