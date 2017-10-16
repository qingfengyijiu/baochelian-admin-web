import _p from "../lib/immutable-process.js";
import Immutalbe from 'immutable';

function form(model, initialState, state, action) {
    return function(state = initialState.get('form'), action = {}) {
        let data = _p(action.data);
        switch (action.type) {
            case model + '_FORM_CHANGE':
                return state = data;
            case model + '_FORM_RESET':
                return initialState.get('form');
            case model + '_FORM_CHANGE_MODEL':
                return state.set('model', data);
            default:
                return state;
        }
    }(state, action);

}

function list(model, initialState, state, action) {
    return function(state = initialState.get('list'), action = {}) {
        let data = _p(action.data);
        switch (action.type) {
            case model + '_LIST_CHANGE_DATA':
                return state.set('datas', data);
            case model + '_LIST_CHANGE_QUERY_OPTIONS':
                return state.set('queryOptions', data);
            case model + '_LIST_CHANGE_PAGINATION':
                return state.set('pagination', data);
            case model + '_LIST_RESET':
                return initialState.get("list");
            case model + '_LIST_RESET_QUERY_OPTIONS':
                return state.set("queryOptions", initialState.get('list').get("queryOptions"));
            case model + '_LIST_RESET_PAGINATION':
                return state.set('pagination', initialState.get('list').get('pagination'));
            default:
                return state;
        }
    }(state, action);

}

export default function(model, initialState, state, action) {
    return state
            .set('form', form(model, initialState, state.get('form'), action))
            .set('list', list(model, initialState, state.get('list'), action));
}
