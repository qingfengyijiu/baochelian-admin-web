import React from 'react';
import FormField from '../../FormField.jsx';
import {validate} from '../validate.js';
import {Link} from 'react-router';
import history from '../../history.jsx';
import ws from '../../../lib/ws';
import ImageUploader from '../../ImageUploader.jsx';
import ImageUploaderGroup from '../../ImageUploaderGroup.jsx';

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            serviceCategoryList: []
        }
    }

    componentDidMount() {
        ws.get({
            url: '/api/serviceCategory/list/simple'
        }).then(response => {
            if(response.code == 0) {
                let serviceCategoryList = response.data.bizServiceCategories.map(item => {
                    return {
                        key: item.id,
                        value: item.name
                    }
                });
                this.setState({
                    serviceCategoryList
                });
            } else {
                alert(response.message);
            }
        })
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

    back() {
        history.goBack();
    }


    render() {
        let {form, onSubmit} = this.props,
            {serviceCategoryList} = this.state,
            {model, errors} = form;
        return (
            <div className="form count-form">
                <FormField label="名称" error={errors.name}>
                    <FormField.Input value={model.name} onChange={this.onChangeField('name').bind(this)} />
                </FormField>
                <FormField label="Icon" error={errors.icon}>
                    <ImageUploader value={model.icon} onChange={this.onChangeField("icon").bind(this)} businessType="service_categories"/>
                </FormField>
                <FormField label="父服务" error={errors.parentServiceId}>
                  <FormField.Select datas={serviceCategoryList} value={model.parentServiceId} onChange={this.onChangeField('parentServiceId').bind(this)} />
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
