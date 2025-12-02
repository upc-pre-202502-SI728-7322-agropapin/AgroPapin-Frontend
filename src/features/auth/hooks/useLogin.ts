import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getDashboardRoute } from '../../../shared/utils/navigation';
import { AxiosError } from 'axios';

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleLogin = async () => {
    setIsLoading(true);
    setError(null);

    try {
      //se redirige al user segun su rol 
      if (user) {
        const dashboard = getDashboardRoute(user.roles || []);
        navigate(dashboard);
      }
    } catch (err) {

      if (err instanceof AxiosError && err.response?.status === 400) {
        setError('Correo o contraseña incorrectos');
      } else {
        setError(err instanceof Error ? err.message : 'Error al iniciar sesión');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { handleLogin, isLoading, error };
}