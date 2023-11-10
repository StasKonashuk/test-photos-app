import React, { useEffect } from 'react';
import Modal from 'react-modal';

import './styles.scss';
import { CloseIcon } from '../icons';

interface ModalProps {
  children: any;
  isOpen: boolean;
  title: string;
  closeModal: () => void;
}

const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

export function CustomModal(props: ModalProps) {
  const { children, isOpen, closeModal, title } = props;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  return (
    <Modal
      overlayClassName="modal-overlay"
      style={modalStyles}
      onRequestClose={closeModal}
      isOpen={isOpen}>
      <div className="modal-wrapper">
        <div className="modal-header-wrapper">
          <h1>{title}</h1>
          <button
            className="close-button"
            onClick={closeModal}
            type="button"
            aria-label="Close modal">
            <CloseIcon width={24} height={24} fill="none" stroke="#8e8e93" />
          </button>
        </div>
        {children}
      </div>
    </Modal>
  );
}
