import React from 'react';
import {Link} from 'react-router';
import FormField from '../../FormField.jsx';
import {validate} from '../validate.js';

export default class extends React.Component {

    onChangeField(field) {
        return function(value) {
            let {form, actions} = this.props;
            if(typeof value === "string") {
                value = value.replace(/ /g, "");
            }
            if(field === 'password' && value && value.length > 20) {
                return;
            }
            form.model[field] = value;
            form.errors[field] = validate(field)(value, form.model);
            actions.userAction.changeForm(form);
        }
    }

    componentWillUnmount() {
        let {actions} = this.props;
        actions.userAction.resetForm();
    }


    render() {
        let {form, opRoles, onSubmit, isUpdate} = this.props,
            {model, errors} = form,
            nameView;
        opRoles = _.map(opRoles, function(item) {
            return {
                key: item.roleId,
                value: item.roleName
            }
        });
        if(isUpdate) {
            nameView = (
                <div className="form-control">{model.name}</div>
            )
        } else {
            nameView = (
                <FormField.Input value={model.name} onChange={this.onChangeField('name').bind(this)}/>
            )
        }
        return (
            <div className="form cp-form">
                <FormField label="账号" error={errors.name} required={!isUpdate}>
                    {nameView}
                </FormField>
                <FormField label="密码" error={errors.password} required>
                    <FormField.Input type="password" value={model.password}
                                     placeholder="8-20位大小写字母和数字组合的密码"
                                     onChange={this.onChangeField('password').bind(this)}/>
                </FormField>
                <FormField label="角色" error={errors.role} required>
                    <FormField.Select datas={opRoles} value={model.role} valueType="number" onChange={this.onChangeField('role').bind(this)}/>
                </FormField>
                <FormField>
                    <div className="search-btn-container form form-search">
                        <FormField>
                            <button className="btn btn-primary" onClick={onSubmit}>保存</button>
                        </FormField>
                        <FormField>
                            <Link className="btn btn-primary" to="/user">返回</Link>
                        </FormField>
                    </div>
                </FormField>
            </div>
        )
    }
}