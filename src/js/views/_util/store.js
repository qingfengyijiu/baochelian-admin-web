import Immutable from "immutable";

export default Immutable.fromJS({
    loading: 0,
    toast: {
        text: "",
        show: false
    },
    nav: {
        activeId: null,
        collapse: false,
        fixed: true
    }
})