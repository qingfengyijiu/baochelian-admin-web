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
            classificationList: [],
            classificationListForSelect: []
        }
    }

    componentDidMount() {
        ws.get({
            url: '/api/classification'
        }).then(response => {
            if(response.code == 0) {
                let classificationList = response.data.classifications.map(item => {
	                return {
		                key: item.id,
		                value: item.name,
                        level: item.level
	                }
                });
                this.setState({
                    classificationList: classificationList
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
            if(field == "level"){
                if(value == null || value == 1) {
                    this.setState({
                        classificationListForSelect: []
                    });
                } else {
                    this.setState({
                        classificationListForSelect: classificationList.filter(item => item.level == value - 1)
                    })
                }
            }
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
            {classificationListForSelect} = this.state,
            {model, errors} = form;

        return (
            <div className="form count-form">
                  <FormField label="分组名称" error={errors.name}>
                      <FormField.Input value={model.name} onChange={this.onChangeField('name').bind(this)}/>
                  </FormField>
                  <FormField label="分组等级" error={errors.level}>
                      <FormField.Select datas={levelList} valueType="number" value={model.level} onChange={this.onChangeField('level').bind(this)} />
                  </FormField>
                  <FormField label="分组父级">
                      <FormField.Select datas={classificationListForSelect} value={model.parentClassificationLevel} onChange={this.onChangeField('parentClassificationLevel').bind(this)}/>
                  </FormField>
                  <FormField label="分组图标">
                      <FileUploadButton/>
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
