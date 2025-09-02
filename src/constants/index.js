// Industry options for onboarding step 2
export const INDUSTRIES = [
  {
    value: 'retail',
    label: 'Retail',
    subIndustries: [
      { value: 'fashion', label: 'Fashion & Apparel' },
      { value: 'electronics', label: 'Electronics' },
      { value: 'grocery', label: 'Grocery & Supermarket' },
      { value: 'pharmacy', label: 'Pharmacy' },
      { value: 'jewelry', label: 'Jewelry & Watches' },
      { value: 'home-decor', label: 'Home & Decor' },
      { value: 'sports', label: 'Sports & Fitness' },
      { value: 'books', label: 'Books & Stationery' },
      { value: 'other-retail', label: 'Other Retail' }
    ]
  },
  {
    value: 'restaurant',
    label: 'Restaurant & Food Service',
    subIndustries: [
      { value: 'fine-dining', label: 'Fine Dining' },
      { value: 'casual-dining', label: 'Casual Dining' },
      { value: 'fast-food', label: 'Fast Food' },
      { value: 'cafe', label: 'Cafe & Coffee Shop' },
      { value: 'food-truck', label: 'Food Truck' },
      { value: 'catering', label: 'Catering' },
      { value: 'other-food', label: 'Other Food Service' }
    ]
  },
  {
    value: 'healthcare',
    label: 'Healthcare',
    subIndustries: [
      { value: 'clinic', label: 'Medical Clinic' },
      { value: 'pharmacy', label: 'Pharmacy' },
      { value: 'dental', label: 'Dental Practice' },
      { value: 'wellness', label: 'Wellness & Spa' },
      { value: 'other-healthcare', label: 'Other Healthcare' }
    ]
  },
  {
    value: 'services',
    label: 'Professional Services',
    subIndustries: [
      { value: 'consulting', label: 'Consulting' },
      { value: 'legal', label: 'Legal Services' },
      { value: 'accounting', label: 'Accounting' },
      { value: 'real-estate', label: 'Real Estate' },
      { value: 'education', label: 'Education & Training' },
      { value: 'other-services', label: 'Other Services' }
    ]
  },
  {
    value: 'manufacturing',
    label: 'Manufacturing',
    subIndustries: [
      { value: 'textiles', label: 'Textiles' },
      { value: 'electronics', label: 'Electronics' },
      { value: 'automotive', label: 'Automotive' },
      { value: 'food-processing', label: 'Food Processing' },
      { value: 'other-manufacturing', label: 'Other Manufacturing' }
    ]
  },
  {
    value: 'other',
    label: 'Other'
  }
];

// Business aims for onboarding step 5
export const AIMS = [
  {
    value: 'billing-gst',
    label: 'Billing & GST Compliance',
    description: 'Generate GST-compliant invoices and manage tax compliance'
  },
  {
    value: 'inventory-skus',
    label: 'Inventory & SKUs',
    description: 'Track stock levels, manage SKUs, and prevent stockouts'
  },
  {
    value: 'crm-loyalty',
    label: 'CRM & Loyalty',
    description: 'Manage customer relationships and implement loyalty programs'
  },
  {
    value: 'whatsapp-campaigns',
    label: 'WhatsApp Campaigns',
    description: 'Run marketing campaigns and customer engagement via WhatsApp'
  },
  {
    value: 'analytics-reports',
    label: 'Analytics & Reports',
    description: 'Get insights into business performance with detailed reports'
  },
  {
    value: 'multi-branch',
    label: 'Multi-Branch Setup',
    description: 'Manage multiple business locations from a single dashboard'
  },
  {
    value: 'payments-reconciliation',
    label: 'Payments & Reconciliation',
    description: 'Accept multiple payment methods and reconcile transactions'
  }
];

// POS usage options for onboarding step 4
export const POS_USAGE_OPTIONS = [
  { value: 'already-using', label: 'Already using POS/Billing software' },
  { value: 'want-biz365', label: 'Want to use Biz365 POS' },
  { value: 'not-sure', label: 'Not sure yet' }
];

// Location data
export const COUNTRIES = [
  { value: 'IN', label: 'India' },
  { value: 'US', label: 'United States' },
  { value: 'CA', label: 'Canada' },
  { value: 'GB', label: 'United Kingdom' },
  { value: 'AU', label: 'Australia' },
  { value: 'DE', label: 'Germany' },
  { value: 'FR', label: 'France' },
  { value: 'JP', label: 'Japan' },
  { value: 'CN', label: 'China' },
  { value: 'BR', label: 'Brazil' }
];

export const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
];

// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    SIGNUP: '/auth/signup',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    OTP_VERIFY: '/auth/otp/verify',
    OTP_RESEND: '/auth/otp/resend'
  },
  USER: {
    ONBOARDING_STATUS: '/user/onboarding-status',
    PROFILE: '/user/profile'
  },
  ONBOARDING: {
    STEP1: '/onboarding/step1',
    STEP2: '/onboarding/step2',
    STEP3: '/onboarding/step3',
    STEP4: '/onboarding/step4',
    STEP5: '/onboarding/step5'
  }
};

// Frontend routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  VERIFY_OTP: '/verify-otp',
  FORGOT_PASSWORD: '/forgot-password',
  ONBOARDING: {
    STEP1: '/onboarding/step1',
    STEP2: '/onboarding/step2',
    STEP3: '/onboarding/step3',
    STEP4: '/onboarding/step4',
    STEP5: '/onboarding/step5'
  },
  DASHBOARD: 'https://app.biz365.ai'
};

// Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection and try again.',
  SERVER_ERROR: 'Server error. Please try again later.',
  INVALID_CREDENTIALS: 'Invalid email or password.',
  USER_NOT_FOUND: 'User not found.',
  ACCOUNT_LOCKED: 'Account temporarily locked due to multiple failed attempts.',
  OTP_EXPIRED: 'OTP has expired. Please request a new one.',
  INVALID_OTP: 'Invalid OTP. Please try again.',
  MOBILE_NOT_VERIFIED: 'Mobile number not verified. Please verify your OTP.',
  EMAIL_ALREADY_EXISTS: 'Email already registered. Please use a different email.',
  MOBILE_ALREADY_EXISTS: 'Mobile number already registered. Please use a different number.'
};

// Success messages
export const SUCCESS_MESSAGES = {
  SIGNUP_SUCCESS: 'Account created successfully! Please verify your mobile number.',
  LOGIN_SUCCESS: 'Welcome back! Redirecting to your dashboard...',
  OTP_VERIFIED: 'Mobile number verified successfully!',
  OTP_SENT: 'OTP sent to your mobile number.',
  ONBOARDING_SAVED: 'Information saved successfully!',
  ONBOARDING_COMPLETED: 'Onboarding completed! Redirecting to dashboard...'
};
