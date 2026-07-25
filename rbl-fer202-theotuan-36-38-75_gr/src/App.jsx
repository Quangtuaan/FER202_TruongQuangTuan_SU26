import { useEffect, lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'

// Layout components
import Navbar from './components/Navbar'
import Footer from './components/Footer'

// Lazy Load Pages
const HomePage = lazy(() => import('./pages/HomePage'))
const CarListPage = lazy(() => import('./pages/CarListPage'))
const CarDetailPage = lazy(() => import('./pages/CarDetailPage'))
const ComparePage = lazy(() => import('./pages/ComparePage'))
const BrandPage = lazy(() => import('./pages/BrandPage'))
const NewsPage = lazy(() => import('./pages/NewsPage'))
const GalleryPage = lazy(() => import('./pages/GalleryPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))

// Vanh's User Pages
const LoginPage = lazy(() => import('./pages/LoginPage'))
const RegisterPage = lazy(() => import('./pages/RegisterPage'))
const FavoritePage = lazy(() => import('./pages/FavoritePage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const SearchPage = lazy(() => import('./pages/SearchPage'))
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'))

// Protected Route Component
import ProtectedRoute from './components/ProtectedRoute'

import { useAuth } from './context/AuthContext'

function App() {
  const { loading } = useAuth();

  useEffect(() => {
    console.log('App: Scroll reveal observer initialized');
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1, // standard threshold
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        console.log('Reveal element target:', entry.target, 'isIntersecting:', entry.isIntersecting);
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          console.log('Revealed class added to:', entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Initial check for existing items - delay by 150ms to allow layout calculation
    const initialTimer = setTimeout(() => {
      const revealElements = document.querySelectorAll('.reveal-el');
      console.log('Initial reveal elements found after timeout:', revealElements.length);
      revealElements.forEach((el) => {
        console.log('Observing initial element:', el);
        observer.observe(el);
      });
    }, 150);

    // Listen for dynamically added nodes
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            // Delay observation of newly added elements by 100ms
            setTimeout(() => {
              if (node.classList.contains('reveal-el')) {
                console.log('Observing dynamic node:', node);
                observer.observe(node);
              }
              node.querySelectorAll('.reveal-el').forEach((el) => {
                console.log('Observing nested dynamic node:', el);
                observer.observe(el);
              });
            }, 100);
          }
        });
      });
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      clearTimeout(initialTimer);
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return (
    <>
      {loading && (
        <div className="luxury-spinner-overlay">
          <div className="luxury-spinner-logo">ATELIER<span>.</span></div>
          <div className="luxury-spinner-ring"></div>
        </div>
      )}
      <Navbar />
      
      <main style={{ minHeight: '80vh', paddingTop: 'var(--navbar-height)', backgroundColor: '#0b0c10' }}>
        <Suspense fallback={
          <div style={{ minHeight: '80vh', display: 'grid', placeItems: 'center', backgroundColor: '#0b0c10', color: '#fff' }}>
            <div className="text-center">
              <div className="spinner-border text-warning mb-3" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <h5 style={{ color: 'var(--color-gold)', letterSpacing: '2px', textTransform: 'uppercase' }}>Loading Atelier Showcase</h5>
            </div>
          </div>
        }>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cars" element={<CarListPage />} />
            <Route path="/cars/:id" element={<CarDetailPage />} />
            <Route path="/compare" element={<ComparePage />} />
            <Route path="/brands" element={<BrandPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/favorites" element={<FavoritePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </Suspense>
      </main>

      <Footer />
    </>
  )
}

export default App;
