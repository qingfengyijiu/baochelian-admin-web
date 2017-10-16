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
        let {actions} = this.props;
        actions.utilAction.changeNavActive(navIds.APP_LIST);
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
        let _this = this;
        let showSearchForm = function(){
            if (roleType == 2) {
                return(
                  <SearchForm model={queryOptions} actions={actions} onSearch={_this.refresh}/>
                )
            }else{
              return "";
            }
        }
        let realClass = 'btn btn-primary';
        if (roleType !== '2') {
          realClass = "btn btn-primary hide";
        }
        return (
            <div className="fbt-table">
                { showSearchForm() }
                {/* className={ roleType == '1' ? 'hide' : '' } */}
                <div className="grid-operation-zone">
                    <Link className={ realClass } to="/app/add">新增</Link>
                </div>
                <ListGrid ref="grid" {...this.props} refresh={this.refresh}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    let listState = state.reducers.appRole.toJS().list;
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
