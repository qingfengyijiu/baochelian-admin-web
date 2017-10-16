import React from 'react';
import FormField from '../../FormField.jsx';
import {validate} from '../validate.js';
import {Link} from 'react-router';
import history from '../../history.jsx';

export default class extends React.Component {

    onChangeField(field) {
        return function(value) {
            let {form, actions} = this.props;
            if(field == "isDefaultDialog"){
              value = parseInt (value);
            }
            form.model[field] = value;
            form.errors[field] = validate(field)(value, form.model);
            actions.thisAction.changeForm(form);
        }
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
              <FormField label="品牌名称" error={errors.name}>
                  <FormField.Input value={model.name} onChange={this.onChangeField('name').bind(this)}/>
              </FormField>
              <FormField label="英文名称" error={errors.nameEnglish}>
                  <FormField.Input value={model.nameEnglish} onChange={this.onChangeField('nameEnglish').bind(this)}/>
              </FormField>
              <FormField label="产地">
                  <FormField.Input value={model.produceLocation} onChange={this.onChangeField('produceLocation').bind(this)}/>
              </FormField>
              <FormField>
                  <div  className="search-btn-container form form-search">
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
