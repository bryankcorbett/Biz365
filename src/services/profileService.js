import apiClient from './apiClient';

class ProfileService {
  // Get user profile
  async getProfile() {
    try {
      const response = await apiClient.get('/profile');
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to get profile data.');
    }
  }

  // Update user profile
  async updateProfile(data) {
    try {
      const response = await apiClient.put('/profile', data);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to update profile.');
    }
  }

  // Get profile settings
  async getSettings() {
    try {
      const response = await apiClient.get('/profile/settings');
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to get profile settings.');
    }
  }

  // Update profile settings
  async updateSettings(data) {
    try {
      const response = await apiClient.put('/profile/settings', data);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to update profile settings.');
    }
  }

  // Get user's stores
  async getStores() {
    try {
      const response = await apiClient.get('/profile/stores');
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to get stores data.');
    }
  }

  // Get user's analytics
  async getAnalytics() {
    try {
      const response = await apiClient.get('/profile/analytics');
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to get analytics data.');
    }
  }

  // Get user's activity
  async getActivity(limit = 50) {
    try {
      const response = await apiClient.get(`/profile/activity?limit=${limit}`);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to get activity data.');
    }
  }

  // Upload profile image
  async uploadImage(file, type) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', type);
      
      const response = await apiClient.uploadFile('/profile/upload', file, { type });
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to upload image.');
    }
  }
}

// Create and export singleton instance
const profileService = new ProfileService();
export default profileService;
