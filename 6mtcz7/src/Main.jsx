import React, { useState, useEffect } from "react";
import EditCustomer from "./Edit";
import CreateCustomer from "./Create";

const CustomerMain = ({ bearerToken }) => {
  const [mode, setMode] = useState("list");
  const [customDataToEdit, setCustomerDataToEdit] = useState({});
  const [message, setMessage] = useState('');
  const [customers, setCustomers] = useState([
    {
      id: 1,
      first_name: "John",
      last_name: "Doe",
      street: "123 Main St",
      address: "Apt 1",
      city: "San Francisco",
      state: "CA",
      email: "john@doe.com",
      phone: "123-456-7890",
    },
    {
      id: 2,
      first_name: "Jane",
      last_name: "Doe",
      street: "123 Main St",
      address: "Apt 2",
      city: "San Francisco",
      state: "CA",
      email: "jane@doe.com",
      phone: "123-456-7891",
    },
  ]);

  useEffect(() => {
    // Define the API endpoint for getting the customer list
    const apiEndpoint =
      "https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp";

    // Define the request headers with the Bearer token
    const apiHeaders = {
      Authorization: `Bearer ${bearerToken}`,
    };

    // Fetch the customer list data
    fetch(apiEndpoint, { headers: apiHeaders })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`API request failed with status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setCustomers(data);
      })
      .catch((error) => {
        console.error("Error fetching customer list:", error);
      });
  }, [bearerToken]);

  const handleDeleteCustomer = (uuid) => {
    // Define the API endpoint for deleting a customer
    const apiEndpoint =
      "https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=delete";

    // Define the request headers with the Bearer token
    const apiHeaders = {
      Authorization: `Bearer ${bearerToken}`,
      "Content-Type": "application/json",
    };

    // Fetch the customer data
    fetch(`${apiEndpoint}&uuid=${uuid}`, {
      method: "POST",
      headers: apiHeaders,
    })
      .then((response) => {
        if (response.status === 200) {
          setMessage("Customer deleted successfully");
          // Remove the deleted customer from the list
          setCustomers(customers.filter((customer) => customer.uuid !== uuid));
        } else if (response.status === 500) {
          setMessage("Error: Customer not deleted");
        } else if (response.status === 400) {
          setMessage("Error: UUID not found");
        } else {
          setMessage("An error occurred while deleting the customer");
        }
      })
      .catch((error) => {
        setMessage("An error occurred while deleting the customer");
        console.error("Error deleting customer:", error);
      });
  };

  const listDOM = (
    <div>
      <h2>Customer List</h2>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Street</th>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => (
            <tr key={index}>
              <td>{customer.first_name}</td>
              <td>{customer.last_name}</td>
              <td>{customer.street}</td>
              <td>{customer.address}</td>
              <td>{customer.city}</td>
              <td>{customer.state}</td>
              <td>{customer.email}</td>
              <td>{customer.phone}</td>
              <td>
                <button onClick={() => handleDeleteCustomer(customer.uuid)}>
                  Delete
                </button>
              </td>
              <td>
                <button
                  onClick={() => {
                    setCustomerDataToEdit(customer);
                    setMode("edit");
                  }}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => setMode("create")}>Add New Customer</button>
    </div>
  );

  return (
    <>
      {mode === "list" && listDOM}
      <div>{message}</div>
      {mode === "edit" && (
        <EditCustomer bearerToken customerData={customDataToEdit} setMode />
      )}
      {mode === "create" && <CreateCustomer bearerToken setMode />}
    </>
  );
};

export default CustomerMain;
