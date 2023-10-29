import React, { useState } from 'react';

const CreateCustomer = ({ bearerToken, setMode }) => {
  const [customer, setCustomer] = useState({
    first_name: '',
    last_name: '',
    street: '',
    address: '',
    city: '',
    state: '',
    email: '',
    phone: ''
  });
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Define the API endpoint for creating a new customer
    const apiEndpoint = 'https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp';

    // Check if the required fields are provided
    if (!customer.first_name || !customer.last_name) {
      setMessage('First Name and Last Name are required');
      return;
    }

    // Define the request headers with the Bearer token
    const apiHeaders = {
      Authorization: `Bearer ${bearerToken}`,
      'Content-Type': 'application/json',
    };

    // Fetch the customer data
    fetch(`${apiEndpoint}?cmd=create`, {
      method: 'POST',
      headers: apiHeaders,
      body: JSON.stringify(customer),
    })
      .then((response) => {
        if (response.status === 201) {
          setMessage('Customer created successfully');
          setMode('list');
        } else if (response.status === 400) {
          setMessage('First Name or Last Name is missing');
        } else {
          setMessage('An error occurred while creating the customer');
        }
      })
      .catch((error) => {
        setMessage('An error occurred while creating the customer');
        console.error('Error creating customer:', error);
      });
  };

  return (
    <div>
      <h2>Create New Customer</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <input placeholder='First Name' type="text" name="first_name" value={customer.first_name} onChange={handleInputChange} />
        </div>
        <div>
          <input placeholder='Last Name' type="text" name="last_name" value={customer.last_name} onChange={handleInputChange} />
        </div>
        <div>
          <input placeholder='Street' type="text" name="street" value={customer.street} onChange={handleInputChange} />
        </div>
        <div>
          <input placeholder='Address' type="text" name="address" value={customer.address} onChange={handleInputChange} />
        </div>
        <div>
          <input placeholder='City' type="text" name="city" value={customer.city} onChange={handleInputChange} />
        </div>
        <div>
          <input placeholder='State' type="text" name="state" value={customer.state} onChange={handleInputChange} />
        </div>
        <div>
          <input placeholder='Email' type="email" name="email" value={customer.email} onChange={handleInputChange} />
        </div>
        <div>
          <input placeholder='Phone' type="text" name="phone" value={customer.phone} onChange={handleInputChange} />
        </div>
        <button type="submit">Create Customer</button>
      </form>
      <div>{message}</div>
    </div>
  );
};

export default CreateCustomer;
