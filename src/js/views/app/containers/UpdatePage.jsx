import React from 'react';
import Form from '../components/Form.jsx';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import AppAction from '../action.js';
import * as UtilAction from '../../_util/action.js';
import {navIds, ws} from '../../../lib/main.js';
import history from '../../history.jsx';

class UpdatePage extends React.Component {

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        document.title = 'APP编辑';
        let {form, actions, params} = this.props;
        actions.utilAction.changeNavActive(navIds.APP);
        actions.utilAction.showLoading();
        ws.get({
            url: '/api/app/' + params.id
        }).then(function(response) {
            actions.utilAction.hideLoading();
            if(response.code == 0) {
                form.model = response.data;
                actions.appAction.changeForm(form);
            }
        })
    }

    onSubmit() {
        let {form, actions, params} = this.props;
        actions.utilAction.showLoading();
        ws.post({
            url: '/api/app/' + params.id,
            data: form.model
        }).then(function(response) {
            actions.utilAction.hideLoading();
            if(response.code == 0) {
                alert('编辑成功');
                history.push('/app');
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
    let form = state.reducers.app.toJS().form;
    return {
        form: form
    }
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
)(UpdatePage)
