import { MOCK_NOTIFICATIONS, MOCK_CONVERSATIONS, MOCK_MESSAGES } from '../mocks/notifications';
import { MOCK_VERIFICATIONS, MOCK_REPORTS, MOCK_ADMIN_STATS } from '../mocks/admin';
import { simulateLatency } from './api';

let notificationsState = [...MOCK_NOTIFICATIONS];
let conversationsState = [...MOCK_CONVERSATIONS];
let messagesState = { ...MOCK_MESSAGES };
let verificationsState = [...MOCK_VERIFICATIONS];
let reportsState = [...MOCK_REPORTS];

export const notificationService = {
  async getNotifications() {
    await simulateLatency(150);
    return notificationsState;
  },

  async markAsRead(id) {
    await simulateLatency(100);
    notificationsState = notificationsState.map(n => n.id === id ? { ...n, isRead: true } : n);
    return { success: true };
  },

  async markAllAsRead() {
    await simulateLatency(150);
    notificationsState = notificationsState.map(n => ({ ...n, isRead: true }));
    return { success: true };
  }
};

export const messageService = {
  async getConversations() {
    await simulateLatency(200);
    return conversationsState;
  },

  async getMessages(conversationId) {
    await simulateLatency(200);
    return messagesState[conversationId] || [];
  },

  async sendMessage(conversationId, text) {
    await simulateLatency(200);
    const newMessage = {
      id: `msg-${Date.now()}`,
      conversationId,
      senderId: 'user-current',
      senderName: 'আমার নাম',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRead: true,
      isMine: true
    };
    
    if (!messagesState[conversationId]) {
      messagesState[conversationId] = [];
    }
    messagesState[conversationId] = [...messagesState[conversationId], newMessage];

    conversationsState = conversationsState.map(c => {
      if (c.id === conversationId) {
        return {
          ...c,
          lastMessage: text,
          lastMessageTime: 'এইমাত্র'
        };
      }
      return c;
    });

    return newMessage;
  }
};

export const adminService = {
  async getStats() {
    await simulateLatency(250);
    return MOCK_ADMIN_STATS;
  },

  async getVerifications(filterStatus = 'ALL') {
    await simulateLatency(200);
    if (filterStatus === 'ALL') return verificationsState;
    return verificationsState.filter(v => v.status === filterStatus);
  },

  async updateVerification(id, status, notes = '') {
    await simulateLatency(300);
    verificationsState = verificationsState.map(v => 
      v.id === id ? { ...v, status, notes, reviewedBy: 'অ্যাডমিন', reviewedAt: new Date().toISOString().split('T')[0] } : v
    );
    return { success: true };
  },

  async getReports(filterStatus = 'ALL') {
    await simulateLatency(200);
    if (filterStatus === 'ALL') return reportsState;
    return reportsState.filter(r => r.status === filterStatus);
  },

  async updateReport(id, status, internalNotes = '') {
    await simulateLatency(300);
    reportsState = reportsState.map(r => 
      r.id === id ? { ...r, status, internalNotes } : r
    );
    return { success: true };
  }
};
