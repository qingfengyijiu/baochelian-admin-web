import React from 'react';
import Form from '../components/Form.jsx';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import AppAction from '../action.js';
import * as UtilAction from '../../_util/action.js';
import {validateAll, isValid,validate} from '../validate.js';
import {ws, navIds} from '../../../lib/main.js';
import history from '../../history.jsx';

class AddPage extends React.Component {

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        document.title = 'APP新增';
        let {actions} = this.props;
        actions.utilAction.changeNavActive(navIds.APP_LIST);
    }

    onSubmit() {
        let {form, actions} = this.props;
        let errors = validateAll(form.model);
        if(!isValid(errors)) {
            form.errors = errors;
            actions.appAction.changeForm(form);
            return;
        }

        ws.post({
            url: '/api/app',
            data: form.model
        }).then(function(response) {
            actions.utilAction.hideLoading();
            if(response.code == 0) {
                alert('新增成功');
                actions.appAction.resetListPagination();
                history.push('/app');
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
    let form = state.reducers.appRole.toJS().form;
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
)(AddPage)
