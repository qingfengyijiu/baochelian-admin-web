import React from 'react';
import {Link} from 'react-router';
import CountChargeListGrid from '../components/CountChargeListGrid.jsx';
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
        document.title = '代码资费配置';
        let {actions} = this.props;
        actions.utilAction.changeNavActive(navIds.APP);
        this.refresh();
    }

    refresh() {
        this.refs.grid.refresh();
    }

    render() {
        let {queryOptions, actions} = this.props;
        return (
            <div className="fbt-table">
                {/* <div className="grid-operation-zone">
                    <Link className="btn btn-primary" to="/app/add">添加</Link>
                    <div className="col-sm-1">
                      <Link className="btn btn-primary" to="/app">返回</Link>
                    </div>
                </div> */}
                <CountChargeListGrid ref="grid" {...this.props} refresh={this.refresh}/>
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
