import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { ROUTES } from '../constants';
import authService from '../services/authService';

// Auth state types
const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
  apiUnavailable: false, // Track if API is unavailable
};

// Action types for reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_USER':
      return { 
        ...state, 
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null,
        apiUnavailable: false
      };
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };
    case 'SET_API_UNAVAILABLE':
      return { ...state, apiUnavailable: true, isLoading: false, error: null };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    case 'LOGOUT':
      return { 
        ...state, 
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
        apiUnavailable: false
      };
    case 'SET_AUTHENTICATED':
      return { ...state, isAuthenticated: action.payload };
    default:
      return state;
  }
};

// Create context
const AuthContext = createContext(undefined);

// Provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check authentication status on app load
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // Always call /api/auth/me to check authentication status
        const response = await authService.getCurrentUser();
        
        // 200 → set user → allow /dashboard
        if (response.ok && response.user) {
          dispatch({ type: 'SET_USER', payload: response.user });
        } else {
          dispatch({ type: 'SET_LOADING', payload: false });
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        
        // Handle different error types
        if (error.message && error.message.includes('401')) {
          // 401 → show /login (do not auto-loop)
          dispatch({ type: 'SET_LOADING', payload: false });
        } else if (error.message && (error.message.includes('404') || error.message.includes('500'))) {
          // 404/5xx → show "Auth API unavailable" banner
          dispatch({ type: 'SET_API_UNAVAILABLE' });
        } else {
          // Other errors → show login
          dispatch({ type: 'SET_LOADING', payload: false });
        }
      }
    };

    checkAuthStatus();
  }, []);

  // Login function
  const login = useCallback(async (credentials) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'CLEAR_ERROR' });

      // Wait for login response and Set-Cookie
      const response = await authService.login(credentials.email, credentials.password);
      
      // Wait a moment for cookie to be set
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Re-fetch user data to ensure cookie is working
      const userResponse = await authService.getCurrentUser();
      
      if (userResponse.ok && userResponse.user) {
        dispatch({ type: 'SET_USER', payload: userResponse.user });
      } else {
        throw new Error('Failed to verify authentication after login');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : (typeof error === 'string' ? error : 'Login failed');
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  // Signup function
  const signup = useCallback(async (userData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'CLEAR_ERROR' });

      const response = await authService.signup(userData);
      return response;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : (typeof error === 'string' ? error : 'Signup failed');
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  // Verify OTP function
  const verifyOTP = useCallback(async (otpData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'CLEAR_ERROR' });

      const response = await authService.verifyOTP(otpData.mobile, otpData.otp);
      
      // Update state with user data from response
      dispatch({ type: 'SET_USER', payload: response.user });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : (typeof error === 'string' ? error : 'OTP verification failed');
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  // Logout function
  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.warn('Logout error:', error);
    } finally {
      dispatch({ type: 'LOGOUT' });
    }
  }, []);

  // Clear error function
  const clearError = useCallback(() => {
    dispatch({ type: 'CLEAR_ERROR' });
  }, []);

  const value = {
    ...state,
    login,
    signup,
    verifyOTP,
    logout,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
