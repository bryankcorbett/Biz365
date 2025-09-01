import apiClient from './apiClient';
import { API_ENDPOINTS } from '../constants';

class OnboardingService {
  // Step 1: Company Information
  async saveCompanyInfo(companyData) {
    try {
      // Mock API call for testing
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock response
      const mockResponse = {
        message: 'Company information saved successfully!',
        data: companyData,
        step: 1,
        nextStep: 2
      };

      return mockResponse;
    } catch (error) {
      throw new Error(error.message || 'Failed to save company information.');
    }
  }

  // Step 2: Industry & Sub-industry
  async saveIndustryInfo(industryData) {
    try {
      // Mock API call for testing
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock response
      const mockResponse = {
        message: 'Industry information saved successfully!',
        data: industryData,
        step: 2,
        nextStep: 3
      };

      return mockResponse;
    } catch (error) {
      throw new Error(error.message || 'Failed to save industry information.');
    }
  }

  // Step 3: Business Address
  async saveBusinessAddress(addressData) {
    try {
      // Mock API call for testing
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock response
      const mockResponse = {
        message: 'Business address saved successfully!',
        data: addressData,
        step: 3,
        nextStep: 4
      };

      return mockResponse;
    } catch (error) {
      throw new Error(error.message || 'Failed to save business address.');
    }
  }

  // Step 4: POS Usage & Software
  async savePOSInfo(posData) {
    try {
      // Mock API call for testing
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock response
      const mockResponse = {
        message: 'POS information saved successfully!',
        data: posData,
        step: 4,
        nextStep: 5
      };

      return mockResponse;
    } catch (error) {
      throw new Error(error.message || 'Failed to save POS information.');
    }
  }

  // Step 5: Business Aims & Goals
  async saveBusinessAims(aimsData) {
    try {
      // Mock API call for testing
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock response
      const mockResponse = {
        message: 'Business aims saved successfully!',
        data: aimsData,
        step: 5,
        completed: true
      };

      return mockResponse;
    } catch (error) {
      throw new Error(error.message || 'Failed to save business aims.');
    }
  }

  // Get onboarding progress
  async getOnboardingProgress() {
    try {
      const response = await apiClient.get(API_ENDPOINTS.ONBOARDING.PROGRESS);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch onboarding progress.');
    }
  }

  // Get saved onboarding data
  async getOnboardingData() {
    try {
      const response = await apiClient.get(API_ENDPOINTS.ONBOARDING.DATA);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch onboarding data.');
    }
  }

  // Update specific onboarding step
  async updateOnboardingStep(step, data) {
    try {
      const response = await apiClient.put(`${API_ENDPOINTS.ONBOARDING.BASE}/${step}`, data);
      return response;
    } catch (error) {
      throw new Error(error.message || `Failed to update step ${step}.`);
    }
  }

  // Complete onboarding
  async completeOnboarding() {
    try {
      // Mock API call for testing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock response
      const mockResponse = {
        message: '🎉 Onboarding completed successfully! Welcome to Biz365!',
        completed: true,
        redirectTo: '/dashboard',
        user: {
          onboardingCompleted: true,
          completedAt: new Date().toISOString()
        }
      };

      return mockResponse;
    } catch (error) {
      throw new Error(error.message || 'Failed to complete onboarding.');
    }
  }

  // Reset onboarding (if user wants to start over)
  async resetOnboarding() {
    try {
      const response = await apiClient.delete(API_ENDPOINTS.ONBOARDING.RESET);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to reset onboarding.');
    }
  }

  // Get available industries
  async getIndustries() {
    try {
      const response = await apiClient.get(API_ENDPOINTS.ONBOARDING.INDUSTRIES);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch industries.');
    }
  }

  // Get sub-industries for a specific industry
  async getSubIndustries(industryId) {
    try {
      const response = await apiClient.get(`${API_ENDPOINTS.ONBOARDING.SUB_INDUSTRIES}/${industryId}`);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch sub-industries.');
    }
  }

  // Get countries list
  async getCountries() {
    try {
      const response = await apiClient.get(API_ENDPOINTS.ONBOARDING.COUNTRIES);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch countries.');
    }
  }

  // Get states/provinces for a specific country
  async getStates(countryCode) {
    try {
      const response = await apiClient.get(`${API_ENDPOINTS.ONBOARDING.STATES}/${countryCode}`);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch states.');
    }
  }

  // Upload business documents
  async uploadDocument(file, documentType) {
    try {
      const response = await apiClient.uploadFile(API_ENDPOINTS.ONBOARDING.UPLOAD_DOCUMENT, file, {
        documentType,
      });
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to upload document.');
    }
  }

  // Get onboarding recommendations based on completed steps
  async getRecommendations() {
    try {
      const response = await apiClient.get(API_ENDPOINTS.ONBOARDING.RECOMMENDATIONS);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch recommendations.');
    }
  }
}

// Create and export singleton instance
const onboardingService = new OnboardingService();
export default onboardingService;
