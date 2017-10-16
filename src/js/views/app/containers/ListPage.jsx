import React from 'react';
import {Link} from 'react-router';
import ListGrid from '../components/ListGrid.jsx';
import SearchForm from '../components/SearchForm.jsx';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import AppAction from '../action.js';
import * as UtilAction from '../../_util/action.js';
import {navIds, ws} from '../../../lib/main.js';

class ListPage extends React.Component {

    constructor(props) {
        super(props);
        this.refresh = this.refresh.bind(this);
    }

    componentDidMount() {
        document.title = 'APP信息';
        let {actions, queryOptions, pagination, params} = this.props;
        actions.utilAction.changeNavActive(navIds.APP_LIST);
        //判断是否存在appName和cpKey
        if (typeof params.cpKey != "undefined") {
          queryOptions.cpKey = params.cpKey;
        }
        if (typeof params.appName != 'undefined') {
          queryOptions.name = params.appName;
        }
        if (typeof params.appKey != 'undefined') {
          queryOptions.appKey = params.appKey;
        }
        actions.appAction.changeListQueryOptions(queryOptions);

        this.refresh();

    }

    componentWillUnmount(){
      let {actions} = this.props;
      actions.appAction.resetList();
    }

    refresh() {
        this.refs.grid.refresh();
    }

    render() {
        let {queryOptions, actions} = this.props;
        return (
            <div className="fbt-table">
                <SearchForm model={queryOptions} actions={actions} onSearch={this.refresh}/>
                <div className="grid-operation-zone">
                    {/* <Link className="btn btn-primary" to="/app/add">新增</Link> */}
                    {/* <div className="col-sm-1">
                      <Link className="btn btn-primary" to="/app">返回</Link>
                    </div> */}
                </div>
                <ListGrid ref="grid" {...this.props} refresh={this.refresh}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    let listState = state.reducers.app.toJS().list;
    return {...listState};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            appAction: bindActionCreators(AppAction, dispatch),
            utilAction: bindActionCreators(UtilAction, dispatch)
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListPage)
