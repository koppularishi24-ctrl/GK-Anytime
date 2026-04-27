/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import AppLayout from './components/layout/AppLayout';
import Home from './pages/Home';
import DateExplorer from './pages/DateExplorer';
import Quiz from './pages/Quiz';
import Auth from './pages/Auth';
import Settings from './pages/Settings';
import About from './pages/About';
import Privacy from './pages/Privacy';
import Contact from './pages/Contact';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="explorer" element={<DateExplorer />} />
            <Route path="quiz" element={<Quiz />} />
            <Route path="auth" element={<Auth />} />
            <Route path="settings" element={<Settings />} />
            <Route path="about" element={<About />} />
            <Route path="privacy" element={<Privacy />} />
            <Route path="contact" element={<Contact />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}
