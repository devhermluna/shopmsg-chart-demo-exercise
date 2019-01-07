import Optins from './repositories/Optins';
import Recipients from './repositories/Recipients';

const repositories = {
  optins: Optins,
  recipients: Recipients
};

export default {
  get: name => repositories[name]
};
