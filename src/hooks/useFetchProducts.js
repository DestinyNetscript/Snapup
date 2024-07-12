import { useState, useEffect } from 'react';
import { fetchEmployees, fetchNotification, fetchDevices, fetchUser, fetchActiveUser } from '../services/apiService';

const useFetchProducts = () => {
  const [products, setProducts] = useState([]);
  const [dashd, setDashd] = useState([]);
  const [device, setDevice] = useState([]);
  const [notify, setNotify] = useState([]);
  const [userx, setUserx] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await fetchEmployees();
      const devices = await fetchDevices();
      const notifications = await fetchNotification();
      const dashdata = await fetchActiveUser();
      const user = await fetchUser();

      setProducts(data);
      setDevice(devices);
      setNotify(notifications);
      setDashd(dashdata);
      setUserx(user);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const refetch = () => {
    fetchProducts();
  };

  return { products, loading, error, userx, device, notify, dashd, refetch };
};

export default useFetchProducts;
