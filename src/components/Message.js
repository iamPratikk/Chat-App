import React from 'react';

const Message = ({ message }) => {
    // console.log(message)
  return (
    <div className={`message ${message.sender === 'user' ? 'user-message' : 'contact-message'}`}>
      <p>{message.sender.toUpperCase()} -- {message.text}</p>
      <span>{new Date(message.timestamp).toLocaleTimeString()}</span>
    </div>
  );
}

export default Message;
