
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Search from './pages/Search';
import Dashboard from './pages/Dashboard';
import Blog from './pages/Blog';
import Faq from './pages/Faq';
import VehicleDetails from './pages/VehicleDetails';
import ChatBot from './components/ChatBot';
import { UserRole } from './types';

// ScrollToTop component to ensure page starts at top on navigation
const ScrollToTopWrapper = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

const App: React.FC = () => {
  const [userRole, setUserRole] = useState<UserRole>(UserRole.CLIENT);

  return (
    <Router>
      <ScrollToTopWrapper />
      <Layout userRole={userRole} onRoleChange={setUserRole}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/vehicle/:id" element={<VehicleDetails />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/dashboard" element={<Dashboard role={userRole} />} />
        </Routes>
        <ChatBot />
      </Layout>
    </Router>
  );
};

export default App;
