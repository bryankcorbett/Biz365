// API Client for Biz365
import errorLogger from './errorLogger';

const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

class ApiClient {
    constructor() {
        this.baseURL = API_BASE_URL;
    }

    // Get auth token from localStorage
    getAuthToken() {
        return localStorage.getItem('auth_token');
    }

    // Get headers with auth token
    getHeaders(includeAuth = true) {
        const headers = {
            'Content-Type': 'application/json',
        };

        if (includeAuth) {
            const token = this.getAuthToken();
            if (token) {
                headers.Authorization = `Bearer ${token}`;
            }
        }

        return headers;
    }

    // Generic request method
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const config = {
            headers: this.getHeaders(options.includeAuth !== false),
            credentials: 'include', // Include cookies for cross-subdomain auth
            ...options,
        };

        try {
            const response = await fetch(url, config);

            // Handle non-JSON responses
            const contentType = response.headers.get('content-type');
            let data;

            if (contentType && contentType.includes('application/json')) {
                data = await response.json();
            } else {
                data = await response.text();
            }

            if (!response.ok) {
                const normalize = (d) => {
                    if (!d) return `HTTP error! status: ${response.status}`;
                    if (typeof d === 'string') return d;
                    if (d && typeof d.message === 'string') return d.message;
                    if (d && typeof d.error === 'string') return d.error;
                    try { return JSON.stringify(d); } catch { return String(d); }
                };
                
                // Log errors for monitoring
                if (response.status >= 400) {
                    errorLogger.logError(endpoint, response.status, normalize(data));
                }
                
                throw new Error(normalize(data));
            }

            return data;
        } catch (error) {
            console.error('API Request failed:', error);
            throw error;
        }
    }

    // GET request
    async get(endpoint, options = {}) {
        return this.request(endpoint, {
            method: 'GET',
            ...options,
        });
    }

    // POST request
    async post(endpoint, data, options = {}) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(data),
            ...options,
        });
    }

    // PUT request
    async put(endpoint, data, options = {}) {
        return this.request(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data),
            ...options,
        });
    }

    // DELETE request
    async delete(endpoint, options = {}) {
        return this.request(endpoint, {
            method: 'DELETE',
            ...options,
        });
    }

    // Upload file
    async uploadFile(endpoint, file, options = {}) {
        const formData = new FormData();
        formData.append('file', file);

        const url = `${this.baseURL}${endpoint}`;
        const config = {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${this.getAuthToken()}`,
            },
            credentials: 'include', // Include cookies for cross-subdomain auth
            body: formData,
            ...options,
        };

        try {
            const response = await fetch(url, config);
            const data = await response.json();

            if (!response.ok) {
                const normalize = (d) => {
                    if (!d) return `HTTP error! status: ${response.status}`;
                    if (typeof d === 'string') return d;
                    if (d && typeof d.message === 'string') return d.message;
                    if (d && typeof d.error === 'string') return d.error;
                    try { return JSON.stringify(d); } catch { return String(d); }
                };
                throw new Error(normalize(data));
            }

            return data;
        } catch (error) {
            console.error('File upload failed:', error);
            throw error;
        }
    }
}

// Create and export singleton instance
const apiClient = new ApiClient();
export default apiClient;