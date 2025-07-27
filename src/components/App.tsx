import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home/Home';
import About from './About/About';
import NotFound from './pages/NotFound';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';

export default function App() {
  return (
    <ErrorBoundary>
      <Router>
        <nav className="bg-slate-800 text-white p-4 flex justify-center gap-8">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/about" className="hover:underline">
            About
          </Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}
