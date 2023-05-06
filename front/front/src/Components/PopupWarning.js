import React from 'react';



export const PopupWarning = ({ message, onClose }) => {
  return (
    <div className="popup">
      <div className="popup__content">
        <p>You forgot to mark:</p>
        {message.map((item, key) => (
                <li key={key}>{item}</li>
            ))}
        <button className="popup__close" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}