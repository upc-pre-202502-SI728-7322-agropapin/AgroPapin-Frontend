import axiosClient from '../api/axiosClient';

// obtener datos del farmer 
export const getFarmerData = async () => {
  const { data } = await axiosClient.get('/farmer/me');
  return data;
};
