/* eslint camelcase: 0 */
import profileInfoDetail from '../profileInfoDetail';
import profiles from '../profiles';
import membershipDetails from '../membershipDetails';
import preference from '../preference';
import contact from '../contact';
import shortlistIDs from '../shortlistIDs';
import offer from '../offer';

const baseValue = {
  self: profileInfoDetail(undefined, {}),
  shortListIDs: [shortlistIDs(undefined, {})],
  membership: membershipDetails(undefined, {}),
  preference: preference(undefined, {}),
  contactDetails: contact(undefined, {}),
  profilesData: {},
  offerCode: {},
  bucket: 'A',
};

export default (baseline = baseValue, payload = {}, extra = {}) => {
  const { type } = extra;
  switch (type) {
    case 'userSession': {
      const { membership, preference: p, self, contactDetails, offerCode, experimentData } = payload;
      const { data: bucket } = experimentData || {};
      const key = Object.keys(contactDetails.data)[0];
      return {
        ...baseValue,
        self: profileInfoDetail(undefined, self.data[0]),
        membership: membershipDetails(undefined, membership.data),
        preference: preference(undefined, p.data),
        contactDetails: contact(undefined, contactDetails.data[key].details),
        profilesData: profiles(undefined, self, membership)[key],
        offerCode: offer(undefined, offerCode.data),
        bucket,
      };
    }
    case 'shortlistID': {
      const { lists } = payload;

      return {
        ...baseValue,
        shortListIDs: (lists && lists.map(d => shortlistIDs(undefined, d))) || [],
      };
    }
    default:
      console.log('need to handle case in userSession Decorator :', type);
      return baseValue;
  }
};
