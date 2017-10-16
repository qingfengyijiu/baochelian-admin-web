export function showLoading() {
    return {
        type: "LOADING_SHOW"
    }
}

export function hideLoading() {
    return {
        type: "LOADING_HIDE"
    }
}

export function showToast(text) {
    return {
        type: "TOAST_SHOW",
        text
    }
}

export function hideToast() {
    return {
        type: "TOAST_HIDE"
    }
}

export function changeNavActive(data) {
    return {
        type: 'NAV_ACTIVE_CHANGE',
        data
    }
}

export function collapseNavBar(data) {
    return {
        type: 'NAV_BAR_COLLAPSE',
        data
    }
}

export function fixedNavBar(data) {
    return {
        type: 'NAV_BAR_FIXED',
        data
    }
}