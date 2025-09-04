import apiClient from './apiClient';

class NFCService {
  // Validate BizTag
  async validateBizTag(storeId, uid) {
    try {
      const response = await apiClient.post('/biztag/validate', {
        store_id: storeId,
        uid: uid
      });
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to validate BizTag.');
    }
  }

  // Configure BizTag
  async configureBizTag(storeId, uid, data) {
    try {
      const response = await apiClient.post('/biztag/configure', {
        store_id: storeId,
        uid: uid,
        ...data
      });
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to configure BizTag.');
    }
  }

  // Update BizTag
  async updateBizTag(uid, storeId, data) {
    try {
      const response = await apiClient.put(`/biztag/${uid}/configure`, {
        store_id: storeId,
        ...data
      });
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to update BizTag.');
    }
  }

  // Get BizTag details
  async getBizTag(storeId, uid) {
    try {
      const response = await apiClient.get(`/biztag/${storeId}/${uid}`);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to get BizTag details.');
    }
  }

  // Get all BizTags for a store
  async getStoreBizTags(storeId) {
    try {
      const response = await apiClient.get(`/biztag/store/${storeId}`);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to get store BizTags.');
    }
  }

  // Delete BizTag
  async deleteBizTag(storeId, uid) {
    try {
      const response = await apiClient.delete(`/biztag/${storeId}/${uid}`);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to delete BizTag.');
    }
  }

  // Get BizTag analytics
  async getBizTagAnalytics(storeId, uid) {
    try {
      const response = await apiClient.get(`/biztag/${storeId}/${uid}/analytics`);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to get BizTag analytics.');
    }
  }

  // Generate BizTag UID
  generateBizTagUID() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  // Validate BizTag UID format
  validateBizTagUID(uid) {
    return /^[A-Z0-9]{8}$/.test(uid);
  }

  // Validate store ID format
  validateStoreId(storeId) {
    return /^[a-zA-Z0-9_-]{3,50}$/.test(storeId);
  }
}

// Create and export singleton instance
const nfcService = new NFCService();
export default nfcService;
