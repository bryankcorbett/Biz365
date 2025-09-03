// Industry options for onboarding step 1
export const INDUSTRIES = [
  {
    value: 'food-beverage',
    label: 'Food & Beverage',
    subIndustries: [
      { value: 'quick-service-eatery', label: 'Quick Service Eatery' },
      { value: 'fine-dine', label: 'Fine Dine' },
      { value: 'cafe', label: 'Café' },
      { value: 'bar', label: 'Bar' },
      { value: 'lounge', label: 'Lounge' },
      { value: 'pub', label: 'Pub' },
      { value: 'desserts', label: 'Desserts' },
      { value: 'bakery', label: 'Bakery' },
      { value: 'cloud-kitchen', label: 'Cloud Kitchen' },
      { value: 'sweet-shop', label: 'Sweet Shop' },
      { value: 'tea-snacks', label: 'Tea & Snacks' },
      { value: 'other-food', label: 'Other' }
    ]
  },
  {
    value: 'beauty-wellness',
    label: 'Beauty & Wellness',
    subIndustries: [
      { value: 'salons', label: 'Salons' },
      { value: 'nail-salons', label: 'Nail Salons' },
      { value: 'spa', label: 'Spa' },
      { value: 'massage-centers', label: 'Massage Centers' },
      { value: 'other-beauty', label: 'Other' }
    ]
  },
  {
    value: 'retail',
    label: 'Retail',
    subIndustries: [
      { value: 'groceries', label: 'Groceries' },
      { value: 'convenience', label: 'Convenience' },
      { value: 'departmental', label: 'Departmental' },
      { value: 'clothing', label: 'Clothing' },
      { value: 'accessories', label: 'Accessories' },
      { value: 'cosmetics', label: 'Cosmetics' },
      { value: 'jewelry', label: 'Jewelry' },
      { value: 'footwear', label: 'Footwear' },
      { value: 'watches', label: 'Watches' },
      { value: 'belts', label: 'Belts' },
      { value: 'wallets', label: 'Wallets' },
      { value: 'eyewear-opticals', label: 'Eyewear/Opticals' },
      { value: 'pet-store', label: 'Pet Store' },
      { value: 'general', label: 'General' }
    ]
  },
  {
    value: 'service-industry',
    label: 'Service Industry',
    subIndustries: [
      { value: 'tours-travels', label: 'Tours & Travels' },
      { value: 'health-fitness', label: 'Health & Fitness' },
      { value: 'other-manual-entry', label: 'Other manual entry' }
    ]
  },
  {
    value: 'other',
    label: 'Other',
    subIndustries: [
      { value: 'other', label: 'Other' }
    ]
  }
];

// Business aims for onboarding step 3
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
    STEP3: '/onboarding/step3'
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
    STEP3: '/onboarding/step3'
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
