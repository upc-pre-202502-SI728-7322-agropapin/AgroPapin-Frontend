import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getDashboardRoute } from '../../../shared/utils/navigation';
import { AxiosError } from 'axios';

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      await login(email, password);

      // obtener el usuario del local storage y redirigir según su rol
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const dashboard = getDashboardRoute(user.roles || []);
      navigate(dashboard);
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