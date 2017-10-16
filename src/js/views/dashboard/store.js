import Immutable from 'immutable';
import baseStore from '../store-base.js';

let store = _.cloneDeep(baseStore);

_.extend(store, {
  form: {
    model: {
      name: null,
      fullName: null,
      upayCompany: null
    },
    errors: {},
    spList: [],
    upayCompanyList:[],
  },
  detailList: {
    datas: [],
    queryOptions: {},
    pagination: {
        pageNo: 1,
        pageSize: 10,
        total: 0
    }
  }
});

export default Immutable.fromJS({
    ...store
})
