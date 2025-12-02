import axiosClient from '../api/axiosClient';



// iniciar sesión
export const signIn = async (email: string, password: string) => {
  const { data } = await axiosClient.post(`/authentication/sign-in`, {
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
    `/authentication/sign-up/farmer`,
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
    `/authentication/sign-up/administrator`,
    userData
  );
  return data;
};

// petición al webhook para guardar al usuario registrado en la bd local
export const registerUserWebhook = async (webhookData: {auth0UserId: string;email: string;roleType: string;}) => {
  const { data } = await axiosClient.post(`http://localhost:8080/internal/webhooks/user-registered`, {
    auth0_user_id: webhookData.auth0UserId,
    email: webhookData.email,
    role_type: webhookData.roleType,
  });
  return data;
};
