import initialState from "./store.js";
import _p from "../../lib/immutable-process.js";
import baseReducer from "../reducer-base.js";

export default function(state = initialState, action = {}) {
    return baseReducer("spList", initialState, state, action);
}
