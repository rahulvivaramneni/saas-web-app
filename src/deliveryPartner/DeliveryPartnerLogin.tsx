import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

const DeliveryPartnerLogin: React.FC = () => {
  return (
    <div>
      <LoginForm userType="delivery-partner" />
    </div>
  );
};

export default DeliveryPartnerLogin;
