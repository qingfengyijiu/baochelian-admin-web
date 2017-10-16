"use strict";
export default  {
    changeOpRoles: function(data) {
        return {
            type: 'ENUMS_CHANGE_OP_ROLES',
            data
        }
    },
    changeProvince: function(data) {
        return {
            type: 'ENUMS_CHANGE_PROVINCE',
            data
        }
    }
}
