import React, { useState, useEffect } from 'react';
import useFetchProducts from '../../hooks/useFetchProducts';

function ActiveUsers() {
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
        <p className="tool">Active</p>
        <span><i className="fa fa-user"></i> </span>
        <h2>Active Users</h2> 
        <h1>{dashd.activeUser}</h1>
      </div>
    </>
  );
}

export default ActiveUsers;
