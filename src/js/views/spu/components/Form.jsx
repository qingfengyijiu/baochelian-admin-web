import React from 'react';
import FormField from '../../FormField.jsx';
import {validate} from '../validate.js';
import {Link} from 'react-router';
import history from '../../history.jsx';
import ws from '../../../lib/ws';
import ImageUploader from '../../ImageUploader.jsx';
import ImageUploaderGroup from '../../ImageUploaderGroup.jsx';

const statusList = [{
    key: false,
    value: "上架"
}, {
    key: true,
    value: "下架"
}];

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            brandList: [],
            classificationList: [],
            specificationCategoryList: []
        }
    }

    componentDidMount() {
        ws.get({
            url: '/api/brand'
        }).then(response => {
            if(response.code == 0) {
                let brandList = response.data.brands.map(item => {
                    return {
                        key: item.id,
                        value: item.name
                    }
                });
                this.setState({
                    brandList
                });
            } else {
                alert(response.message);
            }
        });
        ws.get({
            url: '/api/classification'
        }).then(response => {
            if(response.code == 0) {
                let classificationList = response.data.classifications.map(item => {
	                return {
		                key: item.id,
		                value: item.name
	                }
                });
                this.setState({
                    classificationList: classificationList
                });
            } else {
                alert(response.message);
            }
        });
        ws.get({
            url: '/api/specificationCategory'
        }).then(response => {
            if(response.code == 0) {
                let specificationCategoryList = response.data.categories.map(item => {
                    return {
                        key: item.id,
                        value: item.name
                    }
                })
                this.setState({
                    specificationCategoryList
                });
            } else {
                alert(response.message);
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

    getSpuPictureView = () => {
        let picture = this.props.model.picture,
            links = picture ? picture.split(",") : [];
        links.push(null);
        return links.map(item => {
            return (
                <ImageUploader key={item} value={item} businessType="spu_picture" onChange={this.onChangeField("picture").bind(this)}/>
            )
        })
    }

    render() {
        let {form, onSubmit} = this.props,
            {brandList, classificationList, specificationCategoryList} = this.state,
            {model, errors} = form;
        return (
            <div className="form count-form">
                <FormField label="商品名称" error={errors.name}>
                  <FormField.Input value={model.name} onChange={this.onChangeField('name').bind(this)}/>
                </FormField>
                <FormField label="商品标题" error={errors.description}>
                    <FormField.Input value={model.title} onChange={this.onChangeField('title').bind(this)}/>
                </FormField>
                <FormField label="商品品牌" error={errors.brandId}>
                    <FormField.Select datas={brandList} value={model.brandId} onChange={this.onChangeField('brandId').bind(this)}/>
                </FormField>
                <FormField label="商品分组" error={errors.classificationId}>
                    <FormField.Select datas={classificationList} value={model.classificationId} onChange={this.onChangeField('classificationId').bind(this)}/>
                </FormField>
                <FormField label="规格一" error={errors.level}>
                  <FormField.Select datas={specificationCategoryList} value={model.specificationCategoryId1} onChange={this.onChangeField('specificationCategoryId1').bind(this)} />
                </FormField>
                <FormField label="规格二（可选）" error={errors.level}>
                    <FormField.Select datas={specificationCategoryList} value={model.specificationCategoryId2} onChange={this.onChangeField('specificationCategoryId2').bind(this)} />
                </FormField>
                <FormField label="规格三（可选）" error={errors.level}>
                    <FormField.Select datas={specificationCategoryList} value={model.specificationCategoryId3} onChange={this.onChangeField('specificationCategoryId3').bind(this)} />
                </FormField>
                <FormField label="外网价格">
                  <FormField.Input value={model.overviewPrice} onChange={this.onChangeField('overviewPrice').bind(this)}/>
                </FormField>
                <FormField label="商品状态">
                    <FormField.Select datas={statusList} valueType="boolean" value={model.isDeleted} onChange={this.onChangeField('isDeleted').bind(this)}/>
                </FormField>
                <FormField label="缩略图">
                    <ImageUploaderGroup value={model.thumbnail} businessType="spu_thumbnail" onChange={this.onChangeField("thumbnail").bind(this)}/>
                </FormField>
                <FormField label="商品大图">
                    <ImageUploaderGroup value={model.picture} businessType="spu_picture" onChange={this.onChangeField("picture").bind(this)}/>
                </FormField>
                <FormField label="商品描述">
                    <FormField.Input value={model.description} onChange={this.onChangeField("description").bind(this)}/>
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
