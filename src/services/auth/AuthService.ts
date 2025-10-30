import axiosClient from '../api/axiosClient';



// iniciar sesión
export const signIn = async (email: string, password: string) => {
  const { data } = await axiosClient.post(`/api/v1/authentication/sign-in`, {
    email,
    password,
  });
  return data;
};

// registro agricultor
export const signUpFarmer = async (userData: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  country: string;
  phone: string;
}) => {
  const { data } = await axiosClient.post(
    `/api/v1/authentication/sign-up/farmer`,
    userData
  );
  return data;
};

// registro administrador
export const signUpAdministrator = async (userData: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  country: string;
  phone: string;
}) => {
  const { data } = await axiosClient.post(
    `/api/v1/authentication/sign-up/administrator`,
    userData
  );
  return data;
};
