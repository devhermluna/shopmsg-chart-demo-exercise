import API from '../api-config';

const resource = 'recipients';

export default {
  get(queryUrlParams) {
    return API.get(`${resource}.json/?${queryUrlParams}`);
  }
};
