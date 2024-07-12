import React, { useState, useEffect } from 'react';
import useFetchProducts from '../../hooks/useFetchProducts';
import { useNavigate } from 'react-router-dom';

const Todo = () => {
  const { loading, device, error } = useFetchProducts();  

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`; 
  };


  if (loading) {
    return <div className="loading"><span></span> <span></span> <span></span></div>;
  }
  if (error) {
    return <p>Error loading products: {error.message}</p>;
  }

  return (
    <div className="productList emplyoeeList">
    <h1 className="title">Device List</h1>
      <table className="dashTable">
        <thead>
          <tr>
            <th>ID</th>
            <th>Device Name</th>
            <th>Device Model</th>
            <th>Device Company</th>
            <th>Date</th>
            <th>Active</th>
          </tr>
        </thead>
        <tbody> 
          {device.map((totalDevice) => (
              <tr key={totalDevice.id}>
                <td>{totalDevice.id}</td>
                <td>{totalDevice.deviceName}</td>
                <td>{totalDevice.deviceModel} </td>
                <td>{totalDevice.deviceCompany}</td>
                <td>{formatDate(totalDevice.createdAt)}</td>
                <td>{totalDevice.isActive ? "Updated" : "Not Updated"}</td> 
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Todo;
