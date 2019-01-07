import API from '../api-config';

const resource = 'optins';

export default {
  get(queryUrlParams) {
    return API.get(`${resource}.json/?${queryUrlParams}`);
  }
};
