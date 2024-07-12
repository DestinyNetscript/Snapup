 
import React, { useState, useEffect } from 'react';
import useFetchProducts from '../../hooks/useFetchProducts';

function LifetimeUser() {
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
        <span><i className="fa fa-user"></i> </span>
        <h2>Total User</h2> 
        <h1>{dashd.totalUser.count}</h1>
      </div>
    </>
  );
}

export default LifetimeUser;
