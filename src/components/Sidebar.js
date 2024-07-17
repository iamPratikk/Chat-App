import React, { useState, useEffect } from "react";
// import ConversationItem from './ConversationItem';
import contactsData from "../Assets/contacts.json";
import conversationsData from "../Assets/conversations.json";
import ConversationItem from "./ConversationItem";
import { Link } from "react-router-dom";
import ContactModal from "./ContactModal";

const Sidebar = ({ SelectedConvo }) => {
  const [conversations, setConversations] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setSelectedConversation, selectedConversation } = SelectedConvo;

  useEffect(() => {
    // Load initial data
    setConversations(conversationsData);
  }, []);

  useEffect(() => {
    const filteredConvos = search(conversationsData, searchText);
    setConversations(filteredConvos);
  }, [searchText]);

  const search = (conversations, seachText) => {
    const lowerCaseText = seachText.toLowerCase();
    return conversations
      .map((item) => {
        const filteredMessages = item.messages.filter((item, index) =>
          item.text.toLowerCase().includes(lowerCaseText)
        );
        return {
          ...item,
          messages: filteredMessages,
        };
      })
      .filter((conversation) => conversation.messages.length > 0);
  };

  const handleConversationClick = (conversation) => {
    setSelectedConversation(conversation);
  };

  const handleCreateConversation = (contact) => {
    const existingConversation = conversations.find(conv => conv.contactId === contact.id);
    // c÷onsole.log(existingConversation)
    if (existingConversation) {
        // console.log("setSelectedConvo")
      setSelectedConversation(existingConversation);
    } else {
      const newConversation = {
        contactId: contact.id,
        messages: []
      };
      setConversations([...conversations, newConversation]);
      setSelectedConversation(newConversation);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="sidebar">
      <div className="search-bar">
        <input
          type="text"
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search for conversation"
        />
      </div>
      <div className="conversations">
        {conversations.map((conv, index) => (
          <Link
            key={index}
            to={`/chat/${conv.contactId}`}
            onClick={() => handleConversationClick(conv)}
          >
            <ConversationItem
              key={index}
              conversation={conv}
              contact={contactsData.find((c) => c.id === conv.contactId)}
              selectedConversation={selectedConversation}
            />
          </Link>
        ))}
      </div>
      <button className="create-conversation-button" onClick={() => setIsModalOpen(true)}>+</button>
      {isModalOpen && (
        <ContactModal
          contacts={contactsData}
          onClose={() => setIsModalOpen(false)}
          onSelectContact={handleCreateConversation}
        />
      )}
    </div>
  );
};

export default Sidebar;
