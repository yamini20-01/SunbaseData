import React, { useState, useEffect } from 'react';

const EditCustomer = ({ bearerToken, customerData, setMode }) => {
  const [customer, setCustomer] = useState(customerData);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setCustomer(customerData);
  }, [customerData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Define the API endpoint for updating a customer
    const apiEndpoint = 'https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp';
    const { uuid, ...customerDetails } = customer;

    // Define the request headers with the Bearer token
    const apiHeaders = {
      Authorization: `Bearer ${bearerToken}`,
      'Content-Type': 'application/json',
    };

    // Fetch the customer data
    fetch(`${apiEndpoint}?cmd=update&uuid=${uuid}`, {
      method: 'POST',
      headers: apiHeaders,
      body: JSON.stringify(customerDetails),
    })
      .then((response) => {
        if (response.status === 200) {
          setMessage('Customer details updated successfully');
          setMode('list');
        } else if (response.status === 500) {
          setMessage('UUID not found');
        } else if (response.status === 400) {
          setMessage('Body is empty');
        } else {
          setMessage('An error occurred while updating customer details');
        }
      })
      .catch((error) => {
        setMessage('An error occurred while updating customer details');
        console.error('Error updating customer details:', error);
      });
  };

  return (
    <div>
      <h2>Edit Customer Details</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          
          <input type="text" placeholder='First Name' name="first_name" value={customer.first_name} onChange={handleInputChange} />
        </div>
        <div>
          <input type="text" placeholder='Last Name' name="last_name" value={customer.last_name} onChange={handleInputChange} />
        </div>
        <div>
          <input placeholder='Street' type="text" name="street" value={customer.street} onChange={handleInputChange} />
        </div>
        <div>
          <input type="text" placeholder='Address' name="address" value={customer.address} onChange={handleInputChange} />
        </div>
        <div>
          <input placeholder='City' type="text" name="city" value={customer.city} onChange={handleInputChange} />
        </div>
        <div>
          <input type="text" placeholder='State' name="state" value={customer.state} onChange={handleInputChange} />
        </div>
        <div>
          <input type="email" placeholder='Email' name="email" value={customer.email} onChange={handleInputChange} />
        </div>
        <div>
          <input type="text" placeholder='Phone' name="phone" value={customer.phone} onChange={handleInputChange} />
        </div>
        <button type="submit">Update Customer</button>
      </form>
      <div>{message}</div>
    </div>
  );
};

export default EditCustomer;
