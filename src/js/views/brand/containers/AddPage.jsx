import React from 'react';
import Form from '../components/Form.jsx';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ThisAction from '../action.js';
import * as UtilAction from '../../_util/action.js';
import {ws, navIds} from '../../../lib/main.js';
import history from '../../history.jsx';

class AddPage extends React.Component {

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        document.title = '新增品牌';
        let {actions} = this.props;
        actions.utilAction.changeNavActive(navIds.COUNT_LIST);
    }

    onSubmit() {
        let {form, actions} = this.props;
        actions.utilAction.showLoading();
        ws.post({
            url: '/api/brand',
            data: form.model
        }).then(function(response) {
            actions.utilAction.hideLoading();
            if(response.code == 0) {
                alert('新增成功');
                actions.thisAction.resetListPagination();
                history.goBack();
            }else{
              alert(response.msg);
            }
        })
    }

    render() {
        let {form, actions} = this.props;
        return (
            <Form form={form} actions={actions} onSubmit={this.onSubmit}/>
        )
    }
}

function mapStateToProps(state) {
    let form = state.reducers.brand.toJS().form;
    return {
        form: form
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            thisAction: bindActionCreators(ThisAction, dispatch),
            utilAction: bindActionCreators(UtilAction, dispatch)
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddPage)
