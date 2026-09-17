export const MOCK_VERIFICATIONS = [
  {
    id: 'ver-1',
    type: 'donor',
    entityId: 'donor-10',
    entityName: 'ইশরাত জাহান লিয়া',
    requestedAt: '২০২৬-০৯-১৭ ১২:৩০',
    status: 'pending',
    details: 'স্বেচ্ছাসেবী রক্তদাতা হিসেবে এনআইডি ও মেডিকেল কলেজের স্টুডেন্ট আইডি কার্ড যাচাইয়ের আবেদন।',
    documents: [
      { name: 'NID_Card_Front.jpg', type: 'image/jpeg', url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80' },
      { name: 'Student_ID.pdf', type: 'application/pdf', url: '#' }
    ]
  },
  {
    id: 'ver-2',
    type: 'blood_request',
    entityId: 'req-102',
    entityName: 'মুহাম্মদ কামরুল হাসান (বিএসএমএমইউ)',
    requestedAt: '২০২৬-০৯-১৭ ১৪:০০',
    status: 'pending',
    details: 'ট্রমা সার্জারির জন্য হাসপাতালের সিলসহ ৩ ব্যাগ রক্তের রিকুইজিশন স্লিপ।',
    documents: [
      { name: 'Doctor_Prescription_BloodReq.jpg', type: 'image/jpeg', url: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80' }
    ]
  },
  {
    id: 'ver-3',
    type: 'hospital',
    entityId: 'hosp-4',
    entityName: 'চট্টগ্রাম মেডিকেল কলেজ হাসপাতাল',
    requestedAt: '২০২৬-০৯-১৬ ০৯:১৫',
    status: 'verified',
    details: 'সরকারি হাসপাতাল হিসেবে স্বাস্থ্য অধিদপ্তরের প্রাতিষ্ঠানিক কো-অর্ডিনেটর যাচাই সম্পন্ন।',
    documents: [
      { name: 'Institutional_Approval.pdf', type: 'application/pdf', url: '#' }
    ],
    notes: 'স্বাস্থ্য মন্ত্রণালয় অনুমোদনপত্র যাচাইকৃত।',
    reviewedBy: 'অ্যাডমিন টিম',
    reviewedAt: '২০২৬-০৯-১৬'
  }
];

export const MOCK_REPORTS = [
  {
    id: 'rep-1',
    category: 'fake_request',
    reporterName: 'সাজিদুর রহমান',
    reporterPhone: '01671-112233',
    reportedEntity: {
      type: 'request',
      id: 'req-999',
      name: 'সন্দেহভাজন পোস্ট (ধানমন্ডি পপুলার)'
    },
    reason: 'মিথ্যা রক্তের অনুরোধ ও বিকাশ নম্বরে টাকা দাবি',
    description: 'রোগীর বিস্তারিত ও ডাক্তারের প্রেসক্রিপশন নেই, ফোনে যোগাযোগ করলে বিকাশে প্রসেসিং ফি চাইতেছে।',
    status: 'pending',
    internalNotes: 'তদন্তাধীন। নম্বরটি ব্ল্যাকলিস্ট করার প্রক্রিয়া চলছে।',
    createdAt: '৩ ঘণ্টা আগে'
  },
  {
    id: 'rep-2',
    category: 'incorrect_info',
    reporterName: 'ফারহানা ইসলাম',
    reporterPhone: '01822-445566',
    reportedEntity: {
      type: 'donor',
      id: 'donor-88',
      name: 'অকার্যকর ডোনার নম্বর'
    },
    reason: 'নম্বর বন্ধ থাকে ও লোকেশন ভুল দেওয়া',
    description: 'উত্তরা লেখা থাকলেও ফোন দিলে বলে তিনি সিলেটে অবস্থান করছেন।',
    status: 'resolved',
    internalNotes: 'ডোনারের সাথে যোগাযোগ করে প্রোফাইল আপডেট করা হয়েছে।',
    createdAt: '১ দিন আগে'
  }
];

export const MOCK_ADMIN_STATS = {
  totalUsers: 14280,
  activeDonors: 8450,
  bloodRequests: 1320,
  emergencyRequests: 42,
  fulfilledRequests: 1195,
  hospitals: 146,
  bloodBanks: 38,
  pendingVerifications: 14,
  reportsCount: 5,
  totalLivesSaved: 9420
};
