// TextboxModal.tsx

import React, { useState } from 'react';
import Modal from 'react-modal';
import './TextboxModal.css';

interface Props {
  isOpen: boolean;
  onRequestClose: () => void;
  onConfirm: (newName: string, mode: string) => void;
  heading: string;
}

const TextboxModal: React.FC<Props> = ({ isOpen, onRequestClose, onConfirm, heading }) => {
  const [newName, setNewName] = useState('');
  const [mode, setMode] = useState('file');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
  };

  const handleModeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    setMode(e.target.value);
  };

  const handleConfirm = () => {
    onConfirm(newName, mode);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal"
      overlayClassName="modal-overlay"
    >
      <h2 className="modal-title">{heading}</h2>
      <input
        type="text"
        value={newName}
        onChange={handleInputChange}
        className="modal-input"
        placeholder="Enter new name..."
      />
      <div className="modal-mode">
        <div className="modal-mode-option">
          <input type="radio" value="folder" checked={mode==='folder'} onChange={handleModeChange}/>
          <label htmlFor="x">Folder</label>
        </div>
        <div className="modal-mode-option">
          <input type="radio" value="file" checked={mode==='file'} onChange={handleModeChange}/>
          <label htmlFor="x">File</label>
        </div>
      </div>
      <div className="modal-buttons">
        <button className="modal-button" onClick={onRequestClose}>
          Close
        </button>
        <button className="modal-button" onClick={handleConfirm}>
          Confirm
        </button>
      </div>
    </Modal>
  );
};

export default TextboxModal;
