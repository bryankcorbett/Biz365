import apiClient from './apiClient';
import { API_ENDPOINTS } from '../constants';

class OnboardingService {
  // Get onboarding step data
  async getStep(step) {
    try {
      const response = await apiClient.get(`${API_ENDPOINTS.ONBOARDING[step.toUpperCase()]}`);
      return response;
    } catch (error) {
      throw new Error(error.message || `Failed to get ${step} data.`);
    }
  }

  // Save onboarding step data
  async saveStep(step, data) {
    try {
      const response = await apiClient.post(`${API_ENDPOINTS.ONBOARDING[step.toUpperCase()]}`, data);
      return response;
    } catch (error) {
      throw new Error(error.message || `Failed to save ${step} data.`);
    }
  }

  // Get onboarding progress
  async getProgress() {
    try {
      const response = await apiClient.get('/onboarding/progress');
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to get onboarding progress.');
    }
  }

  // Complete onboarding
  async completeOnboarding() {
    try {
      const response = await apiClient.post('/onboarding/complete');
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to complete onboarding.');
    }
  }
}

// Create and export singleton instance
const onboardingService = new OnboardingService();
export default onboardingService;