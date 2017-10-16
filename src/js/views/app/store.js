import Immutable from 'immutable';
import baseStore from '../store-base.js';
import _ from 'lodash';

_.extend(baseStore, {
  form: {
    model: {
      status: 0,
      cpKey:"",
      callbackUrl:null
    },
    errors: {}
  }
});

export default Immutable.fromJS({
    ...baseStore
})
