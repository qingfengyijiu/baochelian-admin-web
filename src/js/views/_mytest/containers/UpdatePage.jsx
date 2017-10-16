import React from 'react';
import Form from '../components/Form.jsx';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import CpAction from '../action.js';
import * as UtilAction from '../../_util/action.js';
import {navIds, ws} from '../../../lib/main.js';
import history from '../../history.jsx';

class UpdatePage extends React.Component {

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        document.title = '修改CP';
        let {form, actions, params} = this.props;
        actions.utilAction.changeNavActive(navIds.CP_LIST);
        actions.utilAction.showLoading();
        ws.get({
            url: '/api/mytest/' + params.id
        }).then(function(response) {
            actions.utilAction.hideLoading();
            if(response.code == 0) {
                form.model = response.data;
                actions.cpAction.changeForm(form);
            }
        })
    }

    onSubmit() {
        let {form, actions, params} = this.props;
        actions.utilAction.showLoading();
        ws.post({
            url: '/api/mytest/' + params.id,
            data: form.model
        }).then(function(response) {
            actions.utilAction.hideLoading();
            if(response.code == 0) {
                alert('修改成功');
                history.push('/cp');
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
)(UpdatePage)