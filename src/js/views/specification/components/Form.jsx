import React from 'react';
import FormField from '../../FormField.jsx';
import {validate} from '../validate.js';
import {Link} from 'react-router';
import history from '../../history.jsx';
import ws from '../../../lib/ws';
import FileUploadButton from '../../FileUploadButton.jsx';

const levelList = [{
    key: 1,
    value: "等级一"
}, {
    key: 2,
    value: "等级二"
}, {
    key: 3,
    value: "等级三"
}];

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            specificationCategoryList: []
        }
    }

    componentDidMount() {
        ws.get({
            url: '/api/specificationCategory'
        }).then(response => {
            if(response.code == 0) {
                let specificationCatetoryList = response.data.categories.map(item => {
	                return {
		                key: item.id,
		                value: item.name
	                }
                });
                this.setState({
                    specificationCategoryList: specificationCatetoryList
                });
            } else {
                alert(response.msg);
            }
        })
    }

    onChangeField(field) {
        return function(value) {
            let {form, actions} = this.props,
                {classificationList} = this.state;
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
            {specificationCategoryList} = this.state,
            {model, errors} = form;

        return (
            <div className="form count-form">
                <FormField label="规格种类" error={errors.specificationCategoryId}>
                    <FormField.Select datas={specificationCategoryList} value={model.specificationCategoryId} onChange={this.onChangeField('specificationCategoryId').bind(this)} />
                </FormField>
                <FormField label="值" error={errors.specificationValue}>
                    <FormField.Input value={model.specificationValue} onChange={this.onChangeField('specificationValue').bind(this)}/>
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
