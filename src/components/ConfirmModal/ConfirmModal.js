import React from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button } from 'react-bootstrap';
import classes from './ConfirmModal.module.scss';
import HTMLReactParser from 'html-react-parser';
import CloseIcon from '@mui/icons-material/Close';

export default function ConfirmModal({
  title,
  modalVisibility,
  content,
  toggleModal,
  onAction,
}) {
  return (
    <React.Fragment>
      {modalVisibility &&
        ReactDOM.createPortal(
          <div className={classes['backdrop']}></div>,
          document.getElementById('backdrop-root'),
        )}
      <Modal show={modalVisibility} className={classes['modal']}>
        <Modal.Header className={classes['modal--header']}>
          <Modal.Title>{HTMLReactParser(title)}</Modal.Title>
          <Button onClick={toggleModal}>
            <CloseIcon />
          </Button>
        </Modal.Header>
        <Modal.Body className={classes['modal--body']}>
          {HTMLReactParser(content)}
        </Modal.Body>
        <Modal.Footer className={classes['modal--footer']}>
          <Button onClick={toggleModal}>Cancel</Button>
          <Button onClick={onAction}>OK</Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}
