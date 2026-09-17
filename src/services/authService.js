import { simulateLatency } from './api';

// Pre-configured mock user profiles for testing
export const DEMO_USERS = {
  seeker: {
    id: 'user-seeker-1',
    name: 'মুহাম্মদ কামরুল হাসান',
    email: 'kamrul@example.com',
    phone: '01712-345678',
    role: 'seeker',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    bloodGroup: 'B+',
    division: 'Dhaka',
    district: 'Dhaka City',
    area: 'ধানমন্ডি (Dhanmondi)',
    isVerified: true,
    createdAt: '2026-01-10'
  },
  donor: {
    id: 'user-donor-1',
    name: 'তানভীর আহমেদ',
    email: 'tanvir.donor@example.com',
    phone: '01711-452890',
    role: 'donor',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    bloodGroup: 'O+',
    division: 'Dhaka',
    district: 'Dhaka City',
    area: 'ধানমন্ডি (Dhanmondi)',
    isVerified: true,
    isAvailableForDonation: true,
    totalDonations: 12,
    lastDonationDate: '2026-05-14',
    createdAt: '2025-11-04'
  },
  admin: {
    id: 'user-admin-1',
    name: 'অ্যাডমিন মডারেটর',
    email: 'admin@roktokonika.org.bd',
    phone: '01700-000099',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    bloodGroup: 'A+',
    division: 'Dhaka',
    district: 'Dhaka City',
    area: 'শাহবাগ (Shahbagh)',
    isVerified: true,
    createdAt: '2025-01-01'
  }
};

export const authService = {
  async login(emailOrPhone, password) {
    await simulateLatency(400);
    // Simple logic: if email contains admin -> admin; if donor -> donor; else seeker
    if (emailOrPhone.includes('admin')) {
      return { success: true, user: DEMO_USERS.admin, token: 'mock-jwt-token-admin' };
    } else if (emailOrPhone.includes('donor')) {
      return { success: true, user: DEMO_USERS.donor, token: 'mock-jwt-token-donor' };
    }
    return { success: true, user: DEMO_USERS.seeker, token: 'mock-jwt-token-seeker' };
  },

  async register(data) {
    await simulateLatency(500);
    const newUser = {
      id: `user-${Date.now()}`,
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: data.role || 'donor',
      bloodGroup: data.bloodGroup || 'A+',
      division: data.division || 'Dhaka',
      district: data.district || 'Dhaka City',
      area: data.area || 'ধানমন্ডি',
      isVerified: false,
      createdAt: new Date().toISOString()
    };
    return { success: true, user: newUser, token: 'mock-jwt-token-registered' };
  },

  async requestOtp(phone) {
    await simulateLatency(300);
    return { success: true, message: `${phone} নম্বরে ৬ সংখ্যার ভেরিফিকেশন কোড পাঠানো হয়েছে। (ডেমো কোড: 123456)` };
  },

  async verifyOtp(phone, otp) {
    await simulateLatency(400);
    if (otp === '123456' || otp.length === 6) {
      return { success: true, message: 'ভেরিফিকেশন সফল হয়েছে।' };
    }
    throw new Error('ভুল ওটিপি কোড। আবার চেষ্টা করুন।');
  },

  async resetPassword(phoneOrEmail, newPassword) {
    await simulateLatency(400);
    return { success: true, message: 'পাসওয়ার্ড সফলভাবে পরিবর্তন করা হয়েছে।' };
  }
};
