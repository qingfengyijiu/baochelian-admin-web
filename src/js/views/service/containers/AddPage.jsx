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
        document.title = '新增服务';
        let {actions} = this.props;
        actions.utilAction.changeNavActive(navIds.SERVICE_ADD);
    }

    onSubmit() {
        let {form, actions} = this.props;
        actions.utilAction.showLoading();
        form.model.basicDistance = Number(form.model.basicDistance);
        form.model.profitAllocations = {
            platformFee: form.model.platformFee,
            driverFee: form.model.driverFee,
            technicianFee: form.model.technicianFee,
            parentRefererFee: form.model.parentRefererFee,
            grandpaRefererFee: form.model.grandpaRefererFee,
            firstOsFee: form.model.firstOsFee,
            secondOsFee: form.model.secondOsFee
        };
        ws.post({
            url: '/api/service',
            data: form.model
        }).then(function(response) {
            actions.utilAction.hideLoading();
            if(response.code == 0) {
                alert('新增成功');
                actions.thisAction.resetListPagination();
                history.goBack();
            }else{
              alert(response.message);
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
    let form = state.reducers.service.toJS().form;
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
