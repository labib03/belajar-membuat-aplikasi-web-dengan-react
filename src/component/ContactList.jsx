import React from "react";
import ContactItem from "./ContactItem";

function ContactList({ contacts, onDelete }) {
  return (
    <div className="contact-list">
      {contacts?.length === 0 ? (
        <p>Tidak ada kontak</p>
      ) : (
        contacts?.map((contact) => (
          <ContactItem key={contact.id} {...contact} onDelete={onDelete} />
        ))
      )}
    </div>
  );
}

export default ContactList;
