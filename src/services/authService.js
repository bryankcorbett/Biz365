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
      // Mock API call for testing
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock user data
      const mockUser = {
        id: '1',
        name: 'John Doe',
        email: email,
        mobile: '+919876543210',
        isVerified: true,
        onboardingCompleted: false, // Always start with onboarding not completed for testing
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const mockResponse = {
        token: 'mock_jwt_token_' + Date.now(),
        user: mockUser,
        message: 'Login successful'
      };

      // No localStorage storage

      return mockResponse;
    } catch (error) {
      throw new Error(error.message || 'Login failed. Please check your credentials.');
    }
  }

  // User Signup
  async signup(userData) {
    try {
      // Mock API call for testing
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Store user data temporarily for OTP verification
      this.tempUserData = {
        name: userData.name,
        email: userData.email,
        mobile: userData.mobile,
        password: userData.password
      };
      
      console.log('AuthService - Stored user data:', this.tempUserData);

      // Mock response
      const mockResponse = {
        message: 'Signup successful! Please verify your mobile number.',
        mobile: userData.mobile,
        otpSent: true
      };

      return mockResponse;
    } catch (error) {
      throw new Error(error.message || 'Signup failed. Please try again.');
    }
  }

  // Verify OTP
  async verifyOTP(mobile, otp) {
    try {
      // Mock API call for testing
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock OTP verification (accept any 6-digit OTP for testing)
      if (otp.length !== 6) {
        throw new Error('OTP must be 6 digits');
      }

      // Use stored user data from signup, or fallback to mock data
      const userData = this.tempUserData || {
        name: 'John Doe',
        email: 'john@example.com',
        mobile: mobile,
        password: 'password123'
      };
      
      console.log('AuthService - Using user data for OTP verification:', userData);

      // Create user object after OTP verification
      const mockUser = {
        id: '1',
        name: userData.name,
        email: userData.email,
        mobile: mobile,
        isVerified: true,
        onboardingCompleted: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const mockResponse = {
        token: 'mock_jwt_token_' + Date.now(),
        user: mockUser,
        message: 'OTP verified successfully!'
      };

      console.log('AuthService - Created user after OTP verification:', mockUser);

      // Clear temporary data after successful verification
      this.tempUserData = null;

      return mockResponse;
    } catch (error) {
      throw new Error(error.message || 'OTP verification failed. Please try again.');
    }
  }

  // Resend OTP
  async resendOTP(mobile) {
    try {
      // Mock API call for testing
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock response
      const mockResponse = {
        message: 'OTP resent successfully!',
        mobile: mobile,
        otpSent: true
      };

      return mockResponse;
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
      // No localStorage to clear
    }
  }

  // Clear all data for testing
  clearAllData() {
    // No localStorage to clear
  }

  // Check if user is authenticated
  isAuthenticated() {
    return false; // Always return false - no localStorage
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
