import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import carService from '../services/carService';
import './CarDetailPage.css';

// Sound Profile Presets based on engine configuration
const getEngineSoundPreset = (engineType, brand) => {
  const et = (engineType || '').toLowerCase();
  const b = (brand || '').toLowerCase();

  if (et.includes('w16') || et.includes('16')) {
    return {
      type: 'sawtooth',
      baseFreq: 32,
      idleFilter: 110,
      revFilterMax: 480,
      volIdle: 0.12,
      volMax: 0.22,
      screamFactor: 2.2,
      desc: 'W16 Quad-Turbo Deep Rumble'
    };
  }
  
  if (et.includes('v12') || et.includes('12')) {
    return {
      type: 'sawtooth',
      baseFreq: 52,
      idleFilter: 160,
      revFilterMax: 650,
      volIdle: 0.08,
      volMax: 0.20,
      screamFactor: 3.5,
      desc: 'Screaming V12 naturally aspirated'
    };
  }

  if (et.includes('v10') || et.includes('10')) {
    return {
      type: 'sawtooth',
      baseFreq: 46,
      idleFilter: 130,
      revFilterMax: 550,
      volIdle: 0.08,
      volMax: 0.18,
      screamFactor: 3.0,
      desc: 'V10 Metallic Wail'
    };
  }

  if (et.includes('electric') || et.includes('ev') || et.includes('hybrid')) {
    return {
      type: 'sine',
      baseFreq: 60,
      idleFilter: 300,
      revFilterMax: 2000,
      volIdle: 0.03,
      volMax: 0.12,
      screamFactor: 8.0,
      desc: 'Futuristic Electric Whine'
    };
  }

  return {
    type: 'sawtooth',
    baseFreq: 38,
    idleFilter: 115,
    revFilterMax: 420,
    volIdle: 0.10,
    volMax: 0.19,
    screamFactor: 2.5,
    desc: 'V8 Throaty Growl'
  };
};

function CarDetailPage() {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Atelier Cockpit States
  const [engineStarted, setEngineStarted] = useState(false);
  const [rpm, setRpm] = useState(0);
  const [revving, setRevving] = useState(false);
  const [carColor, setCarColor] = useState('original');
  const [audioNodes, setAudioNodes] = useState(null);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        setLoading(true);
        const data = await carService.getCarById(id);
        setCar(data);
      } catch (err) {
        setError(err.customMessage || err.message || 'Unable to load car details.');
      } finally {
        setLoading(false);
      }
    };
    fetchCar();
  }, [id]);

  // Dynamic sound profile calculation
  const soundPreset = car ? getEngineSoundPreset(car.engineType, car.brand) : null;

  // RPM logic hook
  useEffect(() => {
    let interval;
    if (revving && engineStarted) {
      interval = setInterval(() => {
        setRpm((prev) => {
          const next = Math.min(prev + 400, 8000);
          updateEnginePitch(next);
          return next;
        });
      }, 30);
    } else if (engineStarted) {
      interval = setInterval(() => {
        setRpm((prev) => {
          const next = Math.max(prev - 300, 1000); // Idle RPM
          updateEnginePitch(next);
          return next;
        });
      }, 30);
    } else {
      interval = setInterval(() => {
        setRpm((prev) => {
          const next = Math.max(prev - 400, 0);
          return next;
        });
      }, 30);
    }
    return () => clearInterval(interval);
  }, [revving, engineStarted, audioNodes]);

  // Clean up sound on unmount
  useEffect(() => {
    return () => {
      if (audioNodes) {
        try {
          audioNodes.osc.stop();
          audioNodes.ctx.close();
        } catch (e) {}
      }
    };
  }, [audioNodes]);

  const toggleEngine = () => {
    if (!engineStarted && soundPreset) {
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = soundPreset.type;
        osc.frequency.setValueAtTime(soundPreset.baseFreq, ctx.currentTime);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(soundPreset.idleFilter, ctx.currentTime);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        gain.gain.setValueAtTime(soundPreset.volIdle, ctx.currentTime);
        osc.start();

        setAudioNodes({ ctx, osc, filter, gain });
        setEngineStarted(true);
        setRpm(1000);
      } catch (e) {
        console.error('AudioContext is not supported or blocked:', e);
      }
    } else {
      if (audioNodes) {
        try {
          audioNodes.osc.stop();
          audioNodes.ctx.close();
        } catch (e) {}
      }
      setAudioNodes(null);
      setEngineStarted(false);
      setRpm(0);
      setRevving(false);
    }
  };

  const updateEnginePitch = (currentRpm) => {
    if (audioNodes && audioNodes.ctx && soundPreset) {
      const { ctx, osc, filter, gain } = audioNodes;
      
      // Calculate frequency shift based on rpm and preset's screamFactor
      const freq = soundPreset.baseFreq + (currentRpm / 8000) * soundPreset.baseFreq * soundPreset.screamFactor;
      osc.frequency.setTargetAtTime(freq, ctx.currentTime, 0.05);

      const filterRange = soundPreset.revFilterMax - soundPreset.idleFilter;
      const filterFreq = soundPreset.idleFilter + (currentRpm / 8000) * filterRange;
      filter.frequency.setTargetAtTime(filterFreq, ctx.currentTime, 0.05);

      const volRange = soundPreset.volMax - soundPreset.volIdle;
      const volume = soundPreset.volIdle + (currentRpm / 8000) * volRange;
      gain.gain.setTargetAtTime(volume, ctx.currentTime, 0.05);
    }
  };

  if (loading) {
    return (
      <main className="car-detail-page d-flex align-items-center justify-content-center" style={{ minHeight: '60vh' }}>
        <Container className="text-center">
          <div className="luxury-spinner-ring mb-3" style={{ margin: '0 auto' }}></div>
          <div style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-gold)', letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.9rem' }}>Loading Details</div>
        </Container>
      </main>
    );
  }

  if (error || !car) {
    return (
      <main className="car-detail-page d-flex align-items-center justify-content-center" style={{ minHeight: '60vh' }}>
        <Container className="text-center">
          <h2 className="text-uppercase mb-3">Supercar Not Found</h2>
          <p className="text-muted mb-4">{error || "The model you are looking for does not exist in our showroom catalog."}</p>
          <Link to="/cars" className="cta-pdf-btn mt-3" style={{ display: 'inline-block', textDecoration: 'none' }}>
            Back to Showroom
          </Link>
        </Container>
      </main>
    );
  }

  const carImage = car.image || car.imageUrl;

  const getColorFilter = (color) => {
    switch (color) {
      case 'rosso':
        return 'hue-rotate(340deg) saturate(1.4)';
      case 'giallo':
        return 'hue-rotate(35deg) saturate(1.6) brightness(1.1)';
      case 'verde':
        return 'hue-rotate(90deg) saturate(1.5)';
      case 'blu':
        return 'hue-rotate(200deg) saturate(1.4)';
      case 'viola':
        return 'hue-rotate(265deg) saturate(1.4)';
      case 'grigio':
        return 'grayscale(1) brightness(0.85) contrast(1.15)';
      default:
        return 'none';
    }
  };

  const needleRotation = -120 + (rpm / 8000) * 240;

  const colors = [
    { id: 'original', name: 'Original', code: '#a8adb7' },
    { id: 'rosso', name: 'Rosso Mars', code: '#d11a2a' },
    { id: 'giallo', name: 'Giallo Auge', code: '#f4c430' },
    { id: 'verde', name: 'Verde Selvans', code: '#2e8b57' },
    { id: 'blu', name: 'Blu Nethuns', code: '#1f75fe' },
    { id: 'viola', name: 'Viola Pasifae', code: '#8b008b' },
    { id: 'grigio', name: 'Grigio Nimbus', code: '#505050' },
  ];

  return (
    <main className="car-detail-page">
      {/* Detail Hero Section */}
      <section 
        className="car-detail-hero" 
        style={{ 
          backgroundImage: `url(${carImage})`,
          filter: getColorFilter(carColor),
          transition: 'filter 0.5s ease'
        }}
      >
        <div className="car-detail-hero-overlay" />
        <Container className="car-detail-hero-content">
          <span className="compare-card-badge">{car.type}</span>
          <h1 className="car-detail-title">{car.brand} {car.name}</h1>
          <p className="car-detail-price">
            {typeof car.price === 'number' ? `$${car.price.toLocaleString()}` : car.price}
          </p>
        </Container>
      </section>

      {/* Specifications & Description */}
      <Container className="car-detail-container">
        <Row className="gy-5">
          <Col xs={12} lg={7}>
            <div className="spec-table-container p-4 p-md-5 mb-5" style={{ background: 'linear-gradient(135deg, rgba(24, 26, 31, 0.5) 0%, rgba(13, 13, 15, 0.7) 100%)' }}>
              <h2 className="detail-section-title text-uppercase mb-4">Overview</h2>
              <p className="car-description text-white-75 mb-0" style={{ lineHeight: '1.7', fontSize: '0.95rem' }}>
                {car.description || 
                  "A masterfully engineered work of art, merging raw track performance with absolute luxury design. Every curve and intake is optimized for aerodynamical efficiency and cooling, delivering an uncompromising sensory experience."}
              </p>
            </div>

            <div className="spec-table-container">
              <table className="spec-table">
                <tbody>
                  <tr className="spec-row">
                    <td className="spec-name-label">Brand</td>
                    <td>{car.brand}</td>
                  </tr>
                  <tr className="spec-row">
                    <td className="spec-name-label">Year</td>
                    <td>{car.year}</td>
                  </tr>
                  <tr className="spec-row">
                    <td className="spec-name-label">Engine Type</td>
                    <td>{car.engineType}</td>
                  </tr>
                  <tr className="spec-row">
                    <td className="spec-name-label">Engine CC</td>
                    <td>{car.engineCC ? `${car.engineCC.toLocaleString()} cc` : 'N/A'}</td>
                  </tr>
                  <tr className="spec-row">
                    <td className="spec-name-label">Transmission</td>
                    <td>{car.transmission}</td>
                  </tr>
                  <tr className="spec-row">
                    <td className="spec-name-label">Drivetrain</td>
                    <td>{car.drivetrain}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Col>

          <Col xs={12} lg={5}>
            <div className="glass-card p-4 p-md-5" style={{ borderRadius: '6px' }}>
              <h3 className="performance-title text-uppercase mb-4">Performance specs</h3>
              
              <div className="perf-item d-flex justify-content-between mb-4 border-bottom border-secondary pb-3">
                <span className="perf-label">HORSEPOWER</span>
                <strong className="perf-value text-white">{car.horsepower || 'N/A'} HP</strong>
              </div>
              
              <div className="perf-item d-flex justify-content-between mb-4 border-bottom border-secondary pb-3">
                <span className="perf-label">TORQUE</span>
                <strong className="perf-value text-white">{car.torque ? `${car.torque} Nm` : 'N/A'}</strong>
              </div>
              
              <div className="perf-item d-flex justify-content-between mb-4 border-bottom border-secondary pb-3">
                <span className="perf-label">0 - 100 KM/H</span>
                <strong className="perf-value text-white">{car.acceleration0to100 ? `${car.acceleration0to100}s` : 'N/A'}</strong>
              </div>
              
              <div className="perf-item d-flex justify-content-between mb-4">
                <span className="perf-label">TOP SPEED</span>
                <strong className="perf-value text-white">{car.topSpeedKmh ? `${car.topSpeedKmh} km/h` : 'N/A'}</strong>
              </div>

              <div className="mt-5 d-flex flex-column gap-3">
                <button type="button" className="cta-contact-btn w-100">
                  REQUEST MORE INFO
                </button>
                <Link to="/cars" className="cta-pdf-btn w-100 text-center" style={{ textDecoration: 'none', display: 'block' }}>
                  BACK TO SHOWROOM
                </Link>
              </div>
            </div>
          </Col>
        </Row>

        {/* ATELIER COCKPIT EXPERIENCES WIDGET */}
        <Row className="mt-5 reveal-el">
          <Col xs={12}>
            <div className="spec-table-container p-4 p-md-5" style={{ background: 'linear-gradient(135deg, rgba(24, 26, 31, 0.5) 0%, rgba(13, 13, 15, 0.7) 100%)' }}>
              <h3 className="performance-title text-uppercase mb-4" style={{ color: 'var(--color-gold)', letterSpacing: '1px' }}>Atelier Cockpit & Customizer</h3>
              
              <Row className="gy-4">
                {/* 1. Paint Configurator */}
                <Col md={6}>
                  <div className="cockpit-widget-card p-4 h-100">
                    <h4 className="widget-subtitle mb-3 text-uppercase">Bespoke Paint Configuration</h4>
                    <p className="text-white-50 mb-4" style={{ fontSize: '0.85rem' }}>
                      Select a premium paint color to configure this {car.brand} model's exterior aesthetics.
                    </p>
                    <div className="swatch-container">
                      {colors.map((color) => (
                        <button
                          key={color.id}
                          className={`swatch-btn ${carColor === color.id ? 'active' : ''}`}
                          style={{ backgroundColor: color.code }}
                          onClick={() => setCarColor(color.id)}
                          title={color.name}
                        >
                          <span className="swatch-tooltip">{color.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </Col>

                {/* 2. Audio Engine Simulator */}
                <Col md={6}>
                  <div className="cockpit-widget-card p-4 h-100">
                    <h4 className="widget-subtitle mb-2 text-uppercase">Analog Sound Exhaust Simulator</h4>
                    
                    {/* Dynamic profile description */}
                    <div className="text-uppercase text-gold mb-3" style={{ fontSize: '0.75rem', letterSpacing: '1px', fontWeight: '700', color: 'var(--color-gold)' }}>
                      Engine Profile: {soundPreset?.desc || 'V8 Throaty Growl'}
                    </div>

                    <p className="text-white-50 mb-4" style={{ fontSize: '0.85rem' }}>
                      Start the engine and hold the accelerator pedal to rev the roaring motor.
                    </p>

                    <div className="d-flex align-items-center justify-content-around flex-wrap gap-4">
                      {/* Tachometer SVG */}
                      <div className="tachometer-wrapper">
                        <svg className="tachometer" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="40" className="tacho-track" />
                          <circle cx="50" cy="50" r="40" className="tacho-progress" style={{ strokeDashoffset: 251.2 - (rpm / 8000) * 188 }} />
                          <line x1="50" y1="50" x2="50" y2="15" className="tacho-needle" style={{ transform: `rotate(${needleRotation}deg)` }} />
                          <circle cx="50" cy="50" r="4" className="tacho-hub" />
                          <text x="50" y="70" className="tacho-rpm-text">{Math.round(rpm)} RPM</text>
                        </svg>
                      </div>

                      {/* Controls */}
                      <div className="d-flex flex-column gap-3 align-items-center">
                        <button
                          type="button"
                          className={`engine-start-btn ${engineStarted ? 'started' : ''}`}
                          onClick={toggleEngine}
                        >
                          {engineStarted ? 'STOP ENGINE' : 'START ENGINE'}
                        </button>
                        
                        <button
                          type="button"
                          className="rev-pedal-btn"
                          disabled={!engineStarted}
                          onMouseDown={() => setRevving(true)}
                          onMouseUp={() => setRevving(false)}
                          onMouseLeave={() => setRevving(false)}
                          onTouchStart={() => setRevving(true)}
                          onTouchEnd={() => setRevving(false)}
                        >
                          REV PEDAL
                        </button>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </main>
  );
}

export default CarDetailPage;
