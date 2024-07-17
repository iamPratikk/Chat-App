import React, { useEffect, useState } from "react";
import Message from "./Message";
import contacts from "../Assets/contacts.json";
import conversationsData from "../Assets/conversations.json";
import { useParams } from "react-router-dom";

const ChatWindow = ({ selectedConversation }) => {
  const { contactId } = useParams();
  const contact = contacts.find((c) => c.id === parseInt(contactId));
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState([]);
//   console.log(messages, "Message state")
//   console.log(selectedConversation, "selectedConvo")
  const conversationIndex = conversationsData.findIndex(
    (conv) => conv.contactId === parseInt(contactId)
  );

  useEffect(() => {
    if (selectedConversation) {
      setMessages(conversationsData[conversationIndex].messages);
    }
  }, [selectedConversation]);
  //   const contactName = contacts.find(c=>c.id===conversation.contactId);
  // console.log(contactName)
  const handleSendMessage = () => {
    if (!messageText.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      sender: "user",
      text: messageText,
      timestamp: new Date().toISOString(),
    };

    setMessages([...messages, newMessage]);
    setMessageText("");

    // Update the conversation data with the new message
    
    if (conversationIndex !== -1) {
        // console.log("found it")
      conversationsData[conversationIndex].messages.push(newMessage);
    //   console.log(conversationsData)
    }
  };
  if (!selectedConversation) {
    return <div className="chat-window">Select a conversation to start chatting</div>;
  }

  return (
    <div className="chat-window">
      <div className="chat-header">
        <h3>Chat with {contact.name}</h3>
      </div>
      <div className="messages">
        {messages.map((msg) => (
          <Message key={msg.id} message={msg} />
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder="Type your message here"
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;
