import React, { useState, Fragment } from 'react';
import Modal from 'react-modal';

const DeleteModal = () => {
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)'
    }
  };

  Modal.setAppElement('#root');

  const [modalIsOpen, setModal] = useState(false);

  return (
    <Fragment>
      <button onClick={e => setModal(true)}>Open Modal</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={e => setModal(false)}
        style={customStyles}
      >
        <h2>Hello</h2>
        <button onClick={e => setModal(false)}>Close</button>
        <div>I am a modal</div>
        <form>
          <input type="text" />
          <button>test</button>
          <button>test</button>
          <button>test</button>
          <button>test</button>
        </form>
      </Modal>
    </Fragment>
  );
};

export default DeleteModal;
