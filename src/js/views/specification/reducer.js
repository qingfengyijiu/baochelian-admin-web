import initialState from "./store.js";
import baseReducer from '../reducer-base.js';

export default function(state = initialState, action = {}) {
    return baseReducer('SPECIFICATION', initialState, state, action);
}
