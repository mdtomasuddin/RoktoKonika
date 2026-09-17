import { MOCK_HOSPITALS } from '../mocks/hospitals';
import { MOCK_BLOOD_BANKS } from '../mocks/bloodBanks';
import { simulateLatency } from './api';

let hospitalsState = [...MOCK_HOSPITALS];
let bloodBanksState = [...MOCK_BLOOD_BANKS];

export const hospitalService = {
  async getHospitals(filters = {}) {
    await simulateLatency(250);
    return hospitalsState.filter(h => {
      if (filters.division && filters.division !== 'ALL' && h.division !== filters.division) return false;
      if (filters.district && filters.district !== 'ALL' && !h.district.includes(filters.district)) return false;
      if (filters.hasICU && !h.hasICU) return false;
      if (filters.hasBloodBank && !h.hasBloodBank) return false;
      if (filters.search) {
        const q = filters.search.toLowerCase();
        if (!h.name.toLowerCase().includes(q) && !h.banglaName.includes(q) && !h.area.includes(q)) return false;
      }
      return true;
    });
  },

  async getHospitalById(id) {
    await simulateLatency(200);
    const hospital = hospitalsState.find(h => h.id === id);
    if (!hospital) throw new Error('হাসপাতাল খুঁজে পাওয়া যায়নি');
    return hospital;
  },

  async addHospital(data) {
    await simulateLatency(400);
    const newHospital = {
      id: `hosp-${Date.now()}`,
      name: data.name,
      banglaName: data.banglaName || data.name,
      type: data.type || 'জেনারেল হাসপাতাল',
      division: data.division,
      district: data.district,
      area: data.area,
      fullAddress: data.fullAddress,
      emergencyHelpline: data.emergencyHelpline,
      generalPhone: data.generalPhone || data.emergencyHelpline,
      ambulancePhone: data.ambulancePhone || '999',
      totalBeds: parseInt(data.totalBeds) || 100,
      hasICU: !!data.hasICU,
      hasCCU: !!data.hasCCU,
      hasBloodBank: !!data.hasBloodBank,
      isOpen24Hours: true,
      isVerified: true,
      rating: 4.8,
      coordinates: { lat: 23.75, lng: 90.38 }
    };
    hospitalsState = [newHospital, ...hospitalsState];
    return newHospital;
  }
};

export const bloodBankService = {
  async getBloodBanks(filters = {}) {
    await simulateLatency(250);
    return bloodBanksState.filter(bb => {
      if (filters.division && filters.division !== 'ALL' && bb.division !== filters.division) return false;
      if (filters.bloodGroup && filters.bloodGroup !== 'ALL') {
        const stockStatus = bb.stock[filters.bloodGroup];
        if (stockStatus === 'unavailable' || stockStatus === 'critical') return false;
      }
      if (filters.search) {
        const q = filters.search.toLowerCase();
        if (!bb.name.toLowerCase().includes(q) && !bb.banglaName.includes(q) && !bb.area.includes(q)) return false;
      }
      return true;
    });
  },

  async getBloodBankById(id) {
    await simulateLatency(200);
    const bb = bloodBanksState.find(b => b.id === id);
    if (!bb) throw new Error('ব্লাড ব্যাংক খুঁজে পাওয়া যায়নি');
    return bb;
  },

  async updateStock(id, bloodGroup, status) {
    await simulateLatency(200);
    bloodBanksState = bloodBanksState.map(bb => {
      if (bb.id === id) {
        return {
          ...bb,
          lastStockUpdated: 'এইমাত্র',
          stock: { ...bb.stock, [bloodGroup]: status }
        };
      }
      return bb;
    });
    return { success: true };
  }
};
