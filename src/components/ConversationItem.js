import React, { useEffect, useState } from "react";

const ConversationItem = ({ conversation, contact, selectedConversation }) => {
  const lastMessage = conversation.messages[conversation.messages.length - 1];
  const [blackTheme, setBlackTheme] = useState(false);
//   console.log(selectedConversation)
//   console.log(blackTheme)
  useEffect(() => {
    if (selectedConversation?.contactId === contact.id) {
      setBlackTheme(true);
    } else {
      setBlackTheme(false);
    }
  }, [selectedConversation]);

  return (
    <div className={`conversation-item ${blackTheme ? "dark-theme" : ""}`}>
      <img src={contact.avatar} alt={contact.name} className="avatar" />
      <div className="conversation-info">
        <h3>{contact.name}</h3>
        <p>{lastMessage ? lastMessage.text : "No messages yet"}</p>
      </div>
      <div className="conversation-time">
        <span>
          {lastMessage
            ? new Date(lastMessage.timestamp).toLocaleTimeString()
            : ""}
        </span>
      </div>
    </div>
  );
};

export default ConversationItem;
// className="conversation-item"
