export const MOCK_NOTIFICATIONS = [
  {
    id: 'notif-1',
    userId: 'user-current',
    type: 'emergency',
    title: 'জরুরি রক্তের অনুরোধ!',
    message: 'ঢাকা মেডিকেল কলেজ হাসপাতালে ও-নেগেটিভ (O-) রক্তের অতি জরুরি প্রয়োজন। আপনি কি রক্ত দিতে পারবেন?',
    link: '/blood-requests/req-101',
    isRead: false,
    createdAt: '১০ মিনিট আগে',
    priority: 'urgent'
  },
  {
    id: 'notif-2',
    userId: 'user-current',
    type: 'donor_response',
    title: 'রক্তদাতা আপনার অনুরোধ গ্রহণ করেছেন',
    message: 'ডোনার তানভীর আহমেদ আপনার রক্তদানের আবেদনে সম্মতি প্রকাশ করেছেন। বিস্তারিত মেসেজে দেখুন।',
    link: '/dashboard/messages',
    isRead: false,
    createdAt: '১ ঘণ্টা আগে',
    priority: 'high'
  },
  {
    id: 'notif-3',
    userId: 'user-current',
    type: 'system',
    title: 'আপনার প্রোফাইল ভেরিফাইড হয়েছে',
    message: 'অভিনন্দন! আপনার স্বেচ্ছাসেবী ডোনার অ্যাকাউন্ট সফলভাবে যাচাই করা হয়েছে।',
    link: '/dashboard/profile',
    isRead: true,
    createdAt: '২ দিন আগে',
    priority: 'normal'
  }
];

export const MOCK_CONVERSATIONS = [
  {
    id: 'conv-1',
    participantId: 'donor-1',
    participantName: 'তানভীর আহমেদ',
    participantRole: 'স্বেচ্ছাসেবী রক্তদাতা (O+)',
    participantAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    bloodGroup: 'O+',
    lastMessage: 'আমি বিকাল ৪টার মধ্যে ঢাকা মেডিকেলে পৌঁছাতে পারব ইনশাআল্লাহ।',
    lastMessageTime: '২:১৫ PM',
    unreadCount: 1,
    requestReference: {
      id: 'req-101',
      patientName: 'বেগম রাজিয়া সুলতানা',
      hospital: 'ঢাকা মেডিকেল কলেজ হাসপাতাল',
      bloodGroup: 'O+',
      urgency: 'critical'
    }
  },
  {
    id: 'conv-2',
    participantId: 'user-s1',
    participantName: 'ইমরান হোসেন',
    participantRole: 'রক্ত প্রার্থী (রোগীর ভাই)',
    participantAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80',
    bloodGroup: 'A+',
    lastMessage: 'ভাই, ক্রস-ম্যাচিংয়ের জন্য ল্যাবে স্লিপ নেওয়া হয়েছে।',
    lastMessageTime: 'গতকাল',
    unreadCount: 0,
    requestReference: {
      id: 'req-103',
      patientName: 'তানজিলা তাসনিম',
      hospital: 'চট্টগ্রাম মেডিকেল কলেজ',
      bloodGroup: 'A+',
      urgency: 'urgent'
    }
  }
];

export const MOCK_MESSAGES = {
  'conv-1': [
    {
      id: 'm1',
      conversationId: 'conv-1',
      senderId: 'user-current',
      senderName: 'আমার নাম',
      text: 'আসসালামু আলাইকুম তানভীর ভাই, রোগী জরুরি সার্জারিতে আছেন। আপনি কি আজ রক্ত দিতে পারবেন?',
      timestamp: '১:৫০ PM',
      isRead: true,
      isMine: true
    },
    {
      id: 'm2',
      conversationId: 'conv-1',
      senderId: 'donor-1',
      senderName: 'তানভীর আহমেদ',
      text: 'ওয়ালাইকুম আসসালাম। হ্যাঁ ভাই, আমি প্রস্তুত আছি। রক্তের গ্রুপ O+ তো নিশ্চিত?',
      timestamp: '২:০৫ PM',
      isRead: true,
      isMine: false
    },
    {
      id: 'm3',
      conversationId: 'conv-1',
      senderId: 'donor-1',
      senderName: 'তানভীর আহমেদ',
      text: 'আমি বিকাল ৪টার মধ্যে ঢাকা মেডিকেলে পৌঁছাতে পারব ইনশাআল্লাহ।',
      timestamp: '২:১৫ PM',
      isRead: false,
      isMine: false
    }
  ]
};
