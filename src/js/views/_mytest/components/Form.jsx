import React from 'react';
import FormField from '../../FormField.jsx';
import {validate} from '../validate.js';

export default class extends React.Component {

    onChangeField(field) {
        return function(value) {
            let {form, actions} = this.props;
            form.model[field] = value;
            form.errors[field] = validate(field)(value, form.model);
            actions.cpAction.changeForm(form);
        }
    }

    componentWillUnmount() {
        let {actions} = this.props;
        actions.cpAction.resetForm();
    }


    render() {
        let {form, onSubmit} = this.props,
            {model, errors} = form;
        return (
            <div className="form cp-form">
                <FormField label="CP名称：" error={errors.name}>
                    <FormField.Input value={model.name} onChange={this.onChangeField('name').bind(this)}/>
                </FormField>
                <FormField label="CP说明：" error={errors.comment}>
                    <FormField.Textarea value={model.comment} onChange={this.onChangeField('comment').bind(this)}/>
                </FormField>
                <FormField>
                    <button className="btn btn-default form-control" onClick={onSubmit}>提交</button>
                </FormField>
            </div>
        )
    }
}