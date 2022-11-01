import React from "react";

function DeleteButton(props) {
  const { id, onDelete } = props;
  return (
    <div>
      <button className="contact-item__delete" onClick={() => onDelete(id)}>
        X
      </button>
    </div>
  );
}

export default DeleteButton;
