import React, { useState, useEffect } from 'react';
import useFetchProducts from '../../hooks/useFetchProducts';
import { useNavigate } from 'react-router-dom';
import Modal from '../modal/Modal';
import userImg from '../../images/user.png';

const Notifications = () => {
  const { loading, notify, error, refetch } = useFetchProducts();
  const [activeTab, setActiveTab] = useState('Scheduled');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newNotification, setNewNotification] = useState('');
  const [description, setDescription] = useState('');
  const [notificationType, setNotificationType] = useState('Scheduled');
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [validationError, setValidationError] = useState('');
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null); 
  const [userToDelete, setUserToDelete] = useState(null); 
  const [showModal, setShowModal] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [uploadImage, setUploadImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();
 
  useEffect(() => {
    if (notify && notify.data) {
      setNotifications(notify.data);
    }
  }, [notify]);

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

  if (loading) {
    return <div className="loading"><span></span> <span></span> <span></span></div>;
  }
  if (error) {
    return <p>Error loading notifications: {error.message}</p>; //here
  }

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };


  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewNotification('');
    setDescription('');
    setNotificationType('Scheduled');
    setScheduledDate('');
    setScheduledTime('');
    setValidationError('');
    setSelectedImage(null);
    setIsEditing(false);  // Reset isEditing state
  };

  const handleSaveNotification = () => {
    if (!newNotification) {
      setValidationError('Title is required.');
      return;
    }
    if (!description) {
      setValidationError('Description is required.');
      return;
    }
    if (notificationType === 'Scheduled' && (!scheduledDate || !scheduledTime)) {
      setValidationError('Date and time are required for scheduled notifications.');
      return;
    }

    const formData = new FormData();
    formData.append('title', newNotification);
    formData.append('description', description);
    if (uploadImage) {
      formData.append('image', uploadImage);
    }
    formData.append('type', notificationType);
    formData.append('isActive', 1);
    formData.append('sent_time', notificationType === 'Scheduled' ? `${scheduledDate} ${scheduledTime}` : null);

    const notificationData = {
      title: newNotification,
      description: description,
      image: uploadImage ? uploadImage : null,
      type: notificationType,
      isActive: 1,
      sent_time: notificationType === 'Scheduled' ? `${scheduledDate} ${scheduledTime}` : null,
    };

    const getToken = () => localStorage.getItem('authToken');
    const token = getToken();

    const url = isEditing ? `https://phpstack-1252920-4618688.cloudwaysapps.com/api/admin/notifications/${selectedUser.id}` : 'https://phpstack-1252920-4618688.cloudwaysapps.com/api/admin/notifications';
    const method = isEditing ? 'PUT' : 'POST';

    fetch(url, {
      method: method,
      headers: { 
        'Authorization': `${token}`
      },
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log(`${isEditing ? 'Notification updated' : 'Notification saved'} successfully:`, data);
        setNotifications(prevNotifications => isEditing 
          ? prevNotifications.map(n => n.id === data.id ? data : n)
          : [...prevNotifications, data]);
        handleCloseModal();
        refetch();
      })
      .catch((error) => {
        console.error(`${isEditing ? 'Error updating' : 'Error saving'} notification:`, error);
        setValidationError('Failed to save notification.');
      });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setUploadImage(file);
    }
  };

  const toggleDropdown = (userId) => { 
    setOpenDropdownId(prevOpenDropdownId => prevOpenDropdownId === userId ? null : userId);
  };

  const filteredNotify = notifications.filter(notification =>
    activeTab === 'Scheduled' ? notification.type === 'scheduled' : notification.type === 'instant'
  );

  const handleCreateClick = () => {
    setIsEditing(false);
    setNewNotification('');
    setDescription('');
    setNotificationType('Scheduled');
    setScheduledDate('');
    setScheduledTime('');
    setSelectedImage(null);
    setUploadImage(null);
    setIsModalOpen(true);
  }; 

  const handleEditClick = (notification) => {
  setNewNotification(notification.title);
  setDescription(notification.description);  
  setScheduledDate(notification.sent_time ? notification.sent_time.split('T')[0] : ''); // Extract date part
  setScheduledTime(notification.sent_time ? notification.sent_time.split('T')[1].split('.')[0] : ''); // Extract time part
  setSelectedImage(notification.image ? `https://phpstack-1252920-4618688.cloudwaysapps.com/img/${notification.image}` : null);
  setUploadImage(null);
  setIsEditing(true);
  setIsModalOpen(true);
  setSelectedUser(notification);
};


  return (
    <>
      <div className="custHome notifications">
        <div className="container">
          <div className="tabs">
            <button
              onClick={() => handleTabClick('Scheduled')}
              className={activeTab === 'Scheduled' ? 'active' : ''}
            >
              Scheduled
            </button>
            <button
              onClick={() => handleTabClick('Instant')}
              className={activeTab === 'Instant' ? 'active' : ''}
            >
              Instant
            </button>
            <button onClick={handleCreateClick} className="createNotification"><i className="fa fa-plus"></i> Create Notification</button>
          </div>
          <div className="deviceComponent">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Image</th>
                  {activeTab === "Scheduled" && <th className="text-center">Action</th>}
                </tr>
              </thead>
              <tbody>
                {filteredNotify.map((notification) => (
                  <tr key={notification.id}>
                    <td>{notification.id}</td>
                    <td>{notification.title}</td>
                    <td>{notification.description}</td>
                    <td>{notification.isActive === 1 ? "Active" : "Inactive"}</td>
                    <td>
                      <img
                        src={notification.image ? `https://phpstack-1252920-4618688.cloudwaysapps.com/img/${notification.image}` : userImg}
                        alt="User"
                        width="50"
                        height="50"
                      />
                    </td>
                    {activeTab === "Scheduled" &&
                      <td className="text-center">
                        <div className="dropdown">
                          <button className="dropbtn" onClick={() => toggleDropdown(notification.id)}>
                            <i className="fa-solid fa-ellipsis"></i>
                          </button>
                          {openDropdownId === notification.id && (
                            <div className="dropdown-content">
                              <button onClick={() => handleEditClick(notification)} className="edit_a">Edit</button> 
                            </div>
                          )}
                        </div>
                      </td> 
                    }
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2>{isEditing ? 'Update Notification' : 'Create New Notification'}</h2>
        <select value={notificationType} onChange={(e) => setNotificationType(e.target.value)}>
          <option value="Scheduled">Scheduled</option>
          <option value="Instant">Instant</option>
        </select>
        <input
          type="text"
          value={newNotification}
          onChange={(e) => setNewNotification(e.target.value)}
          placeholder="Title"
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        {notificationType === 'Scheduled' && (
          <>
            <input
              type="date"
              value={scheduledDate}
              onChange={(e) => setScheduledDate(e.target.value)}
              placeholder="Select date"
            />
            <input
              type="time"
              value={scheduledTime}
              onChange={(e) => setScheduledTime(e.target.value)}
              placeholder="Select time"
            />
          </>
        )}
        <div className="notificationImage">
          <div className="notificationImageData">
            <span>Upload image</span>
            {selectedImage && (
              <div className="imagePreview">
                <img src={selectedImage} alt="Selected" width="100" height="100" />
              </div>
            )}
          </div>
          <div className="notificationFile">
            <i className="fa fa-edit"></i>
            <input type="file" name="uploadImage" onChange={handleImageChange} />
          </div>
        </div>
        {validationError && <p className="error">{validationError}</p>}
        <div className="mFunction">
          <button onClick={handleSaveNotification}>
            {isEditing ? 'Update' : 'Save'}
          </button>
          <button onClick={handleCloseModal} className="cancelBtn">Cancel</button>
        </div>
      </Modal>
    </>
  );
};

export default Notifications;
