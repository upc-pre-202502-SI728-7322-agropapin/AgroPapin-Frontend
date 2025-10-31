import axiosClient from '../api/axiosClient';

// obtener datos del farmer por userId
export const getFarmerData = async (userId: string) => {
  const { data } = await axiosClient.get(`/farmer/user/${userId}`);
  return data;
};
