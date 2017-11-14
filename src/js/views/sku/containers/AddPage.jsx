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
        document.title = '新增SKU';
        let {actions} = this.props;
        actions.utilAction.changeNavActive(navIds.SKU_ADD);
    }

    onSubmit() {
        let {form, actions} = this.props;
        actions.utilAction.showLoading();
        form.model.spuId = this.props.params.id;
        form.model.length = Number(form.model.length);
        form.model.height = Number(form.model.height);
        form.model.grossWeight = Number(form.model.grossWeight);
        form.model.storage = Number(form.model.storage);
        form.model.width = Number(form.model.width);
        form.model.profitAllocations = {
            platformFee: form.model.platformFee,
            driverFee: form.model.driverFee,
            technicianFee: form.model.technicianFee,
            parentRefererFee: form.model.parentRefererFee,
            grandpaRefererFee: form.model.grandpaRefererFee,
            firstOsFee: form.model.firstOsFee,
            secondOsFee: form.model.secondOsFee
        }
        ws.post({
            url: '/api/sku',
            data: form.model
        }).then(function(response) {
            actions.utilAction.hideLoading();
            if(response.code == 0) {
                alert('新增成功');
                actions.thisAction.resetListPagination();
                history.push("/sku");
            }else{
              alert(response.message);
            }
        })
    }

    render() {
        let {form, actions, params} = this.props;
        return (
            <Form form={form} actions={actions} onSubmit={this.onSubmit} spuId={params.id}/>
        )
    }
}

function mapStateToProps(state) {
    let form = state.reducers.sku.toJS().form;
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
