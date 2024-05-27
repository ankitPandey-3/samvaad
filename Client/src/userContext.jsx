import { useState, useContext, useEffect, createContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check authentication status when component mounts
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async() => {
    // Check if the user is authenticated (e.g., by sending a request to the server)

    try {
        const { data } = await axios.get('/api/v1/auth/profile');
        setUser(data.data)
    } catch (error) {
        setUser(null)
    }
  };


  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
