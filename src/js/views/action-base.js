export default function(model) {
    return {
        changeForm: function(data) {
            return {
                type: model + '_FORM_CHANGE',
                data
            }
        },
        resetForm: function() {
            return {
                type: model + '_FORM_RESET'
            }
        },
        changeListData: function(data) {
            return {
                type: model + '_LIST_CHANGE_DATA',
                data
            }
        },
        changeListQueryOptions: function(data) {
            return {
                type: model + '_LIST_CHANGE_QUERY_OPTIONS',
                data
            }
        },

        changeListPagination: function(data) {
            return {
                type: model + '_LIST_CHANGE_PAGINATION',
                data
            }
        },
        resetList: function() {
            return {
                type: model + '_LIST_RESET'
            }
        },
        resetListQueryOptions: function() {
            return {
                type: model + '_LIST_RESET_QUERY_OPTIONS'
            }
        },
        resetListPagination: function() {
            return {
                type: model + '_LIST_RESET_PAGINATION'
            }
        }
    }
}
