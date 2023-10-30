import React, { useState } from 'react';
import axios from 'axios';

const CustomerOnboarding: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Make a POST request to your backend API to save the customer data
      await axios.post('https://your-api-url.com/api/customers', formData);

      // Clear the form after successful submission
      setFormData({
        name: '',
        email: '',
        address: '',
      });

      // You can also provide user feedback here (e.g., show a success message)
    } catch (error) {
      // Handle errors (e.g., show an error message to the user)
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Customer Onboarding</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <input
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default CustomerOnboarding;
