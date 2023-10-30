import React, { useState } from 'react';

interface Shipment {
  productName: string;
  deliveryAddress: string;
  customerName: string;
  mobileNumber: string;
}

const CustomerDashboard: React.FC = () => {
  const [shipments, setShipments] = useState<Shipment[]>([]); // wip: fetch the existing shipments from an API
  const [newShipment, setNewShipment] = useState<Shipment>({
    productName: '',
    deliveryAddress: '',
    customerName: '',
    mobileNumber: '',
  });

  const handleCreateShipment = async () => {
    if (newShipment.productName && newShipment.deliveryAddress && newShipment.customerName && newShipment.mobileNumber) {
      try {
        const apiUrl = 'https://xyz.com'; // wip: relace with original endpoint

        // Make a POST request with the shipment data
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newShipment),
        });

        if (response.ok) {
          //after successfully created shipment
          setShipments([...shipments, newShipment]);
          setNewShipment({
            productName: '',
            deliveryAddress: '',
            customerName: '',
            mobileNumber: '',
          });
        } else {
          // Handle API error here
          console.error('Failed to create shipment');
        }
      } catch (error) {
        console.error('Error creating shipment:', error);
      }
      // mocking api util api is ready
       setShipments([...shipments, newShipment]);
          setNewShipment({
            productName: '',
            deliveryAddress: '',
            customerName: '',
            mobileNumber: '',
          });
    }
  };

  return (
    <div>
      <h2>Customer Dashboard</h2>

      {/* Create Shipments */}
      <div>
        <h3>Create Shipments</h3>
        <div>
          <label>Product Name:</label>
          <input
            type="text"
            value={newShipment.productName}
            onChange={(e) => setNewShipment({ ...newShipment, productName: e.target.value })}
          />
        </div>
        <div>
          <label>Delivery Address:</label>
          <input
            type="text"
            value={newShipment.deliveryAddress}
            onChange={(e) => setNewShipment({ ...newShipment, deliveryAddress: e.target.value })}
          />
        </div>
        <div>
          <label>Customer Name:</label>
          <input
            type="text"
            value={newShipment.customerName}
            onChange={(e) => setNewShipment({ ...newShipment, customerName: e.target.value })}
          />
        </div>
        <div>
          <label>Mobile Number:</label>
          <input
            type="text"
            value={newShipment.mobileNumber}
            onChange={(e) => setNewShipment({ ...newShipment, mobileNumber: e.target.value })}
          />
        </div>
        <button onClick={handleCreateShipment}>Create Shipment</button>
      </div>

      {/* View Shipments */}
      <div>
        <h3>View Shipments</h3>
        <ul>
          {shipments.map((shipment, index) => (
            <li key={index}>
              Product Name: {shipment.productName}<br />
              Delivery Address: {shipment.deliveryAddress}<br />
              Customer Name: {shipment.customerName}<br />
              Mobile Number: {shipment.mobileNumber}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CustomerDashboard;
