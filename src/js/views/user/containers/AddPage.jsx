import React from 'react';
import Form from '../components/Form.jsx';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import UserAction from '../action.js';
import * as UtilAction from '../../_util/action.js';
import EnumAction from '../../_enums/action.js';
import {ws, navIds} from '../../../lib/main.js';
import history from '../../history.jsx';
import {validateAll, isValid} from '../validate.js';

class AddPage extends React.Component {

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        document.title = '用户新增';
        let {actions, opRoles} = this.props;
        actions.utilAction.changeNavActive(navIds.USER_LIST);
        if(opRoles == null || opRoles.length === 0) {
            ws.get({
                url: '/api/enums/op/roles'
            }).then(function(response) {
                if(response.code === 0) {
                    actions.enumAction.changeOpRoles(response.data);
                }
            })
        }
    }

    onSubmit() {
        let {form, actions} = this.props;
        let errors = validateAll(form.model);
        if(!isValid(errors)) {
            form.errors = errors;
            actions.userAction.changeForm(form);
            return;
        }
        actions.utilAction.showLoading();
        ws.post({
            url: '/api/user',
            data: form.model
        }).then(function(response) {
            actions.utilAction.hideLoading();
            if(response.code == 0) {
                alert('新增成功');
                history.push('/user');
            }
        })
    }

    render() {
        return (
            <Form {...this.props} onSubmit={this.onSubmit}/>
        )
    }
}

function mapStateToProps(state) {
    let form = state.reducers.user.toJS().form,
        opRoles = state.reducers.enums.toJS().opRoles;
    return {
        form: form,
        opRoles
    }
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
)(AddPage)