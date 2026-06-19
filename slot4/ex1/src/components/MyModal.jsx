import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function MyModal({ show, onHide, pizza }) {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        {/* Đã sửa Name thành name */}
        <Modal.Title>{pizza?.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Đã sửa Image thành imageSrc */}
        {pizza?.imageSrc && (
          <img src={pizza.imageSrc} alt={pizza.name} style={{ width: '100%', marginBottom: '10px' }} />
        )}
        {/* Đã sửa Id, Description, OldPrice */}
        <p><strong>ID:</strong> {pizza?.id}</p>
        <p><strong>Description:</strong> {pizza?.description}</p>
        <p><strong>Old Price:</strong> <del>{pizza?.oldPrice}</del></p>
        <p><strong>New Price:</strong> {pizza?.newPrice}</p>
        <p><strong>Tag:</strong> {pizza?.tag}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MyModal;