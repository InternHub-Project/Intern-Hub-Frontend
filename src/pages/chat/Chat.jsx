import { useState, useEffect } from "react";
import "./Chat.css";
import { io } from "socket.io-client";
import axios from "axios";
import API_CONFIG from "../../core/utils/apiConfig.js";
import { Box, Button, Container, Text } from "@mantine/core";

function Chat() {
  const [userList, setUserList] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const userData = JSON.parse(localStorage.getItem("userInfo"));
  let senderId;
  let receivedId;
  let token;
  let role;
  if (userData?.data?.userId) {
    senderId = userData.data.userId;
    receivedId = selectedUserId;
    token = userData.data.token;
    role = "user";
  } else {
    senderId = userData.data.companyId;
    receivedId = selectedUserId;
    token = userData.data.token;
    role = "company";
  }
  // Replace with your logic to fetch user list
  let socketIo = io(API_CONFIG.socketConnection);
  useEffect(() => {
    const fetchUserList = async () => {
      const response = await fetch(
        `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.accounts.userOrCompanyList}`,
        {
          headers: { Authorization: `internHub__${token}` },
        }
      ); // Replace with your API endpoint
      const data = await response.json();
      setUserList(data.data);
    };

    fetchUserList();
    socketIo.on("message", (receivedMessage) => {
      if (
        receivedMessage.senderId === selectedUserId ||
        receivedMessage.receivedId === selectedUserId
      ) {
        setMessages([...messages, receivedMessage]);
      }
    });

    return () => {
      // Cleanup function to disconnect from socket on component unmount
      socketIo.disconnect();
    };
  }, [selectedUserId, messages]);
  const handleUserSelection = (userId) => {
    setSelectedUserId(userId);
    setMessages([]); // Assuming empty messages initially
  };

  useEffect(() => {
    if (selectedUserId) {
      setLoading(true);
      axios({
        method: "post",
        url: `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.accounts.userOrCompanyChat}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `internHub__${token}`,
        },
        data: {
          receivedId: selectedUserId,
          role,
        },
      })
        .then((res) => {
          setMessages(res.data.data[0].messages);
          setLoading(false);
        })
        .catch((err) => {
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

    setMessages([...messages, { content: message, senderId: senderId }]);
    setInputValue("");
  };

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };




  return (
    <Container mb={50} className="App">
      <Box ps={0} className="user-list">
        <Box p={10}>
          <Text
            pb={8}
            style={{ borderBottom: "1px solid #ffffff70" }}
            c={"white"}
            ta={"start"}
            fz={25}
            fw={700}
            ps={0}
            className="nameOfCompanies"
          >
            {role === "user" ? "Companies" : "Users"}
          </Text>
        </Box>
        {userList.map((user) => (
          <div
            key={user.companyId || user.userId}
            className={`user ${
              selectedUserId === user.companyId ||
              selectedUserId === user.userId
                ? "active"
                : ""
            }`}
            onClick={() =>
              handleUserSelection(role == "user" ? user.companyId : user.userId)
            }
          >
            <span>
              <img
                src={
                  "https://static.vecteezy.com/system/resources/previews/000/390/524/original/modern-company-logo-design-vector.jpg"
                }
                alt=""
                style={{ width: "30px", height: "30px", borderRadius: "50px" }}
              />{" "}
            </span>
            <span style={{ marginLeft: "5px" }}>
              {user.companyName || user.userName}
            </span>
          </div>
        ))}
      </Box>
      <div className="chat-window">
        {selectedUserId && (
          <>
            <Text mb={10} pl={10} c={"white"} fz={"25px"} fw={700}>
              Chat with:{" "}
              {userList.find((u) => u.companyId === selectedUserId)
                ?.companyName ||
                userList.find((u) => u.userId === selectedUserId)?.userName}
            </Text>
            {loading ? (
              <Text c={"white"}>Loading messages...</Text> // Display loading indicator while fetching messages
            ) : (
              <>
                <Box className="chat-messages">
                  {messages.map((message) => (
                    <div
                      key={message.content || message.messageId}
                      className={`chat-message ${
                        message.senderId === senderId ? "sender" : "receiver"
                      }`}
                    >
                      <span>
                        {message.senderId === senderId ? "You :" : ""}
                        {message.content}
                      </span>
                    </div>
                  ))}
                  <Box>
                    {/* <button id="bt"><i className="fa-solid fa-arrow-down"></i></button> */}
                  </Box>
                </Box>
                <Box pb={7} className="chat-input">
                  <input
                    className="inputField"
                    type="text"
                    id="message-input"
                    placeholder="Type your message"
                    value={inputValue}
                    onChange={handleInput}
                  />
                  <Button
                    mr={5}
                    bg={"green"}
                    onClick={() =>
                      sendMessage(
                        document.getElementById("message-input").value
                      )
                    }
                  >
                    Send
                  </Button>
                </Box>
              </>
            )}
          </>
        )}
      </div>
    </Container>
  );
}

export default Chat;
