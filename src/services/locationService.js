import { BANGLADESH_DIVISIONS } from '../mocks/locations';

export const locationService = {
  getDivisions() {
    return Object.values(BANGLADESH_DIVISIONS);
  },

  getDistrictsByDivision(divisionName) {
    if (!divisionName || !BANGLADESH_DIVISIONS[divisionName]) return [];
    return Object.values(BANGLADESH_DIVISIONS[divisionName].districts);
  },

  getAreasByDistrict(divisionName, districtName) {
    if (!divisionName || !districtName || !BANGLADESH_DIVISIONS[divisionName]) return [];
    const district = BANGLADESH_DIVISIONS[divisionName].districts[districtName];
    return district ? district.areas : [];
  }
};
