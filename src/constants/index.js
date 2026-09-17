export const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

export const URGENCY_LEVELS = {
  NORMAL: 'normal',
  URGENT: 'urgent',
  CRITICAL: 'critical'
};

export const URGENCY_LABELS = {
  normal: { text: 'সাধারণ', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  urgent: { text: 'জরুরি', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  critical: { text: 'অত্যন্ত জরুরি', color: 'bg-rose-50 text-rose-700 border-rose-200 animate-pulse' }
};

export const USER_ROLES = {
  GUEST: 'guest',
  SEEKER: 'seeker',
  DONOR: 'donor',
  HOSPITAL_COORDINATOR: 'hospital_coordinator',
  ADMIN: 'admin'
};

// Blood donation compatibility chart
export const BLOOD_COMPATIBILITY = {
  'A+': { canDonateTo: ['A+', 'AB+'], canReceiveFrom: ['A+', 'A-', 'O+', 'O-'] },
  'A-': { canDonateTo: ['A+', 'A-', 'AB+', 'AB-'], canReceiveFrom: ['A-', 'O-'] },
  'B+': { canDonateTo: ['B+', 'AB+'], canReceiveFrom: ['B+', 'B-', 'O+', 'O-'] },
  'B-': { canDonateTo: ['B+', 'B-', 'AB+', 'AB-'], canReceiveFrom: ['B-', 'O-'] },
  'O+': { canDonateTo: ['A+', 'B+', 'AB+', 'O+'], canReceiveFrom: ['O+', 'O-'] },
  'O-': { canDonateTo: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], canReceiveFrom: ['O-'] }, // Universal Donor
  'AB+': { canDonateTo: ['AB+'], canReceiveFrom: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] }, // Universal Recipient
  'AB-': { canDonateTo: ['AB+', 'AB-'], canReceiveFrom: ['A-', 'B-', 'AB-', 'O-'] }
};

export const EMERGENCY_HOTLINES = [
  { name: 'জাতীয় জরুরি সেবা', number: '999', icon: 'ShieldAlert', desc: 'পুলিশ, অ্যাম্বুলেন্স ও ফায়ার সার্ভিস (টোল ফ্রি)' },
  { name: 'স্বাস্থ্য বাতায়ন', number: '16263', icon: 'PhoneCall', desc: 'সরকারি স্বাস্থ্য পরামর্শ ও তথ্য সেবা' },
  { name: 'রক্তকণিকা হটলাইন', number: '09612-889900', icon: 'HeartHandshake', desc: '২৪ ঘণ্টা জরুরি রক্ত ব্যবস্থাপনা সেল' },
  { name: 'রেড ক্রিসেন্ট ব্লাড সেল', number: '01819-228844', icon: 'Activity', desc: 'কেন্দ্রীয় জরুরি রক্ত সরবরাহ' }
];
