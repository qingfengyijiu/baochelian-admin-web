import React from 'react';
import FormField from '../../FormField.jsx';
import {validate} from '../validate.js';
import {Link} from 'react-router';
import history from '../../history.jsx';
import ws from '../../../lib/ws';
import FileUploadButton from '../../FileUploadButton.jsx';

const typeList = [{
    key: 0,
    value: "关键属性"
}, {
    key: 1,
    value: "销售属性"
}, {
    key: 2,
    value: "非关键属性"
}];

export default class extends React.Component {

    constructor(props) {
        super(props);
    }

    onChangeField(field) {
        return function(value) {
            let {form, actions} = this.props;
            form.model[field] = value;
            form.errors[field] = validate(field)(value, form.model);
            actions.thisAction.changeForm(form);
        }
    }

    componentWillUnmount() {
	    let {actions} = this.props;
	    actions.thisAction.resetForm();
    }

    onReset(){
      let {actions} = this.props;
      actions.thisAction.resetForm();
    }

    back(){
      history.goBack();
    }

    render() {
        let {form, onSubmit} = this.props,
            {model, errors} = form;

        return (
            <div className="form count-form">
                  <FormField label="规格种类名称" error={errors.name}>
                      <FormField.Input value={model.name} onChange={this.onChangeField('name').bind(this)}/>
                  </FormField>
                  <FormField label="规格种类属性" error={errors.level}>
                      <FormField.Select datas={typeList} valueType="number" value={model.specificationType} onChange={this.onChangeField('specificationType').bind(this)} />
                  </FormField>
                  <FormField>
                      <div className="search-btn-container form form-search">
                          <FormField>
                            <button className="btn btn-primary" onClick={onSubmit}>保存</button>
                          </FormField>
                          <FormField>
                            <Link className="btn btn-primary" onClick={this.back.bind(this)}>返回</Link>
                          </FormField>
                      </div>
                  </FormField>
            </div>
        )
    }
}
