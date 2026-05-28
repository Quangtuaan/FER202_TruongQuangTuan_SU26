import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppNavbar from './components/AppNavbar';
import RegistrationForm from './pages/RegistrationForm';
import Home from './pages/Home';
import PostList from './pages/PostList';
import PostDetail from './pages/PostDetail';
import About from './pages/About';
import NotFound from './pages/NotFound';

function BlogLayout({ children }) {
  return (
    <>
      <AppNavbar />
      {children}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RegistrationForm />} />

        <Route
          path="/home"
          element={
            <BlogLayout>
              <Home />
            </BlogLayout>
          }
        />

        <Route
          path="/posts"
          element={
            <BlogLayout>
              <PostList />
            </BlogLayout>
          }
        />

        <Route
          path="/posts/:id"
          element={
            <BlogLayout>
              <PostDetail />
            </BlogLayout>
          }
        />

        <Route
          path="/about"
          element={
            <BlogLayout>
              <About />
            </BlogLayout>
          }
        />

        <Route
          path="*"
          element={
            <BlogLayout>
              <NotFound />
            </BlogLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;