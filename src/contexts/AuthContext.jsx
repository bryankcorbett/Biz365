import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { ROUTES } from '../constants';

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
        // Check if we have a stored auth token (mock authentication)
        const token = localStorage.getItem('auth_token');
        const userData = localStorage.getItem('user_data');
        
        if (token && userData) {
          try {
            const user = JSON.parse(userData);
            dispatch({ type: 'SET_USER', payload: user });
          } catch (error) {
            // Invalid stored data, clear it
            localStorage.removeItem('auth_token');
            localStorage.removeItem('user_data');
            dispatch({ type: 'SET_LOADING', payload: false });
          }
        } else {
          // No stored authentication, user needs to login
          dispatch({ type: 'SET_LOADING', payload: false });
        }
      } catch (error) {
        console.warn('Auth check completed with local storage only:', error);
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    checkAuthStatus();
  }, []);

  // Login function
  const login = useCallback(async (credentials) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'CLEAR_ERROR' });

      // Mock login - simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock user data
      const mockUser = {
        id: '1',
        name: credentials.email.split('@')[0],
        email: credentials.email,
        onboardingCompleted: false
      };
      
      // Store mock auth data
      localStorage.setItem('auth_token', 'mock-jwt-token');
      localStorage.setItem('user_data', JSON.stringify(mockUser));
      
      dispatch({ type: 'SET_USER', payload: mockUser });
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

      // Mock signup - simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful signup response
      return {
        success: true,
        message: 'Account created successfully',
        mobile: userData.mobile
      };
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

      // Mock OTP verification - simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock user data after OTP verification
      const mockUser = {
        id: '1',
        name: 'John Doe',
        email: 'user@example.com',
        mobile: otpData.mobile,
        isVerified: true,
        onboardingCompleted: false
      };
      
      // Store mock auth data
      localStorage.setItem('auth_token', 'mock-jwt-token');
      localStorage.setItem('user_data', JSON.stringify(mockUser));
      
      dispatch({ type: 'SET_USER', payload: mockUser });
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
      // Clear mock auth data
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
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
