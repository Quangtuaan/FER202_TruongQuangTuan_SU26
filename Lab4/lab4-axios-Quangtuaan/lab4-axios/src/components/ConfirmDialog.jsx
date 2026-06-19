import { Button, Modal } from 'react-bootstrap';

function ConfirmDialog({ show, title, message, onCancel, onConfirm, loading }) {
  return (
    <Modal show={show} onHide={onCancel} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title || 'Xác nhận'}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="mb-0">{message}</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel} disabled={loading}>
          Hủy
        </Button>
        <Button variant="danger" onClick={onConfirm} disabled={loading}>
          {loading ? 'Đang xử lý...' : 'Xác nhận'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmDialog;