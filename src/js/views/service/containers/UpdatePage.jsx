import React from 'react';
import Form from '../components/Form.jsx';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ThisAction from '../action.js';
import * as UtilAction from '../../_util/action.js';
import {navIds, ws} from '../../../lib/main.js';
import history from '../../history.jsx';

class UpdatePage extends React.Component {

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        document.title = '编辑服务';
        let {form, actions, params} = this.props;
        actions.utilAction.changeNavActive(navIds.SERVICE_LIST);
        actions.utilAction.showLoading();

        ws.get({
            url: '/api/service/' + params.id
        }).then(function(response) {
            actions.utilAction.hideLoading();
            if(response.code == 0) {
                form.model = {...response.data, ...response.data.profitAllocations};
                actions.thisAction.changeForm(form);
            }
        });
        actions.utilAction.hideLoading();
        actions.thisAction.changeForm(form);
    }

    onSubmit() {

        //  提交数据
        let {form, actions, params} = this.props;
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
            url: '/api/service/' + params.id,
            data: form.model
        }).then(function(response) {
            actions.utilAction.hideLoading();
            if(response.code == 0) {
                alert('编辑成功');
	            history.push('/service');
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
)(UpdatePage)
