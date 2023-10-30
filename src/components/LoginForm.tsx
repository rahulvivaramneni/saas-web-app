import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLoginEndpoint } from "../endpoint/endpoint";

interface LoginFormProps {
  userType: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ userType }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {

    fetch(getLoginEndpoint(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        if (response.ok) {
          // Authentication successful, parse the token from the response
          response.json().then(data => {
            const authToken = data.token; // Adjust this based on your server response

            // Store the token in localStorage
            localStorage.setItem('authToken', authToken);

            // Redirect to the respective dashboard
            if (userType === 'customer') {
              navigate('/customer/dashboard');
            } else if (userType === 'delivery-partner') {
              navigate('/delivery-partner/dashboard');
            }
          });
        } else {
          console.error('Authentication failed');
        }
      })
      .catch((error) => {
        console.error('Error while sending authentication request:', error);
      });
    // mocking to avoid api call
    if (userType === 'customer') {
       navigate('/customer/dashboard');
        } else if (userType === 'delivery-partner') {
       navigate('/delivery-partner/dashboard');
      } 
  };

  return (
    <div>
    <h2>Login as {userType}</h2>
    <div style={{ display: 'flex', flexDirection: 'column', width:"40%" }}>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
    </div>
    <button onClick={handleLogin}>Login</button>
  </div>
  );
};

export default LoginForm;
