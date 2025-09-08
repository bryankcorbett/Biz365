// Test script to verify error handling improvements
import apiClient from './src/services/apiClient.js';

console.log('Testing API Client Error Handling...');

// Test 1: Test with invalid endpoint
console.log('\n1. Testing invalid endpoint...');
try {
  await apiClient.get('/api/invalid-endpoint');
} catch (error) {
  console.log('Error message:', error.message);
  console.log('Error type:', typeof error.message);
}

// Test 2: Test with malformed data
console.log('\n2. Testing malformed data...');
try {
  await apiClient.post('/api/test', { invalid: 'data' });
} catch (error) {
  console.log('Error message:', error.message);
  console.log('Error type:', typeof error.message);
}

console.log('\nError handling test completed!');
