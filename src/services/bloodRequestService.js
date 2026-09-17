import { MOCK_BLOOD_REQUESTS } from '../mocks/bloodRequests';
import { simulateLatency } from './api';

let bloodRequestsState = [...MOCK_BLOOD_REQUESTS];

export const bloodRequestService = {
  async getRequests(filters = {}) {
    await simulateLatency(300);
    return bloodRequestsState.filter(req => {
      if (filters.bloodGroup && filters.bloodGroup !== 'ALL' && req.bloodGroup !== filters.bloodGroup) {
        return false;
      }
      if (filters.urgencyLevel && filters.urgencyLevel !== 'ALL' && req.urgencyLevel !== filters.urgencyLevel) {
        return false;
      }
      if (filters.division && filters.division !== 'ALL' && req.division !== filters.division) {
        return false;
      }
      if (filters.status && filters.status !== 'ALL' && req.status !== filters.status) {
        return false;
      }
      if (filters.search) {
        const q = filters.search.toLowerCase();
        const matchHospital = req.hospitalName.toLowerCase().includes(q);
        const matchArea = req.area.toLowerCase().includes(q);
        const matchPatient = req.patientName.toLowerCase().includes(q);
        if (!matchHospital && !matchArea && !matchPatient) return false;
      }
      return true;
    });
  },

  async getRequestById(id) {
    await simulateLatency(200);
    const req = bloodRequestsState.find(r => r.id === id);
    if (!req) throw new Error('রক্তের অনুরোধটি খুঁজে পাওয়া যায়নি');
    return req;
  },

  async createRequest(data) {
    await simulateLatency(500);
    const newRequest = {
      id: `req-${Date.now().toString().slice(-4)}`,
      patientName: data.patientName,
      patientAge: parseInt(data.patientAge) || 30,
      gender: data.gender || 'পুরুষ',
      bloodGroup: data.bloodGroup,
      unitsRequired: parseInt(data.unitsRequired) || 1,
      unitsCollected: 0,
      hospitalName: data.hospitalName,
      hospitalAddress: data.hospitalAddress || `${data.area}, ${data.district}`,
      division: data.division,
      district: data.district,
      area: data.area,
      roomOrBed: data.roomOrBed || 'জরুরি বিভাগ',
      requiredDate: data.requiredDate || new Date().toISOString().split('T')[0],
      requiredTime: data.requiredTime || 'জরুরি ভিত্তিতে',
      urgencyLevel: data.urgencyLevel || 'urgent',
      reason: data.reason || 'অস্ত্রোপচার',
      contactPerson: data.contactPerson,
      contactPhone: data.contactPhone,
      altContactPhone: data.altContactPhone || '',
      additionalNotes: data.additionalNotes || '',
      isPrescriptionVerified: false,
      status: 'active',
      postedAt: 'এইমাত্র',
      donorsRespondedCount: 0
    };
    bloodRequestsState = [newRequest, ...bloodRequestsState];
    return newRequest;
  },

  async respondToRequest(requestId, donorInfo) {
    await simulateLatency(350);
    bloodRequestsState = bloodRequestsState.map(r => {
      if (r.id === requestId) {
        return {
          ...r,
          donorsRespondedCount: (r.donorsRespondedCount || 0) + 1
        };
      }
      return r;
    });
    return { success: true, message: 'আপনার রক্তদানের আগ্রহ সফলভাবে জানানো হয়েছে।' };
  },

  async markAsFulfilled(requestId) {
    await simulateLatency(300);
    bloodRequestsState = bloodRequestsState.map(r => 
      r.id === requestId ? { ...r, status: 'fulfilled', unitsCollected: r.unitsRequired } : r
    );
    return { success: true };
  }
};
