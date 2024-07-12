import React, { useState } from 'react';
import userPlaceholder from '../../assets/images/user.png';
import { useAuth } from '../../AuthContext';
import { useParams } from 'react-router-dom';
import useFetchProducts from '../../hooks/useFetchProducts';
import Todo from '../posts/Todo';
import { updateUserImage, updateUserPhone } from '../../services/apiService';
import Modal from '../modal/Modal'; 

const Setting = () => {
  const { userData } = useAuth();
  const { userId } = useParams();
  const { token } = useAuth();
  const { loading, userx, error, setUserx, setError } = useFetchProducts(token);
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [confirmPhoneNumber, setConfirmPhoneNumber] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const [username, setUsername] = useState('');
    const [password, setPassword] = useState(''); 

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
      await handleImageUpload(file);
    } else {
      setPreview(null);
    }
  }; 

  const handleImageUpload = async (file) => {
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);
      const updatedUser = await updateUserImage(token, formData); 
      setUserx(updatedUser);
      setPreview(null);
    } catch (error) {
      console.error('Error uploading image:', error);
      setError(error);
    } finally {
      setUploading(false);
    }
  };

  const handleUpdatePhoneNumber = async () => {
    if (newPhoneNumber !== confirmPhoneNumber) {
      setPhoneError('Phone numbers do not match.');
      return;
    }

    try {
      const updatedUser = await updateUserPhone(token, userId, newPhoneNumber);
      setUserx(updatedUser);
      handleCloseModal();
    } catch (error) {
      console.error('Error updating phone number:', error);
      setPhoneError('Failed to update phone number.');
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setPhoneError('');
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewPhoneNumber('');
    setConfirmPhoneNumber('');
    setPhoneError('');
  };

  if (loading) {
    return <div className="loading"><span></span> <span></span> <span></span></div>;
  }
  if (error) {
    if (error.message === 'Invalid/Expired Token!') {
      return <p>Your session has expired. Please log in again.</p>;
    }
    return <p>Error: {error.message}</p>;
  }
  if (!userData) {
    return <p>No data available</p>;
  }

  return (
    <div className="userProfile">
      <div className="userProfileContainer">
        <div className="profile">
          <div className="userImg">
            <img src={preview || userx.image || userPlaceholder} alt="User" />
            <div className="imageUpload">
              <input type="file" id="fileInput" onChange={handleImageChange} disabled={uploading} />
              <label htmlFor="fileInput">
                <i className="fas fa-edit"></i>
              </label>
            </div>
          </div>
          <div>
            <h3 className="userName">{userData.firstname} {userData.lastname}</h3>
            <p>{userx.email}</p> 
            <div className="phoneUpdate">
              <button onClick={handleOpenModal}>Update Phone Number</button>
            </div>
          </div>
        </div> 
        <div className="userStat"> 
          <div className="content">
            <div className="info">
              <h2><span><i className="fa fa-envelope"></i></span> {userData.username}</h2>
            </div>
          </div>
        </div> 
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2>Update Phone Number</h2>
        <input
          type="text"
          value={newPhoneNumber}
          onChange={(e) => setNewPhoneNumber(e.target.value)}
          placeholder="New Phone Number"
        />
        <input
          type="text"
          value={confirmPhoneNumber}
          onChange={(e) => setConfirmPhoneNumber(e.target.value)}
          placeholder="Confirm Phone Number"
        />
        {phoneError && <p className="error">{phoneError}</p>}
        <div className="mFunction">
          <button onClick={handleUpdatePhoneNumber}>Update</button>
          <button onClick={handleCloseModal} className="cancelBtn">Cancel</button>
        </div>
      </Modal>
    </div>
  );
};

export default Setting;
