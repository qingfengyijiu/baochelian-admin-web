import initialState from "./store.js";
import baseReducer from '../reducer-base.js';

export default function(state = initialState, action = {}) {
    return baseReducer('BRAND', initialState, state, action);
}
