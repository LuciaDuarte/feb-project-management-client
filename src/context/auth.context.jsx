import { createContext, useState, useEffect } from 'react';
import { verify } from '../api/auth.api';

const AuthContext = createContext();

const AuthProviderWrapper = props => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const storeToken = token => {
    localStorage.setItem('authToken', token);
  };

  const authenticateUser = async () => {
    // Get the stored token from the localStorage
    const storedToken = localStorage.getItem('authToken');

    // If the token exists in the localStorage
    // verify it is valid
    if (storedToken) {
      try {
        const response = await verify(storedToken);
        const user = response.data;
        // Update state variables
        setUser(user);
        setIsLoggedIn(true);
        // setIsLoading(false);
      } catch (error) {
        console.log('An error occurred authenticating the user', error);
        // If the server sends an error response (invalid token)
        // Update state variables
        setUser(null);
        setIsLoggedIn(false);
        // setIsLoading(false);
      }
    } else {
      // If the token is not available (or is removed)
      setUser(null);
      setIsLoggedIn(false);
      // setIsLoading(false);
    }

    setIsLoading(false);
  };

  const removeToken = () => {
    // Upon logout, remove the token from the localStorage
    localStorage.removeItem('authToken');
  };

  const logOutUser = () => {
    // To log out the user, remove the token
    removeToken();
    // and update the state variables
    authenticateUser();
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        user,
        storeToken,
        authenticateUser,
        logOutUser
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProviderWrapper };
