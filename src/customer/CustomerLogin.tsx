import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

const CustomerLogin: React.FC = () => {
  return (
    <div>
      <LoginForm userType="customer" />
    </div>
  );
};


export default CustomerLogin;
