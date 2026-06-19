import { Modal, Button } from 'react-bootstrap'

function DeleteConfirmModal({ show, onConfirm, onHide }) {
  return (
    <Modal show={show} onHide={onHide} centered size="sm">
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="fs-5 fw-bold text-dark">Confirm Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-muted pb-4 pt-2">
        Are you sure you want to delete this feedback? This action cannot be undone.
      </Modal.Body>
      <Modal.Footer className="border-0 pt-0">
        <Button variant="light" className="action-btn text-muted border" onClick={onHide}>Cancel</Button>
        <Button variant="danger" className="action-btn" onClick={onConfirm}>Delete</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DeleteConfirmModal