import { MOCK_DONORS } from '../mocks/donors';
import { simulateLatency } from './api';

let donorsState = [...MOCK_DONORS];

export const donorService = {
  async getDonors(filters = {}) {
    await simulateLatency(300);
    return donorsState.filter(donor => {
      if (filters.bloodGroup && filters.bloodGroup !== 'ALL' && donor.bloodGroup !== filters.bloodGroup) {
        return false;
      }
      if (filters.division && filters.division !== 'ALL' && donor.division !== filters.division) {
        return false;
      }
      if (filters.district && filters.district !== 'ALL' && !donor.district.includes(filters.district)) {
        return false;
      }
      if (filters.area && filters.area !== 'ALL' && !donor.area.includes(filters.area)) {
        return false;
      }
      if (filters.availableOnly && !donor.isAvailable) {
        return false;
      }
      if (filters.verifiedOnly && !donor.isVerified) {
        return false;
      }
      if (filters.search) {
        const query = filters.search.toLowerCase();
        const matchesName = donor.name.toLowerCase().includes(query);
        const matchesArea = donor.area.toLowerCase().includes(query);
        const matchesGroup = donor.bloodGroup.toLowerCase().includes(query);
        if (!matchesName && !matchesArea && !matchesGroup) return false;
      }
      return true;
    });
  },

  async getDonorById(id) {
    await simulateLatency(250);
    const donor = donorsState.find(d => d.id === id);
    if (!donor) throw new Error('রক্তদাতা খুঁজে পাওয়া যায়নি');
    return donor;
  },

  async registerDonor(data) {
    await simulateLatency(450);
    const newDonor = {
      id: `donor-${Date.now()}`,
      userId: `user-${Date.now()}`,
      name: data.name,
      bloodGroup: data.bloodGroup,
      division: data.division,
      district: data.district,
      area: data.area,
      approxDistanceKm: 3.0,
      preferredRadiusKm: data.preferredRadiusKm || 15,
      isAvailable: true,
      lastDonationDate: data.lastDonationDate || '',
      totalDonations: data.totalDonations ? parseInt(data.totalDonations) : 0,
      isVerified: false,
      badgeLevel: 'ব্রোঞ্জ ডোনার',
      responseRatePercentage: 100,
      bio: data.bio || 'স্বেচ্ছায় রক্তদানে আগ্রহী।',
      phoneMasked: data.phone ? data.phone.replace(/(\d{4})\d{4}(\d{3})/, '$1****$2') : '0171****000',
      allowDirectCalls: data.allowDirectCalls !== false,
      gender: data.gender || 'পুরুষ',
      age: data.age ? parseInt(data.age) : 25,
      weightKg: data.weightKg ? parseInt(data.weightKg) : 65,
      rating: 5.0,
      reviewsCount: 0
    };
    donorsState = [newDonor, ...donorsState];
    return newDonor;
  },

  async updateAvailability(donorId, isAvailable) {
    await simulateLatency(200);
    donorsState = donorsState.map(d => d.id === donorId ? { ...d, isAvailable } : d);
    return { success: true, isAvailable };
  }
};
