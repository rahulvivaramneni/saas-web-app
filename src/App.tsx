import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CustomerLogin from './customer/CustomerLogin';
import DeliveryPartnerLogin from './deliveryPartner/DeliveryPartnerLogin';
import CustomerDashboard from './customer/CustomerDashboard';
import DeliveryPartnerDashboard from './deliveryPartner/DeliveryPartnerDashboard';
import Navbar from './components/Navbar';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/customer" element={<CustomerLogin />} />
        <Route path="/delivery-partner" element={<DeliveryPartnerLogin />} />
        <Route path="/customer/dashboard" element={<CustomerDashboard />} />
        <Route path="/delivery-partner/dashboard" element={<DeliveryPartnerDashboard />} />
      </Routes>
    </Router>
  );
};

const Home: React.FC = () => {
  return (
    <div>
      <button>
        <Link to="/customer">Login as Customer</Link>
      </button>
      <button>
        <Link to="/delivery-partner">Login as Partner</Link>
      </button>
    </div>
  );
};

export default App;
