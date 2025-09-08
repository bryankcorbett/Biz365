import apiClient from './apiClient';
import { API_ENDPOINTS } from '../constants';

class AuthService {
  // Simple in-memory storage for user data during signup process
  constructor() {
    this.tempUserData = null;
  }

  // User Login
  async login(email, password) {
    try {
      const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, {
        email,
        password
      });

      // Store token in localStorage for persistence
      if (response.token) {
        localStorage.setItem('auth_token', response.token);
        localStorage.setItem('user_data', JSON.stringify(response.user || {}));
      }

      return response;
    } catch (error) {
      throw new Error(error.message || 'Login failed. Please check your credentials.');
    }
  }

  // User Signup
  async signup(userData) {
    try {
      const response = await apiClient.post(API_ENDPOINTS.AUTH.SIGNUP, userData);
      
      // Store user data temporarily for OTP verification
      this.tempUserData = {
        name: userData.name,
        email: userData.email,
        mobile: userData.mobile,
        password: userData.password
      };
      
      console.log('AuthService - Stored user data:', this.tempUserData);

      return response;
    } catch (error) {
      throw new Error(error.message || 'Signup failed. Please try again.');
    }
  }

  // Verify OTP
  async verifyOTP(mobile, otp) {
    try {
      const response = await apiClient.post(API_ENDPOINTS.AUTH.OTP_VERIFY, {
        mobile,
        otp
      });

      // Clear temporary data after successful verification
      this.tempUserData = null;

      return response;
    } catch (error) {
      throw new Error(error.message || 'OTP verification failed. Please try again.');
    }
  }

  // Resend OTP
  async resendOTP(mobile) {
    try {
      const response = await apiClient.post(API_ENDPOINTS.AUTH.OTP_RESEND, {
        mobile
      });

      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to resend OTP. Please try again.');
    }
  }

  // Get Current User
  async getCurrentUser() {
    try {
      const response = await apiClient.get(API_ENDPOINTS.AUTH.ME);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch user data.');
    }
  }

  // Update User Profile
  async updateProfile(userData) {
    try {
      const response = await apiClient.put(API_ENDPOINTS.AUTH.UPDATE_PROFILE, userData);
      
      // No localStorage storage

      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to update profile.');
    }
  }

  // Change Password
  async changePassword(currentPassword, newPassword) {
    try {
      const response = await apiClient.post(API_ENDPOINTS.AUTH.CHANGE_PASSWORD, {
        currentPassword,
        newPassword,
      });

      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to change password.');
    }
  }

  // Logout
  async logout() {
    try {
      // Call logout endpoint to invalidate token on server
      await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
    } catch (error) {
      // Even if server logout fails, clear local storage
      console.warn('Server logout failed:', error.message);
    } finally {
      // Clear localStorage
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
    }
  }

  // Clear all data for testing
  clearAllData() {
    // No localStorage to clear
  }

  // Check if user is authenticated
  isAuthenticated() {
    const token = localStorage.getItem('auth_token');
    return !!token; // Return true if token exists
  }

  // Get stored user data
  getStoredUserData() {
    return this.tempUserData; // Return temporary user data if available
  }

  // Refresh token (if implemented)
  async refreshToken() {
    try {
      const response = await apiClient.post(API_ENDPOINTS.AUTH.REFRESH_TOKEN);
      
      // No localStorage storage

      return response;
    } catch (error) {
      // If refresh fails, logout user
      this.logout();
      throw new Error('Session expired. Please login again.');
    }
  }
}

// Create and export singleton instance
const authService = new AuthService();
export default authService;
