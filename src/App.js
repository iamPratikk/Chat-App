import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

const App = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  // console.log(selectedConversation)

  return (
    <Router>
      <div className="app">
        <Sidebar SelectedConvo={{selectedConversation,setSelectedConversation}} />
        <Routes>
          <Route path="/chat/:contactId" element={<ChatWindow selectedConversation={selectedConversation} />} />
          <Route path="/" element={<div className="welcome-message">Select a conversation to start chatting</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
