/**
 * Health Check Service
 * Monitors API health and handles service availability
 */

import apiClient from './apiClient';
import { API_ENDPOINTS } from '../constants';

class HealthService {
  constructor() {
    this.healthCheckInterval = null;
    this.isHealthy = true;
    this.lastCheck = null;
    this.checkInterval = 30000; // 30 seconds
  }

  // Check API health
  async checkHealth() {
    try {
      const response = await apiClient.get(API_ENDPOINTS.AUTH.HEALTH);
      this.isHealthy = response.ok;
      this.lastCheck = new Date();
      return response;
    } catch (error) {
      this.isHealthy = false;
      this.lastCheck = new Date();
      throw error;
    }
  }

  // Start periodic health checks
  startHealthChecks() {
    if (this.healthCheckInterval) {
      return;
    }

    this.healthCheckInterval = setInterval(async () => {
      try {
        await this.checkHealth();
      } catch (error) {
        console.warn('Health check failed:', error.message);
      }
    }, this.checkInterval);
  }

  // Stop periodic health checks
  stopHealthChecks() {
    if (this.healthCheckInterval) {
      clearInterval(this.healthCheckInterval);
      this.healthCheckInterval = null;
    }
  }

  // Get current health status
  getHealthStatus() {
    return {
      isHealthy: this.isHealthy,
      lastCheck: this.lastCheck,
      isChecking: this.healthCheckInterval !== null
    };
  }

  // Check if API is available (cached result)
  isApiAvailable() {
    return this.isHealthy;
  }

  // Force a health check (bypass cache)
  async forceHealthCheck() {
    return await this.checkHealth();
  }
}

// Create and export singleton instance
const healthService = new HealthService();
export default healthService;
