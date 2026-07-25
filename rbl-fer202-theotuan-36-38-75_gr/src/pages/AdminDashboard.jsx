import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button, Modal, Form, Badge, Alert, Spinner } from 'react-bootstrap';
import carService from '../services/carService';

const initialFormState = {
  name: '',
  brandId: 1,
  type: '',
  price: '',
  currency: 'USD',
  engineCC: '',
  engineType: '',
  horsepower: '',
  torque: '',
  topSpeedKmh: '',
  acceleration0to100: '',
  transmission: '',
  drivetrain: 'AWD',
  year: new Date().getFullYear(),
  imageUrl: '',
  description: '',
  isFeatured: false,
  isNew: false,
};

function AdminDashboard() {
  const [cars, setCars] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState('');
  const [notification, setNotification] = useState({ show: false, variant: 'success', message: '' });

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' | 'edit'
  const [formData, setFormData] = useState(initialFormState);
  const [validated, setValidated] = useState(false);

  // Delete Confirm State
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [carToDelete, setCarToDelete] = useState(null);

  // Fetch initial data
  const fetchData = async () => {
    try {
      setLoading(true);
      setError('');
      const [carsData, brandsData] = await Promise.all([
        carService.getCars(),
        carService.getBrands(),
      ]);
      setCars(carsData);
      setBrands(brandsData);
    } catch (err) {
      setError(err.customMessage || err.message || 'Unable to load admin database.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const triggerNotification = (message, variant = 'success') => {
    setNotification({ show: true, message, variant });
    setTimeout(() => {
      setNotification((prev) => ({ ...prev, show: false }));
    }, 4000);
  };

  // Open Modal for Add
  const handleOpenAdd = () => {
    setModalMode('add');
    setFormData({
      ...initialFormState,
      brandId: brands[0]?.id || 1, // Fallback to first brand
    });
    setValidated(false);
    setShowModal(true);
  };

  // Open Modal for Edit
  const handleOpenEdit = (car) => {
    setModalMode('edit');
    setFormData({
      id: car.id,
      name: car.name || '',
      brandId: car.brandId || brands[0]?.id || 1,
      type: car.type || '',
      price: car.price || '',
      currency: car.currency || 'USD',
      engineCC: car.engineCC || '',
      engineType: car.engineType || '',
      horsepower: car.horsepower || '',
      torque: car.torque || '',
      topSpeedKmh: car.topSpeedKmh || '',
      acceleration0to100: car.acceleration0to100 || '',
      transmission: car.transmission || '',
      drivetrain: car.drivetrain || 'AWD',
      year: car.year || new Date().getFullYear(),
      imageUrl: car.imageUrl || car.image || '',
      description: car.description || '',
      isFeatured: car.isFeatured || false,
      isNew: car.isNew || false,
    });
    setValidated(false);
    setShowModal(true);
  };

  // Handle Form Change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle Form Submit
  const handleSave = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    try {
      setActionLoading(true);
      const selectedBrand = brands.find((b) => b.id === parseInt(formData.brandId));
      const brandName = selectedBrand ? selectedBrand.name : 'Unknown';

      const payload = {
        ...formData,
        brandId: parseInt(formData.brandId),
        brand: brandName,
        price: parseFloat(formData.price),
        year: parseInt(formData.year),
        engineCC: formData.engineCC ? parseInt(formData.engineCC) : 0,
        horsepower: formData.horsepower ? parseInt(formData.horsepower) : 0,
        torque: formData.torque ? parseInt(formData.torque) : 0,
        topSpeedKmh: formData.topSpeedKmh ? parseInt(formData.topSpeedKmh) : 0,
        acceleration0to100: formData.acceleration0to100 ? parseFloat(formData.acceleration0to100) : 0,
        rating: formData.rating || 5.0,
        views: formData.views || 0,
      };

      if (modalMode === 'add') {
        const newCar = await carService.addCar(payload);
        setCars((prev) => [...prev, newCar]);
        triggerNotification(`Successfully added supercar model ${newCar.brand} ${newCar.name}!`);
      } else {
        const updatedCar = await carService.updateCar(formData.id, payload);
        setCars((prev) => prev.map((c) => (c.id === updatedCar.id ? updatedCar : c)));
        triggerNotification(`Successfully updated supercar model ${updatedCar.brand} ${updatedCar.name}!`);
      }
      setShowModal(false);
    } catch (err) {
      triggerNotification(err.customMessage || err.message || 'Error saving vehicle data.', 'danger');
    } finally {
      setActionLoading(false);
    }
  };

  // Open Delete Confirm
  const handleOpenDelete = (car) => {
    setCarToDelete(car);
    setShowDeleteModal(true);
  };

  // Confirm Delete Action
  const handleDeleteConfirm = async () => {
    if (!carToDelete) return;
    try {
      setActionLoading(true);
      await carService.deleteCar(carToDelete.id);
      setCars((prev) => prev.filter((c) => c.id !== carToDelete.id));
      triggerNotification(`Successfully deleted supercar ${carToDelete.brand} ${carToDelete.name} from showroom catalog!`);
      setShowDeleteModal(false);
    } catch (err) {
      triggerNotification(err.customMessage || err.message || 'Error deleting vehicle.', 'danger');
    } finally {
      setActionLoading(false);
      setCarToDelete(null);
    }
  };

  if (loading) {
    return (
      <main className="admin-dashboard-page" style={{ padding: '64px 0', minHeight: '80vh', backgroundColor: '#0b0c10', color: '#fff', display: 'grid', placeItems: 'center' }}>
        <div className="text-center">
          <Spinner animation="border" variant="warning" className="mb-3" />
          <h5 style={{ color: 'var(--color-gold)', letterSpacing: '2.5px', textTransform: 'uppercase' }}>Loading Dashboard Data</h5>
        </div>
      </main>
    );
  }

  return (
    <main className="admin-dashboard-page" style={{ padding: '64px 0', minHeight: '80vh', background: 'radial-gradient(ellipse at top, #121418 0%, #08080a 80%)', color: '#fff' }}>
      <Container style={{ maxWidth: '1280px' }}>
        
        {/* Notification Toast Alert */}
        {notification.show && (
          <Alert variant={notification.variant} className="border-0 mb-4 glass text-white" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
            {notification.message}
          </Alert>
        )}

        <header className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-5 gap-3">
          <div>
            <span className="compare-card-badge" style={{ color: 'var(--color-gold)', border: '1px solid rgba(255, 255, 255, 0.08)', background: 'rgba(11, 12, 16, 0.85)', padding: '4px 10px', fontSize: '9px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', display: 'inline-block', borderRadius: '2px', marginBottom: '12px' }}>
              CONTROL PANEL
            </span>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '32px', fontWeight: 800, textTransform: 'uppercase', margin: 0, letterSpacing: '-0.5px' }}>
              Admin Dashboard
            </h1>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--color-text-muted)', margin: '8px 0 0' }}>
              Inventory Management & Catalog Control
            </p>
          </div>
          <Button onClick={handleOpenAdd} className="btn-gold-shimmer px-4 py-2 border-0 rounded-0 text-black fw-bold" style={{ letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.85rem' }}>
            ADD NEW SUPERCAR
          </Button>
        </header>

        {error && (
          <Alert variant="danger" className="mb-4">
            {error}
          </Alert>
        )}

        {/* Counter Stats Summary */}
        <Row className="g-4 mb-5">
          <Col xs={12} sm={6} md={4}>
            <div className="glass-card p-4" style={{ borderRadius: '6px', background: 'rgba(19, 21, 26, 0.55)', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--color-gold)', display: 'block', marginBottom: '8px' }}>
                SUPERCAR INVENTORY
              </span>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '36px', fontWeight: 800, margin: 0 }}>
                {cars.length} Models
              </h3>
            </div>
          </Col>
          <Col xs={12} sm={6} md={4}>
            <div className="glass-card p-4" style={{ borderRadius: '6px', background: 'rgba(19, 21, 26, 0.55)', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--color-gold)', display: 'block', marginBottom: '8px' }}>
                SHOWROOM VALUATION
              </span>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '36px', fontWeight: 800, margin: 0 }}>
                ${((cars.reduce((sum, c) => sum + (c.price || 0), 0)) / 1000000).toFixed(2)} Million
              </h3>
            </div>
          </Col>
          <Col xs={12} sm={6} md={4}>
            <div className="glass-card p-4" style={{ borderRadius: '6px', background: 'rgba(19, 21, 26, 0.55)', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--color-gold)', display: 'block', marginBottom: '8px' }}>
                FEATURED SUPERMODELS
              </span>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '36px', fontWeight: 800, margin: 0 }}>
                {cars.filter((c) => c.isFeatured).length} Cars
              </h3>
            </div>
          </Col>
        </Row>

        {/* Database Inventory Table */}
        <section className="glass-panel p-4" style={{ background: 'rgba(19, 21, 26, 0.65)', border: '1px solid rgba(197, 168, 128, 0.1)', borderRadius: '6px', overflow: 'hidden' }}>
          <h2 className="mb-4 text-uppercase" style={{ fontSize: '1.25rem', letterSpacing: '1.5px', fontFamily: 'var(--font-heading)', color: '#fff' }}>Supercar Catalog</h2>
          {cars.length === 0 ? (
            <p className="text-center text-muted py-5">No supercars registered in the showroom inventory yet.</p>
          ) : (
            <Table responsive striped bordered hover variant="dark" className="align-middle mb-0 text-white" style={{ borderCollapse: 'separate', borderSpacing: 0, borderColor: 'rgba(255,255,255,0.04)' }}>
              <thead>
                <tr style={{ background: 'rgba(11, 12, 16, 0.95)', borderBottom: '2px solid rgba(197,168,128,0.3)' }}>
                  <th style={{ color: 'var(--color-gold)', textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 700, padding: '16px' }}>Image</th>
                  <th style={{ color: 'var(--color-gold)', textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 700, padding: '16px' }}>Car Model</th>
                  <th style={{ color: 'var(--color-gold)', textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 700, padding: '16px' }}>Brand</th>
                  <th style={{ color: 'var(--color-gold)', textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 700, padding: '16px' }}>Suggested Price</th>
                  <th style={{ color: 'var(--color-gold)', textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 700, padding: '16px' }}>Drivetrain</th>
                  <th style={{ color: 'var(--color-gold)', textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 700, padding: '16px' }}>Year</th>
                  <th style={{ color: 'var(--color-gold)', textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 700, padding: '16px' }}>Featured Tags</th>
                  <th className="text-end" style={{ color: 'var(--color-gold)', textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 700, padding: '16px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cars.map((car) => {
                  const carImg = car.imageUrl || car.image || 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&auto=format&fit=crop&q=80';
                  return (
                    <tr key={car.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', backgroundColor: 'transparent' }}>
                      <td style={{ padding: '12px' }}>
                        <div style={{ width: '80px', height: '45px', overflow: 'hidden', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.08)' }}>
                          <img src={carImg} alt={car.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                      </td>
                      <td className="fw-bold" style={{ padding: '16px', fontSize: '0.9rem' }}>{car.name}</td>
                      <td style={{ padding: '16px', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>{car.brand}</td>
                      <td className="text-white fw-bold" style={{ padding: '16px', fontSize: '0.9rem' }}>
                        {typeof car.price === 'number' ? `$${car.price.toLocaleString()}` : car.price}
                      </td>
                      <td style={{ padding: '16px', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>{car.drivetrain}</td>
                      <td style={{ padding: '16px', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>{car.year}</td>
                      <td style={{ padding: '16px' }}>
                        <div className="d-flex gap-1">
                          {car.isFeatured && <Badge bg="warning" text="dark" style={{ fontSize: '0.65rem', textTransform: 'uppercase' }}>Featured</Badge>}
                          {car.isNew && <Badge bg="success" style={{ fontSize: '0.65rem', textTransform: 'uppercase' }}>New</Badge>}
                        </div>
                      </td>
                      <td className="text-end" style={{ padding: '16px' }}>
                        <div className="d-flex gap-2 justify-content-end">
                          <Button variant="outline-warning" size="sm" className="rounded-0 px-3" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }} onClick={() => handleOpenEdit(car)}>
                            EDIT
                          </Button>
                          <Button variant="outline-danger" size="sm" className="rounded-0 px-3" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }} onClick={() => handleOpenDelete(car)}>
                            DELETE
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          )}
        </section>
      </Container>

      {/* CREATE & EDIT FORM MODAL */}
      <Modal show={showModal} onHide={() => !actionLoading && setShowModal(false)} size="lg" centered contentClassName="glass border-0" dialogClassName="luxury-admin-modal text-white">
        <Modal.Header closeButton closeVariant="white" className="border-bottom border-secondary" style={{ background: 'rgba(11, 12, 16, 0.95)' }}>
          <Modal.Title style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-gold)', letterSpacing: '1px', textTransform: 'uppercase', fontSize: '1.25rem' }}>
            {modalMode === 'add' ? 'Add New Supercar Model' : 'Update Technical Specifications'}
          </Modal.Title>
        </Modal.Header>
        <Form noValidate validated={validated} onSubmit={handleSave}>
          <Modal.Body style={{ background: '#13151a', maxHeight: '70vh', overflowY: 'auto', padding: '2rem' }}>
            <Row className="g-3">
              {/* Name */}
              <Col xs={12} sm={6}>
                <Form.Group controlId="formCarName">
                  <Form.Label style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase' }}>Car Model Name*</Form.Label>
                  <Form.Control required type="text" name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Aventador SVJ" className="bg-dark border-secondary text-white rounded-0" />
                  <Form.Control.Feedback type="invalid">Please provide a valid car model name.</Form.Control.Feedback>
                </Form.Group>
              </Col>
              
              {/* Brand Select */}
              <Col xs={12} sm={6}>
                <Form.Group controlId="formCarBrand">
                  <Form.Label style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase' }}>Manufacturer Brand*</Form.Label>
                  <Form.Select required name="brandId" value={formData.brandId} onChange={handleChange} className="bg-dark border-secondary text-white rounded-0">
                    {brands.map((b) => (
                      <option key={b.id} value={b.id}>{b.name}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>

              {/* Price */}
              <Col xs={12} sm={6}>
                <Form.Group controlId="formCarPrice">
                  <Form.Label style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase' }}>Price (USD)*</Form.Label>
                  <Form.Control required type="number" min="0" name="price" value={formData.price} onChange={handleChange} placeholder="e.g. 517000" className="bg-dark border-secondary text-white rounded-0" />
                  <Form.Control.Feedback type="invalid">Please provide a valid suggested retail price.</Form.Control.Feedback>
                </Form.Group>
              </Col>

              {/* Year */}
              <Col xs={12} sm={6}>
                <Form.Group controlId="formCarYear">
                  <Form.Label style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase' }}>Release Year*</Form.Label>
                  <Form.Control required type="number" min="1900" max={new Date().getFullYear() + 2} name="year" value={formData.year} onChange={handleChange} className="bg-dark border-secondary text-white rounded-0" />
                  <Form.Control.Feedback type="invalid">Please provide a valid production year.</Form.Control.Feedback>
                </Form.Group>
              </Col>

              {/* Body Type */}
              <Col xs={12} sm={6}>
                <Form.Group controlId="formCarType">
                  <Form.Label style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase' }}>Body Type*</Form.Label>
                  <Form.Control required type="text" name="type" value={formData.type} onChange={handleChange} placeholder="e.g. Coupe, Spider, Hypercar" className="bg-dark border-secondary text-white rounded-0" />
                  <Form.Control.Feedback type="invalid">Please specify the car body type.</Form.Control.Feedback>
                </Form.Group>
              </Col>

              {/* Image URL */}
              <Col xs={12} sm={6}>
                <Form.Group controlId="formCarImage">
                  <Form.Label style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase' }}>High-Res Cover Image (URL)*</Form.Label>
                  <Form.Control required type="url" name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="https://images.unsplash.com/..." className="bg-dark border-secondary text-white rounded-0" />
                  <Form.Control.Feedback type="invalid">Please provide a valid image URL link.</Form.Control.Feedback>
                </Form.Group>
              </Col>

              <hr className="my-3 border-secondary" />
              <h6 className="text-uppercase m-0" style={{ color: 'var(--color-gold)', letterSpacing: '1px' }}>Technical Parameters</h6>

              {/* Engine CC */}
              <Col xs={12} sm={4}>
                <Form.Group controlId="formCarCC">
                  <Form.Label style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', fontWeight: 600 }}>Cylinder Capacity (cc)</Form.Label>
                  <Form.Control type="number" min="0" name="engineCC" value={formData.engineCC} onChange={handleChange} placeholder="e.g. 6498" className="bg-dark border-secondary text-white rounded-0" />
                </Form.Group>
              </Col>

              {/* Engine Type */}
              <Col xs={12} sm={8}>
                <Form.Group controlId="formEngineType">
                  <Form.Label style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', fontWeight: 600 }}>Engine Type Configuration</Form.Label>
                  <Form.Control type="text" name="engineType" value={formData.engineType} onChange={handleChange} placeholder="e.g. V12 naturally aspirated + 3 Electric Motors" className="bg-dark border-secondary text-white rounded-0" />
                </Form.Group>
              </Col>

              {/* Horsepower */}
              <Col xs={12} sm={6} md={3}>
                <Form.Group controlId="formHorsepower">
                  <Form.Label style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', fontWeight: 600 }}>Horsepower (HP)</Form.Label>
                  <Form.Control type="number" min="0" name="horsepower" value={formData.horsepower} onChange={handleChange} placeholder="e.g. 1015" className="bg-dark border-secondary text-white rounded-0" />
                </Form.Group>
              </Col>

              {/* Torque */}
              <Col xs={12} sm={6} md={3}>
                <Form.Group controlId="formTorque">
                  <Form.Label style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', fontWeight: 600 }}>Torque (Nm)</Form.Label>
                  <Form.Control type="number" min="0" name="torque" value={formData.torque} onChange={handleChange} placeholder="e.g. 730" className="bg-dark border-secondary text-white rounded-0" />
                </Form.Group>
              </Col>

              {/* 0-100 acceleration */}
              <Col xs={12} sm={6} md={3}>
                <Form.Group controlId="formAcceleration">
                  <Form.Label style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', fontWeight: 600 }}>0-100 km/h (seconds)</Form.Label>
                  <Form.Control type="number" step="0.1" min="0" name="acceleration0to100" value={formData.acceleration0to100} onChange={handleChange} placeholder="e.g. 2.5" className="bg-dark border-secondary text-white rounded-0" />
                </Form.Group>
              </Col>

              {/* Top Speed */}
              <Col xs={12} sm={6} md={3}>
                <Form.Group controlId="formTopSpeed">
                  <Form.Label style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', fontWeight: 600 }}>Top Speed (km/h)</Form.Label>
                  <Form.Control type="number" min="0" name="topSpeedKmh" value={formData.topSpeedKmh} onChange={handleChange} placeholder="e.g. 350" className="bg-dark border-secondary text-white rounded-0" />
                </Form.Group>
              </Col>

              {/* Transmission */}
              <Col xs={12} sm={6}>
                <Form.Group controlId="formTransmission">
                  <Form.Label style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', fontWeight: 600 }}>Transmission System</Form.Label>
                  <Form.Control type="text" name="transmission" value={formData.transmission} onChange={handleChange} placeholder="e.g. 8-speed dual-clutch" className="bg-dark border-secondary text-white rounded-0" />
                </Form.Group>
              </Col>

              {/* Drivetrain Drivetrain */}
              <Col xs={12} sm={6}>
                <Form.Group controlId="formDrivetrain">
                  <Form.Label style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', fontWeight: 600 }}>Drivetrain System</Form.Label>
                  <Form.Select name="drivetrain" value={formData.drivetrain} onChange={handleChange} className="bg-dark border-secondary text-white rounded-0">
                    <option value="AWD">AWD (All-Wheel Drive)</option>
                    <option value="RWD">RWD (Rear-Wheel Drive)</option>
                    <option value="FWD">FWD (Front-Wheel Drive)</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              {/* Description */}
              <Col xs={12}>
                <Form.Group controlId="formDescription">
                  <Form.Label style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', fontWeight: 600 }}>Philosophical Description</Form.Label>
                  <Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleChange} placeholder="Explain the heritage, performance tuning, and design elements of this supercar..." className="bg-dark border-secondary text-white rounded-0" />
                </Form.Group>
              </Col>

              {/* Status Toggles */}
              <Col xs={12} className="mt-3">
                <div className="d-flex gap-4">
                  <Form.Check type="checkbox" id="checkFeatured" name="isFeatured" label="Feature on Homepage Banner" checked={formData.isFeatured} onChange={handleChange} className="gold-checkbox text-white-50" />
                  <Form.Check type="checkbox" id="checkNew" name="isNew" label="New Arrival Label Tag" checked={formData.isNew} onChange={handleChange} className="gold-checkbox text-white-50" />
                </div>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer className="border-top border-secondary justify-content-end gap-2" style={{ background: 'rgba(11, 12, 16, 0.95)' }}>
            <Button variant="outline-secondary" className="rounded-0 text-white" disabled={actionLoading} onClick={() => setShowModal(false)}>
              CANCEL
            </Button>
            <Button type="submit" className="btn-gold-shimmer px-4 border-0 rounded-0 text-black fw-bold" disabled={actionLoading}>
              {actionLoading ? <Spinner size="sm" animation="border" /> : 'SAVE CHANGES'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* CONFIRM DELETE MODAL */}
      <Modal show={showDeleteModal} onHide={() => !actionLoading && setShowDeleteModal(false)} centered contentClassName="glass border-0 text-white" size="md">
        <Modal.Header closeButton closeVariant="white" className="border-bottom border-secondary" style={{ background: 'rgba(11, 12, 16, 0.95)' }}>
          <Modal.Title style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-gold)', letterSpacing: '0.5px', textTransform: 'uppercase', fontSize: '1.1rem' }}>
            Confirm Asset Deletion
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark p-4">
          <p className="mb-0">Are you sure you want to delete the supercar model <strong className="text-white">{carToDelete?.brand} {carToDelete?.name}</strong> from the Atelier catalog?</p>
          <small className="text-danger mt-2 d-block">This action is permanent and cannot be undone in the database.</small>
        </Modal.Body>
        <Modal.Footer className="border-top border-secondary justify-content-end gap-2" style={{ background: 'rgba(11, 12, 16, 0.95)' }}>
          <Button variant="outline-secondary" className="rounded-0" disabled={actionLoading} onClick={() => setShowDeleteModal(false)}>
            CANCEL
          </Button>
          <Button variant="danger" className="rounded-0 px-4" disabled={actionLoading} onClick={handleDeleteConfirm}>
            {actionLoading ? <Spinner size="sm" animation="border" /> : 'CONFIRM DELETE'}
          </Button>
        </Modal.Footer>
      </Modal>
    </main>
  );
}

export default AdminDashboard;
