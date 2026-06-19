import { useEffect, useState } from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'
import { useFeedback } from '../context/FeedbackContext'
import { getTodayFormatted } from '../utils/format'

const INITIAL = {
  course: '',
  topic: '',
  rating: '',
  comment: '',
}

function AddFeedbackForm({ editTarget, clearEdit }) {
  const { user } = useAuth()
  const { addFeedback, editFeedback } = useFeedback()

  const [form, setForm] = useState(INITIAL)
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)

  const isEditing = !!editTarget

  useEffect(() => {
    if (editTarget) {
      setForm({
        course: editTarget.course || '',
        topic: editTarget.topic || '',
        rating: editTarget.rating || '',
        comment: editTarget.comment || '',
      })
      setErrors({})
      setSuccess(false)
    }
  }, [editTarget])

  useEffect(() => {
    if (!success) return

    const timer = setTimeout(() => {
      setSuccess(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [success])

  const handleChange = (e) => {
    const { name, value } = e.target

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))

    setErrors((prev) => ({
      ...prev,
      [name]: null,
    }))

    setSuccess(false)
  }

  const validate = () => {
    const newErrors = {}

    if (!form.course.trim()) {
      newErrors.course = 'Course name is required'
    }

    const rating = Number(form.rating)

    if (!form.rating || isNaN(rating) || rating < 1 || rating > 5) {
      newErrors.rating = 'Rating must be between 1 and 5'
    }

    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newErrors = validate()

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    if (isEditing) {
      await editFeedback(editTarget.id, {
        ...editTarget,
        course: form.course.trim(),
        topic: form.topic.trim(),
        rating: Number(form.rating),
        comment: form.comment.trim(),
      })

      clearEdit()
    } else {
      await addFeedback({
        userId: user.id,
        course: form.course.trim(),
        topic: form.topic.trim(),
        rating: Number(form.rating),
        comment: form.comment.trim(),
        date: getTodayFormatted(),
      })

      setSuccess(true)
    }

    setForm(INITIAL)
    setErrors({})
  }

  const handleCancelEdit = () => {
    setForm(INITIAL)
    setErrors({})
    clearEdit()
  }

  return (
    <Card className="feedback-card">
      <Card.Body>
        <h6 className="fw-bold mb-4 text-dark">
          {isEditing ? 'Edit Feedback' : 'Add Feedback'}
        </h6>

        {success && (
          <Alert variant="success" onClose={() => setSuccess(false)} dismissible>
            Feedback added successfully!
          </Alert>
        )}

        <Form onSubmit={handleSubmit} noValidate className="feedback-form">
          <Form.Group className="mb-3">
            <Form.Label>Course</Form.Label>
            <Form.Control
              name="course"
              value={form.course}
              onChange={handleChange}
              isInvalid={!!errors.course}
            />
            <Form.Control.Feedback type="invalid">
              {errors.course}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Topic</Form.Label>
            <Form.Control
              name="topic"
              value={form.topic}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Rating</Form.Label>
            <Form.Select
              name="rating"
              value={form.rating}
              onChange={handleChange}
              isInvalid={!!errors.rating}
            >
              <option value="">Select rating</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.rating}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Comment</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              name="comment"
              value={form.comment}
              onChange={handleChange}
            />
          </Form.Group>

          <div className="d-grid gap-2">
            <Button type="submit" variant="primary" className="action-btn">
              {isEditing ? 'Save' : 'Add Feedback'}
            </Button>

            {isEditing && (
              <Button
                type="button"
                variant="light"
                className="action-btn text-muted border"
                onClick={handleCancelEdit}
              >
                Cancel
              </Button>
            )}
          </div>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default AddFeedbackForm