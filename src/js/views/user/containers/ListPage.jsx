import React from 'react';
import {Link} from 'react-router';
import ListGrid from '../components/ListGrid.jsx';
import SearchForm from '../components/SearchForm.jsx';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import UserAction from '../action.js';
import EnumAction from '../../_enums/action.js';
import * as UtilAction from '../../_util/action.js';
import {navIds, ws} from '../../../lib/main.js';

class ListPage extends React.Component {

    constructor(props) {
        super(props);
        this.refresh = this.refresh.bind(this);
    }

    componentDidMount() {
        document.title = '用户管理';
        let {actions, opRoles} = this.props;
        actions.utilAction.changeNavActive(navIds.USER_LIST);
        //this.refresh();
    }

    componentWillUnmount() {
        let {actions} = this.props;
        actions.userAction.resetList();
    }

    refresh() {
        this.refs.grid.refresh();
    }

    render() {
        let {queryOptions, actions, opRoles} = this.props;
        return (
            <div className="fbt-table">
                <SearchForm model={queryOptions} opRoles={opRoles} actions={actions} onSearch={this.refresh}/>
                <div className="grid-operation-zone">
                    <Link className="btn btn-primary" to="/user/add">新增</Link>
                </div>
                <ListGrid ref="grid" {...this.props} refresh={this.refresh}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    let listState = state.reducers.user.toJS().list,
        opRoles = state.reducers.enums.toJS().opRoles;
    return {
        ...listState,
        opRoles
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            userAction: bindActionCreators(UserAction, dispatch),
            utilAction: bindActionCreators(UtilAction, dispatch),
            enumAction: bindActionCreators(EnumAction, dispatch)
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListPage)