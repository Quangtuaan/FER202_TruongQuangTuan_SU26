import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import useFetch from '../hooks/useFetch';
import carService from '../services/carService';
import SectionWrapper from '../components/SectionWrapper';
import axios from 'axios';

function ContactPage() {
  const { data: cars } = useFetch(() => carService.getCars(), []);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    carId: '',
    message: '',
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ type: 'danger', message: 'Please fill in all required fields (Name, Email, Message).' });
      return;
    }
    try {
      setSubmitting(true);
      setStatus({ type: '', message: '' });
      // Post to mock json-server contacts endpoint
      await axios.post('http://localhost:3001/contacts', {
        ...formData,
        carId: formData.carId ? parseInt(formData.carId) : null,
        status: 'pending',
        createdAt: new Date().toISOString(),
      });
      setStatus({ type: 'success', message: 'Thank you! Your message has been received. Our sales advisor will contact you shortly.' });
      setFormData({ name: '', email: '', phone: '', carId: '', message: '' });
    } catch (err) {
      console.error(err);
      setStatus({ type: 'danger', message: 'An error occurred while sending your message. Please try again later.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#0b0c10', minHeight: '100vh', padding: '120px 0 80px', color: '#fff' }}>
      <Container>
        <SectionWrapper title="GET IN TOUCH" subtitle="CONTACT US">
          <Row className="g-5 mt-2">
            {/* Contact Form */}
            <Col lg={7} className="reveal-el">
              <div style={{ background: 'linear-gradient(135deg, rgba(24, 26, 31, 0.5) 0%, rgba(13, 13, 15, 0.7) 100%)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', padding: '40px' }}>
                <h3 className="font-heading mb-4 text-uppercase" style={{ fontSize: '1.4rem', fontWeight: '700', letterSpacing: '1px', color: '#fff' }}>Send an Inquiry</h3>
                {status.message && (
                  <Alert variant={status.type === 'success' ? 'success' : 'danger'} className="mb-4 bg-transparent border-warning text-warning">
                    {status.message}
                  </Alert>
                )}
                <Form onSubmit={handleSubmit}>
                  <Row className="g-3">
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="text-uppercase text-white-50" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>Full Name *</Form.Label>
                        <Form.Control 
                          type="text" 
                          name="name" 
                          value={formData.name} 
                          onChange={handleChange} 
                          required 
                          style={{ backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', color: '#fff', padding: '12px' }} 
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="text-uppercase text-white-50" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>Email Address *</Form.Label>
                        <Form.Control 
                          type="email" 
                          name="email" 
                          value={formData.email} 
                          onChange={handleChange} 
                          required 
                          style={{ backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', color: '#fff', padding: '12px' }} 
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="g-3">
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="text-uppercase text-white-50" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>Phone Number</Form.Label>
                        <Form.Control 
                          type="tel" 
                          name="phone" 
                          value={formData.phone} 
                          onChange={handleChange} 
                          style={{ backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', color: '#fff', padding: '12px' }} 
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="text-uppercase text-white-50" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>Select Model of Interest</Form.Label>
                        <Form.Select 
                          name="carId" 
                          value={formData.carId} 
                          onChange={handleChange} 
                          style={{ backgroundColor: '#13151a', border: '1px solid rgba(255,255,255,0.08)', color: '#fff', padding: '12px' }}
                        >
                          <option value="">General Inquiry</option>
                          {(cars || []).map((car) => (
                            <option key={car.id} value={car.id}>
                              {car.brand} {car.name}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group className="mb-4">
                    <Form.Label className="text-uppercase text-white-50" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>Message *</Form.Label>
                    <Form.Control 
                      as="textarea" 
                      rows={4} 
                      name="message" 
                      value={formData.message} 
                      onChange={handleChange} 
                      required 
                      style={{ backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', color: '#fff', padding: '12px' }} 
                    />
                  </Form.Group>
                  <Button 
                    type="submit" 
                    disabled={submitting} 
                    style={{ backgroundColor: 'var(--color-gold)', color: '#000', border: 'none', padding: '14px 40px', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.8rem' }}
                  >
                    {submitting ? 'Sending...' : 'Submit Message'}
                  </Button>
                </Form>
              </div>
            </Col>

            {/* Contact Details */}
            <Col lg={5} className="reveal-el delay-200">
              <div className="ps-lg-4">
                <h3 className="font-heading mb-4 text-uppercase" style={{ fontSize: '1.4rem', fontWeight: '700', letterSpacing: '1px', color: '#fff' }}>Showroom Headquarters</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div>
                    <h5 className="text-uppercase text-gold" style={{ fontSize: '0.85rem', letterSpacing: '1px', fontWeight: '700', color: 'var(--color-gold)' }}>Address</h5>
                    <p className="font-body text-white-50" style={{ fontSize: '0.95rem' }}>123 Velocity Avenue, District 1, Ho Chi Minh City, Vietnam</p>
                  </div>
                  <div>
                    <h5 className="text-uppercase text-gold" style={{ fontSize: '0.85rem', letterSpacing: '1px', fontWeight: '700', color: 'var(--color-gold)' }}>Hotline</h5>
                    <p className="font-body text-white-50" style={{ fontSize: '0.95rem' }}>+84 987 654 321</p>
                  </div>
                  <div>
                    <h5 className="text-uppercase text-gold" style={{ fontSize: '0.85rem', letterSpacing: '1px', fontWeight: '700', color: 'var(--color-gold)' }}>Email</h5>
                    <p className="font-body text-white-50" style={{ fontSize: '0.95rem' }}>contact@atelier.vn</p>
                  </div>
                  <div>
                    <h5 className="text-uppercase text-gold" style={{ fontSize: '0.85rem', letterSpacing: '1px', fontWeight: '700', color: 'var(--color-gold)' }}>Showroom Hours</h5>
                    <p className="font-body text-white-50 mb-0" style={{ fontSize: '0.95rem' }}>Monday - Sunday: 9:00 AM - 9:00 PM</p>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </SectionWrapper>
      </Container>
    </div>
  );
}

export default ContactPage;
