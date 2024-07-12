// Users.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetchProducts from '../../hooks/useFetchProducts';
import { deleteUser, fetchUserById } from '../../services/apiService';
import Modalx from '../modal/Modaluser';  
import userImg from '../../images/user.png';
import { useUser } from './UserContext';  

const Users = ({ hideActions }) => {
  const { products: initialProducts, loading, error } = useFetchProducts();
  const [products, setProducts] = useState([]);
  const [visibleUsers, setVisibleUsers] = useState(5);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const { setSelectedUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    setProducts(initialProducts);
  }, [initialProducts]); 

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openDropdownId && !event.target.closest('.dropdown')) {
        setOpenDropdownId(null);
      }
    }; 
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openDropdownId]);

  const handleViewMore = () => {
    setVisibleUsers(prevVisibleUsers => prevVisibleUsers + 10);
  }; 

  const handleEditClick = async (userUuid) => { 
    try { 
      const user = await fetchUserById(userUuid);   
      setSelectedUser(user); 
      navigate(`/userProfile/${userUuid}`); 
    } catch (error) { 
      console.error('Error fetching user details:', error); 
    }  
  }; 

  const handleDeleteClick = (userUuid) => {
    setUserToDelete(userUuid);
    setShowModal(true);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const confirmDelete = async () => {
    try {
      await deleteUser(userToDelete);
      setProducts((prevProducts) => prevProducts.filter(user => user.uuid !== userToDelete));
      setShowModal(false);
      setUserToDelete(null);
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  const toggleDropdown = (userId) => { 
    setOpenDropdownId(prevOpenDropdownId => prevOpenDropdownId === userId ? null : userId);
  };

  if (loading) {
    return <div className="loading"><span></span> <span></span> <span></span></div>;
  }

  if (error) {
    return <p>Error loading products: {error.message}</p>; //
  }

  return (
    <div className="productList emplyoeeList usersMain">
      <h1 className="title">Lifetime users</h1>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th> 
              <th>Active</th> 
              <th>Register At</th> 
              <th>Updated At</th>
              <th>Image</th>
              {!hideActions && <th className="text-center">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {products.slice(0, visibleUsers).map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.firstname} {user.lastname}</td>
                <td>{user.username}</td> 
                <td>{user.isActive}</td>
                <td>{user.createdAt ? formatDate(user.createdAt) : 'Null'}</td> 
                <td>{user.updatedAt ? formatDate(user.updatedAt) : 'Null'}</td>
                <td>
                  <img
                    src={user.image ? `https://phpstack-1252920-4618688.cloudwaysapps.com/img/${user.image}` : userImg}
                    alt="User"
                    width="50"
                    height="50"
                  />
                </td>
                {!hideActions && (
                  <td className="text-center">
                    <div className="dropdown">
                      <button className="dropbtn" onClick={() => toggleDropdown(user.uuid)}>
                        <i className="fa-solid fa-ellipsis"></i>
                      </button>
                      {openDropdownId === user.uuid && (
                        <div className="dropdown-content">
                          <button onClick={() => handleEditClick(user.uuid)} className="edit_a">Edit</button>
                          <button onClick={() => handleDeleteClick(user.uuid)} className="delete_a">Delete</button>  
                        </div>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {visibleUsers < products.length && (
        <button onClick={handleViewMore} className="button_a">View More</button>
      )}
      <Modalx
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={confirmDelete}
      >
        <h2>Are you sure you want to delete this user?</h2>
      </Modalx>
    </div>
  );
};

export default Users;
