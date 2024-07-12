const API_BASE_URL = 'https://phpstack-1252920-4618688.cloudwaysapps.com/api';

const getToken = () => {
  const token = localStorage.getItem('authToken'); 
  return token;
};

export const fetchWithToken = async (url) => {
  const token = getToken(); 
  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch');
  }

  return response.json();
};

export const fetchEmployees = async () => {
  try {
    const token = getToken(); 

    if (!token) {
      throw new Error('No token found in localStorage');
    }

    const response = await fetch(`${API_BASE_URL}/admin/dashboard`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch active user');
    }

    const result = await response.json();
    return  result.totalUser.rows || []; 
  } catch (error) {
    console.error('Failed to fetch employees:', error.message);
    throw error;
  }
};


export const fetchDevices = async () => {
  try {
    const token = getToken(); 

    if (!token) {
      throw new Error('No token found in localStorage');
    }

    const response = await fetch(`${API_BASE_URL}/admin/dashboard`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch active user');
    }

    const result = await response.json();
    return  result.totalDevice.rows || []; 
  } catch (error) {
    console.error('Failed to fetch employees:', error.message);
    throw error;
  }
};

export const fetchActiveUser = async () => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('No token found in localStorage');
    }
    const response = await fetch(`${API_BASE_URL}/admin/dashboard`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch active user');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Failed to fetch active user:', error.message);
    throw error;
  }
};


export const fetchUserById = async (userUuid) => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('No token found in localStorage');
    }
    const response = await fetch(`${API_BASE_URL}/admin/user/${userUuid}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch active user');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Failed to fetch active user:', error.message);
    throw error;
  }
};

export const deleteUser = async (userUuid) => {
  try {
    const token = getToken(); 

    if (!token) {
      throw new Error('No token found in localStorage');
    }

    const result = await fetch(`${API_BASE_URL}/admin/user/${userUuid}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
      },
    });

    if (!result.ok) {
      throw new Error('Failed to delete user');
    }

    return result;
  } catch (error) {
    console.error('Failed to delete user:', error.message);
    throw error;
  }
};


export const updateUserImage = async () => {
  try {
    const token = getToken(); 

    if (!token) {
      throw new Error('No token found in localStorage');
    }

    const result = await fetch(`${API_BASE_URL}/users/`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
      },
    });

    return result.users;
  } catch (error) {
    console.error('Failed to update user image:', error.message);
    throw error;
  }
};

export const updateUserPhone = async (userId, newPhoneNumber) => {
  try {
    const token = getToken(); 

    if (!token) {
      throw new Error('No token found in localStorage');
    }

    const response = await fetch(`${API_BASE_URL}/${userId}/phone`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
      },
      body: JSON.stringify({ phone: newPhoneNumber }),
    });

    const result = await response.json();
    return result.user;
  } catch (error) {
    console.error('Failed to update phone number:', error.message);
    throw error;
  }
};

 export const fetchUser = async () => {
  try {
    const token = getToken(); 

    if (!token) {
      throw new Error('No token found in localStorage');
    }

    const result = await fetch(`${API_BASE_URL}/admin/dashboard`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
      },
    });

    return result;
  } catch (error) {
    console.error('Failed to fetch user:', error.message);
    throw error;
  }
};


export const fetchNotification = async () => {
  try {
    const token = getToken(); 

    if (!token) {
      throw new Error('No token found in localStorage');
    }

    const response = await fetch(`${API_BASE_URL}/admin/notifications`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
      },
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Failed to fetch user:', error.message);
    throw error;
  }
};
 