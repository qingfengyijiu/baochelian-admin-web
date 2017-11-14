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
        document.title = '新增优惠券';
        let {actions} = this.props;
        actions.utilAction.changeNavActive(navIds.COUPON_ADD);
    }

    onSubmit() {
        let {form, actions} = this.props;
        actions.utilAction.showLoading();
        form.model.thresholdPerPerson = form.model.thresholdPerPerson != null ? Number(form.model.thresholdPerPerson) : null;
        form.model.initialCount = form.model.initialCount != null ? Number(form.model.initialCount) : null;
        form.model.validateDays = form.model.validateDays != null ? Number(form.model.validateDays) : null;
        form.model.couponAmountRule = {
            couponMode: form.model.couponMode,
            couponType: form.model.couponType,
            fullAmount: form.model.fullAmount != null ? Number(form.model.fullAmount) : null,
            fullCutAmount: form.model.fullCutAmount != null ? Number(form.model.fullCutAmount) : null,
            instantCutAmount: form.model.instantCutAmount != null ? Number(form.model.instantCutAmount) : null,
            discount: form.model.discount != null ? Number(form.model.discount) : null,
            fullCutAmountMax: form.model.fullCutAmountMax != null ? Number(form.model.fullCutAmountMax) : null,
            fullCutAmountMin: form.model.fullCutAmountMin != null ? Number(form.model.fullCutAmountMin) : null,
            instantCutAmountMax: form.model.instantCutAmountMax != null ? Number(form.model.instantCutAmountMax) : null,
            instantCutAmountMin: form.model.instantCutAmountMin != null ? Number(form.model.instantCutAmountMin) : null,
            calculateField: form.model.calculateField
        };
        ws.post({
            url: '/api/coupon',
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
    let form = state.reducers.coupon.toJS().form;
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
