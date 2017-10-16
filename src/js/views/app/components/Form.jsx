import React from 'react';
import FormField from '../../FormField.jsx';
import {validate} from '../validate.js';
import {Link} from 'react-router';
// var cookieUtil = require('../../../../../api/util/cookieUtil');
// var getToken = cookieUtil.getToken;
// console.log(getToken);

export default class extends React.Component {

    onChangeField(field) {
        return function(value) {
            let {form, actions} = this.props;
            form.model[field] = value;
            form.errors[field] = validate(field)(value, form.model);
            actions.appAction.changeForm(form);
        }
    }

    onReset(){
      let {actions} = this.props;
      actions.appAction.resetForm();
    }

    componentWillUnmount() {
        let {actions} = this.props;
        actions.appAction.resetForm();
    }


    render() {
        let {form, onSubmit} = this.props,
            {model, errors} = form;
        return (
            <div className="form cp-form">
              <FormField label="APP编号" error={errors.name}>
                  <FormField.Input value={model.id} disabled placeholder="App编号自动生成" onChange={this.onChangeField('id').bind(this)}/>
              </FormField>
              <FormField label="APP名称" error={errors.name}>
                  <FormField.Input value={model.name} onChange={this.onChangeField('name').bind(this)}/>
              </FormField>
              <FormField label="Secret" error={errors.content}>
                  <FormField.Input disabled placeholder="密钥自动生成" value={model.secret} onChange={this.onChangeField('secret').bind(this)}/>
              </FormField>
              <FormField label="回调地址" error={errors.callbackUrl}>
                  <FormField.Input value={model.callbackUrl} onChange={this.onChangeField('callbackUrl').bind(this)}/>
              </FormField>
              <FormField>
                  <div className="search-btn-container form form-search">
                      <FormField>
                        <button className="btn btn-primary" onClick={onSubmit}>保存</button>
                      </FormField>
                      <FormField>
                        <Link className="btn btn-primary" to="/app">返回</Link>
                      </FormField>
                  </div>
              </FormField>
              {/* <FormField>
                  <button className="btn btn-default form-control" onClick={onSubmit}>提交</button>
              </FormField> */}
            </div>
        )
    }
}
