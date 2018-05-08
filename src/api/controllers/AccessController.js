import requestService from '../services/requestService';

const getGuestAccessToken = (logger, data, query, auth) => {
  const request = {
    method: 'post',
    url: `/users/login`,
    data: { data },
  };
  return requestService(logger, query, auth, request, d => d.data);
};

getGuestAccessToken.isPublic = true;

export default {
  getGuestAccessToken,
};
