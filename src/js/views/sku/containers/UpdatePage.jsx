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
        document.title = '编辑SKU';
        let {form, actions, params} = this.props;
        actions.utilAction.changeNavActive(navIds.SKU_LIST);
        actions.utilAction.showLoading();

        ws.get({
            url: '/api/sku/' + params.id
        }).then(function(response) {
            actions.utilAction.hideLoading();
            if(response.code == 0) {
                form.model = response.data;
                form.model.picture = response.data.picture ? response.data.picture.split(",") : null;
                form.model.thumbnail = response.data.thumbnail ? response.data.thumbnail.split(",") : null;
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
	    form.model.thumbnail = form.model.thumbnail ? form.model.thumbnail.join(",") : null;
	    form.model.picture = form.model.picture ? form.model.picture.join(",") : null;
	    form.model.saleVolume = 10;
        ws.post({
            url: '/api/sku/' + params.id,
            data: form.model
        }).then(function(response) {
            actions.utilAction.hideLoading();
            if(response.code == 0) {
                alert('编辑成功');
                history.goBack();
            }else{
              alert(response.msg);
              console.log(response.data);
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
)(UpdatePage)
