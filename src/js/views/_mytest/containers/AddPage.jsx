import React from 'react';
import Form from '../components/Form.jsx';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import CpAction from '../action.js';
import * as UtilAction from '../../_util/action.js';
import {ws, navIds} from '../../../lib/main.js';
import history from '../../history.jsx';

class AddPage extends React.Component {

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        document.title = '新增CP';
        let {actions} = this.props;
        actions.utilAction.changeNavActive(navIds.CP_ADD);
    }

    onSubmit() {
        let {form, actions} = this.props;
        actions.utilAction.showLoading();
        ws.post({
            url: '/api/mytest',
            data: form.model
        }).then(function (response) {
            actions.utilAction.hideLoading();
            if (response.code == 0) {
                alert('添加成功');
                history.push('/mytest');
            }
        })
    }

    render() {
        let {form, actions} = this.props;
        return (
            <Form form={form} actions={actions} onSubmit={this.onSubmit}/>
        );
    }
}
function mapStateToProps(state) {
    let form = state.reducers.mytest.toJS().form;
    return {
        form: form
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            cpAction: bindActionCreators(CpAction, dispatch),
            utilAction: bindActionCreators(UtilAction, dispatch)
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddPage)