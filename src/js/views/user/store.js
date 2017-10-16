import Immutable from 'immutable';
import baseStore from '../store-base.js';

let store = _.cloneDeep(baseStore);

_.extend(store, {
  form: {
    model: {
    },
    errors: {},
    spList: [],
    codeList: [],
    cmdList: [],
    province: [],
    mobileCompany: [],
    bizType:[],
    status:[{'id': 1, 'name': '开'}, {'id': 0, 'name': '关'}],
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
