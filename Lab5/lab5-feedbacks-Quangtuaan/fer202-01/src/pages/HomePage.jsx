import { useEffect, useState } from 'react'
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'
import { useFeedback } from '../context/FeedbackContext'
import Header from '../components/Header'
import Footer from '../components/Footer'
import AddFeedbackForm from '../components/AddFeedbackForm'
import FeedbackTable from '../components/FeedbackTable'

function HomePage() {
  const { user } = useAuth()
  const { items, loading, error, fetchFeedbacks } = useFeedback()
  const [editTarget, setEditTarget] = useState(null)

  useEffect(() => {
    if (user) fetchFeedbacks(user.id)
  }, [user])

  return (
    <div className="app-shell">
      <Header />

      <main className="dashboard-main">
        <Container>
          {loading && (
            <div className="text-center my-5">
              <Spinner animation="border" />
            </div>
          )}

          {error && <Alert variant="danger">{error}</Alert>}

          {!loading && (
            <Row className="g-4">
              <Col md={4}>
                <AddFeedbackForm
                  editTarget={editTarget}
                  clearEdit={() => setEditTarget(null)}
                />
              </Col>

              <Col md={8}>
                <FeedbackTable
                  feedbacks={items}
                  onEdit={setEditTarget}
                />
              </Col>
            </Row>
          )}
        </Container>
      </main>

      <Footer />
    </div>
  )
}

export default HomePage