import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { setAuth0TokenGetter } from '../../../services/api/axiosClient';
import { registerUserWebhook } from '../../../services/auth/AuthService';
import type { User, AuthContextType } from '../types/auth.types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user: auth0User, isAuthenticated, isLoading: auth0Loading, getAccessTokenSilently, logout: auth0Logout } = useAuth0();


  useEffect(() => {
    setAuth0TokenGetter(getAccessTokenSilently);
  }, [getAccessTokenSilently]);

  useEffect(() => {
    const syncUser = async () => {
    
      if (isAuthenticated && auth0User) {
        try {
          const token = await getAccessTokenSilently();
          
          // decodificar el token para obtener el rol
          const payload = JSON.parse(atob(token.split('.')[1]));
          
          const roles = payload['https://agropapin-api/roles'] || [];

          const userData: User = {
            id: auth0User.sub || '',
            email: auth0User.email || '',
            roles: roles,
            firstName: auth0User.given_name,
            lastName: auth0User.family_name,
          };

          localStorage.setItem('user', JSON.stringify(userData));
          localStorage.setItem('token', token);
          setUser(userData);

          // llamando al webhook para que guarde al nuevo usuario en la bd
          try {
            await registerUserWebhook({
              auth0UserId: auth0User.sub || '',
              email: auth0User.email || '',
              roleType: roles[0] || '',
            });
            console.log('Usuario guardado en la base de datos');
          } catch (webhookError) {
            console.error('Error al sincronizar usuario:', webhookError);
          }
        } catch (error) {
          console.error('error:', error);
        }
      } else if (!isAuthenticated) {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
      
      setIsLoading(false);
    };

    if (!auth0Loading) {
      syncUser();
    }
  }, [isAuthenticated, auth0User, auth0Loading, getAccessTokenSilently]);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    auth0Logout({ logoutParams: { returnTo: window.location.origin } });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
