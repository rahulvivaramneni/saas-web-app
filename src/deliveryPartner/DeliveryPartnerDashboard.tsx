import React, { useState } from 'react';
import { getupdateShipmentEndpoint } from "../endpoint/endpoint";
import './DeliveryPartnerDashboard.css';

interface Shipment {
  id: number;
  productName: string;
  deliveryAddress: string;
  customerName: string;
  mobileNumber: string;
  status: string;
}

const DeliveryPartnerDashboard: React.FC = () => {
  const initialShipments: Shipment[] = [
    {
      id: 1,
      productName: 'Product 1',
      deliveryAddress: '123 Main St',
      customerName: 'Customer A',
      mobileNumber: '123-456-7890',
      status: 'Pending',
    },
    {
      id: 2,
      productName: 'Product 2',
      deliveryAddress: '456 Elm St',
      customerName: 'Customer B',
      mobileNumber: '987-654-3210',
      status: 'In Progress',
    },
  ];
  const [shipments, setShipments] = useState<Shipment[]>(initialShipments);

  const handleUpdateStatus = (id: number, newStatus: string) => {
    // Find the shipment to update
    const shipmentToUpdate = shipments.find((shipment) => shipment.id === id);

    if (shipmentToUpdate) {
      // Update the status locally
      const updatedShipments = shipments.map((shipment) =>
        shipment.id === id ? { ...shipment, status: newStatus } : shipment
      );
      setShipments(updatedShipments);

      // Send a POST request to update the status on the server
      fetch(getupdateShipmentEndpoint(id), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      })
        .then((response) => {
          if (!response.ok) {
            // Handle API error here
            console.error('Failed to update shipment status');
            // Rollback the status change if there was an error
            setShipments((prevShipments) =>
              prevShipments.map((shipment) =>
                shipment.id === id ? { ...shipment, status: shipmentToUpdate.status } : shipment
              )
            );
          }
        })
        .catch((error) => {
          console.error('Error updating shipment status:', error);
        });
    }
  };

  return (
    <div>
      <h2>Delivery Partner Dashboard</h2>

      {/* View Shipments */}
      <div>
        <h3>View Shipments</h3>
        <div className="shipment-cards-container">
          {shipments.map((shipment) => (
            <div key={shipment.id} className="shipment-card">
              <p>Product Name: {shipment.productName}</p>
              <p>Delivery Address: {shipment.deliveryAddress}</p>
              <p>Customer Name: {shipment.customerName}</p>
              <p>Mobile Number: {shipment.mobileNumber}</p>
              <p>Status: 
                <select
                  value={shipment.status}
                  onChange={(e) => handleUpdateStatus(shipment.id, e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Dispatched">Dispatched</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                </select>
                <button onClick={() => handleUpdateStatus(shipment.id, shipment.status)}>Save</button>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeliveryPartnerDashboard;
