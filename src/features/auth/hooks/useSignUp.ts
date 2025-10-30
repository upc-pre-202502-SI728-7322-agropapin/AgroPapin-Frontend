import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUpFarmer, signUpAdministrator } from '../../../services/auth/AuthService';
import { useAuth } from '../context/AuthContext';
import { getDashboardByRole } from '../../../shared/utils/navigation';

export function useSignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSignUp = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    role: 'farmer' | 'cooperative'
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const userData = {
        email,
        password,
        firstName,
        lastName,
        country: 'Peru',
        phone: '+51999999999',
      };

      // registro
      if (role === 'farmer') {
        await signUpFarmer(userData);
      } else {
        await signUpAdministrator(userData);
      }

      // Auto login
      await login(email, password);

      // redirigir al dashboard según el rol
      const dashboard = getDashboardByRole(role);
      navigate(dashboard);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign up failed');
    } finally {
      setIsLoading(false);
    }
  };

  return { handleSignUp, isLoading, error };
}
