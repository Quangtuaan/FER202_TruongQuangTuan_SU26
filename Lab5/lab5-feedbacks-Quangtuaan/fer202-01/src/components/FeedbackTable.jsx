import { useState } from 'react'
import { Card, Table, Button } from 'react-bootstrap'
import { useFeedback } from '../context/FeedbackContext'
import { formatDate } from '../utils/format'
import DeleteConfirmModal from './DeleteConfirmModal'

function FeedbackTable({ feedbacks, onEdit }) {
  const { deleteFeedback } = useFeedback()
  const [deleteTarget, setDeleteTarget] = useState(null)

  const handleDeleteConfirm = async () => {
    await deleteFeedback(deleteTarget)
    setDeleteTarget(null)
  }

  return (
    <>
      <Card className="feedback-card">
        <Card.Body>
          <h6 className="fw-bold mb-4 text-dark">Feedback Management</h6>

          <Table responsive className="feedback-table align-middle mb-0 border-0">
            <thead>
              <tr>
                <th>Course</th>
                <th>Topic</th>
                <th>Rating</th>
                <th>Comment</th>
                <th>Date</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {feedbacks.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center text-muted py-4">
                    No feedbacks yet.
                  </td>
                </tr>
              ) : (
                feedbacks.map((fb) => (
                  <tr key={fb.id}>
                    <td className="fw-medium">{fb.course}</td>
                    <td>{fb.topic}</td>
                    <td>
                      <span className="rating-badge">{fb.rating} ★</span>
                    </td>
                    <td className="text-break" style={{ maxWidth: '250px' }}>
                      {fb.comment}
                    </td>
                    <td className="text-muted small">{formatDate(fb.date)}</td>
                    <td>
                      <div className="d-flex gap-2 justify-content-end">
                        <Button
                          variant="warning"
                          size="sm"
                          className="action-btn"
                          onClick={() => onEdit(fb)}
                        >
                          Edit
                        </Button>

                        <Button
                          variant="danger"
                          size="sm"
                          className="action-btn"
                          onClick={() => setDeleteTarget(fb.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <DeleteConfirmModal
        show={!!deleteTarget}
        onConfirm={handleDeleteConfirm}
        onHide={() => setDeleteTarget(null)}
      />
    </>
  )
}

export default FeedbackTable