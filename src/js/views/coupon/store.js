import Immutable from 'immutable';
import baseStore from '../store-base.js';
import _ from 'lodash';

let store = new Object();
_.extend(store, baseStore);
store.form.model.calculateField = 1;

export default Immutable.fromJS({
    ...store
})
