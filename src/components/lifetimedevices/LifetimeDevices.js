import React, { useState, useEffect } from 'react';
import useFetchProducts from '../../hooks/useFetchProducts';

function LifetimeDevices() {

  const { dashd, loading, error } = useFetchProducts(); 
 
  if (loading) {
    return <div className="loading"><span></span> <span></span> <span></span></div>;
  }

  if (error) {
    return <p>Error loading products: {error.message}</p>;
  }
  
  return (
    <> 
      <div className="custUser">
        <span><i className="fa fa-mobile"></i></span>
        <h2>lifetime Devices</h2>
        <h1>{dashd.totalDevice.count}</h1>
      </div>
    </>
  );
}
export default LifetimeDevices; 