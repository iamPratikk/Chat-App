import React from "react";
import { Link } from "react-router-dom";

const ContactModal = ({ contacts, onClose, onSelectContact }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2 style={{color: 'black'}} >Select a Contact</h2>
          <button className="close-button" onClick={onClose}>
            X
          </button>
        </div>
        <div className="modal-body">
          {contacts.map((contact) => (
            <Link key={contact.id} to={`/chat/${contact.id}`} ><div
              key={contact.id}
              className="contact-item"
              onClick={() => onSelectContact(contact)}
            >
              {contact.name}
            </div></Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
