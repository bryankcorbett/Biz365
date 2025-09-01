# 🧪 Mock Testing Guide - Biz365 Authentication & Onboarding

## 🎯 **Testing Overview**
All API calls are now **MOCKED** for local testing. No real backend required!

---

## 🔐 **Authentication Testing**

### **Login Page** (`/login`)
- **Email**: Any valid email format (e.g., `test@example.com`)
- **Password**: Any password (e.g., `password123`)
- **Expected**: 1.5s loading → Success toast → Redirect to onboarding

### **Signup Page** (`/signup`)
- **Name**: Any name (e.g., `John Doe`)
- **Email**: Any valid email (e.g., `john@example.com`)
- **Mobile**: Any 10-digit number (e.g., `9876543210`)
- **Password**: Any password (min 6 chars)
- **Expected**: 1.5s loading → Success toast → Redirect to OTP verification

### **OTP Verification** (`/verify-otp`)
- **OTP**: Any 6-digit number (e.g., `123456`)
- **Expected**: 1.5s loading → Success toast → Redirect to onboarding
- **Resend OTP**: 1s loading → Success toast

---

## 📋 **Onboarding Testing**

### **Step 1: Company Information**
- **Company Name**: Any name (e.g., `My Business`)
- **Business Type**: Any type (e.g., `Private Limited`)
- **GST Number**: Any 15-digit format (e.g., `22ABCDE1234F1Z5`)
- **PAN Number**: Any 10-digit format (e.g., `ABCDE1234F`)
- **Website**: Any URL (e.g., `https://mybusiness.com`)
- **Description**: Any description
- **Expected**: 1.5s loading → Success toast → Navigate to Step 2

### **Step 2: Industry Selection**
- **Industry**: Select any industry (e.g., `Retail`)
- **Sub-industry**: Select any sub-industry (e.g., `Fashion & Apparel`)
- **Expected**: 1.5s loading → Success toast → Navigate to Step 3

### **Step 3: Business Address**
- **Address**: Any address (e.g., `123 Main Street`)
- **City**: Any city (e.g., `Mumbai`)
- **Pincode**: Any 6-digit number (e.g., `400001`)
- **Country**: Select any country (e.g., `India`)
- **State**: Select any state (e.g., `Maharashtra`)
- **Expected**: 1.5s loading → Success toast → Navigate to Step 4

### **Step 4: POS Usage**
- **POS Usage**: Select any option:
  - `already-using` → Shows "Current Software" field
  - `want-biz365` → Shows "Specific Needs" field
  - `not-sure` → Shows info card
- **Expected**: 1.5s loading → Success toast → Navigate to Step 5

### **Step 5: Business Aims**
- **Business Aims**: Select any combination of goals
- **Other Aim**: If "Other" selected, enter any description
- **Expected**: 1.5s loading → Success toast → 2s loading → Completion toast → Redirect to dashboard

---

## 🎨 **UI/UX Testing**

### **Visual Elements**
- ✅ **Animated Background**: Floating circles with gold theme
- ✅ **Loading States**: Shimmer effects and spinners
- ✅ **Toast Notifications**: Success/error messages with animations
- ✅ **Form Validation**: Real-time error clearing
- ✅ **Progress Indicators**: Step dots showing completion
- ✅ **Responsive Design**: Test on different screen sizes

### **Animations**
- ✅ **Staggered Reveals**: Form elements appear with delays
- ✅ **Hover Effects**: Button scaling and color transitions
- ✅ **Focus States**: Gold border highlights on form inputs
- ✅ **Smooth Transitions**: Page navigation and state changes

---

## 🚀 **Quick Test Scenarios**

### **Scenario 1: Complete Flow**
1. Go to `/login`
2. Enter any email/password → Login
3. Complete all 5 onboarding steps
4. Verify completion and redirect

### **Scenario 2: Form Validation**
1. Try submitting empty forms
2. Enter invalid data (short passwords, invalid emails)
3. Verify error messages appear and clear on typing

### **Scenario 3: Navigation**
1. Test back/forward browser buttons
2. Try direct URL access to protected routes
3. Verify redirects work correctly

### **Scenario 4: Responsive Design**
1. Test on mobile (375px width)
2. Test on tablet (768px width)
3. Test on desktop (1200px+ width)

---

## 🔧 **Mock Data Details**

### **User Data**
```javascript
{
  id: '1',
  name: 'John Doe',
  email: 'user@example.com',
  mobile: '+919876543210',
  isVerified: true,
  onboardingCompleted: false
}
```

### **API Responses**
- **Login**: Returns mock JWT token and user data
- **Signup**: Returns success message with mobile number
- **OTP**: Accepts any 6-digit OTP
- **Onboarding**: Returns step completion data
- **Completion**: Returns final success message

---

## 🎯 **Testing Checklist**

- [ ] Login with any credentials works
- [ ] Signup form validation works
- [ ] OTP accepts any 6-digit number
- [ ] All 5 onboarding steps save successfully
- [ ] Form validation shows/hides errors correctly
- [ ] Loading states display properly
- [ ] Toast notifications appear
- [ ] Navigation between steps works
- [ ] Progress indicators update
- [ ] Responsive design works on all devices
- [ ] Animations and transitions are smooth
- [ ] Error handling works (try invalid data)

---

## 🚨 **Important Notes**

1. **No Real API Calls**: All requests are mocked with delays
2. **Local Storage**: User data is stored locally for session persistence
3. **No Backend Required**: Everything works offline
4. **Test Data**: Use any valid format data for testing
5. **Performance**: Mock delays simulate real API response times

**Happy Testing! 🎉**
