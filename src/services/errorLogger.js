/**
 * Client-Side Error Logger
 * Logs one error (debounced) for any 404/5xx from /api/auth/me
 */

class ErrorLogger {
  constructor() {
    this.errorCounts = new Map();
    this.debounceTime = 5000; // 5 seconds debounce
    this.lastErrorTime = 0;
    this.anomalyThreshold = 10; // errors per minute
    this.anomalyWindow = 60000; // 1 minute
    this.anomalyAlerts = new Set();
  }

  logError(endpoint, statusCode, error) {
    const now = Date.now();
    const key = `${endpoint}-${statusCode}`;
    
    // Increment error count
    if (!this.errorCounts.has(key)) {
      this.errorCounts.set(key, { count: 0, firstSeen: now });
    }
    this.errorCounts.get(key).count++;
    
    // Debounced logging - only log once per 5 seconds per endpoint
    if (now - this.lastErrorTime > this.debounceTime) {
      console.error(`[AUTH ERROR] ${endpoint} returned ${statusCode}:`, error);
      this.lastErrorTime = now;
      
      // Send to monitoring service (if available)
      this.sendToMonitoring(endpoint, statusCode, error);
    }
    
    // Check for anomaly patterns
    this.checkAnomalyPattern(endpoint, statusCode, now);
  }

  checkAnomalyPattern(endpoint, statusCode, now) {
    // Only check /api/auth/me for 404/5xx spikes
    if (endpoint !== '/api/auth/me' || (statusCode < 404)) {
      return;
    }

    // Count errors in the last minute
    const oneMinuteAgo = now - this.anomalyWindow;
    let recentErrors = 0;
    
    for (const [key, data] of this.errorCounts.entries()) {
      if (key.startsWith('/api/auth/me-') && data.firstSeen > oneMinuteAgo) {
        recentErrors += data.count;
      }
    }

    // Check if we've exceeded the threshold
    if (recentErrors >= this.anomalyThreshold) {
      const alertKey = `${endpoint}-${Math.floor(now / this.anomalyWindow)}`;
      
      if (!this.anomalyAlerts.has(alertKey)) {
        this.anomalyAlerts.add(alertKey);
        this.raiseAnomalyAlert(endpoint, recentErrors, statusCode);
      }
    }
  }

  raiseAnomalyAlert(endpoint, errorCount, statusCode) {
    const alert = {
      type: 'AUTH_ANOMALY',
      endpoint,
      errorCount,
      statusCode,
      timestamp: new Date().toISOString(),
      message: `High error rate detected: ${errorCount} ${statusCode} errors in 60s for ${endpoint}`
    };

    console.warn('[AUTH ANOMALY ALERT]', alert);
    
    // Send to monitoring service
    this.sendAnomalyAlert(alert);
    
    // Show user notification (optional)
    this.showUserNotification(alert);
  }

  sendToMonitoring(endpoint, statusCode, error) {
    // Send to your monitoring service (e.g., Sentry, DataDog, etc.)
    if (window.gtag) {
      window.gtag('event', 'auth_error', {
        event_category: 'authentication',
        event_label: `${endpoint}-${statusCode}`,
        value: 1
      });
    }
  }

  sendAnomalyAlert(alert) {
    // Send anomaly alert to monitoring service
    if (window.gtag) {
      window.gtag('event', 'auth_anomaly', {
        event_category: 'authentication',
        event_label: alert.endpoint,
        value: alert.errorCount
      });
    }
  }

  showUserNotification(alert) {
    // Show user-friendly notification
    if (window.showToast) {
      window.showToast('warning', 'Authentication service is experiencing issues. Please try again later.');
    }
  }

  // Reset error counts (call this periodically)
  resetCounts() {
    this.errorCounts.clear();
    this.anomalyAlerts.clear();
  }
}

// Create singleton instance
const errorLogger = new ErrorLogger();

export default errorLogger;
