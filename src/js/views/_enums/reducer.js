import initialState from "./store.js";
import _p from "../../lib/immutable-process.js";

export default function(state = initialState, action = {}) {
    let data = _p(action.data);
    switch (action.type) {
        case "ENUMS_CHANGE_OP_ROLES":
            return state.set("opRoles", data);
        case "ENUMS_CHANGE_PROVINCE":
            return state.set("province", data);
        default:
            return state;
    }
}