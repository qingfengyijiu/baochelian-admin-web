import React from 'react';
import FormField from '../../FormField.jsx';
import {validate} from '../validate.js';
import {Link} from 'react-router';
import history from '../../history.jsx';
import ws from '../../../lib/ws';
import ImageUploader from '../../ImageUploader.jsx';

const LIMIT_RULE_LIST = [{
    key: 1,
    value: "分组规则"
}, {
    key: 2,
    value: "品牌规则"
}, {
    key: 3,
    value: "服务规则"
}];

const VALIDATE_RULE_LIST = [{
    key: 1,
    value: '限定起始日期',
}, {
    key: 2,
    value: '领券日起x天有效'
}, {
    key: 3,
    value: '永久有效'
}];

const COUPON_MODE_LIST = [{
    key: 1,
    value: '固定金额优惠'
}, {
    key: 2,
    value: '浮动金额优惠'
}];

const FIXED_COUPON_TYPE_LIST = [{
    key: 1,
    value: '满减'
}, {
    key: 2,
    value: '立减'
}, {
    key: 3,
    value: '折扣'
}];

const FLOAT_COUPON_TYPE_LIST = [{
	key: 1,
	value: '满减'
}, {
	key: 2,
	value: '立减'
}];

const CALCULATE_FIELD_LIST = [{
    key: 1,
    value: '订单金额'
}, {
    key: 2,
    value: '立减'
}, {
    key: 3,
    value: '折扣'
}];


export default class extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            brandList: [],
            classificationList: [],
            specificationCategoryList: [],
            spuList: [],
            serviceCategoryList: [],
            serviceList: []
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
            url: '/api/classification/list/simple'
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
            url: '/api/spu'
        }).then(response => {
            if(response.code == 0) {
                let spuList = response.data.spus.map(item => {
                    return {
                        key: item.id,
                        value: item.name
                    }
                })
                this.setState({
                    spuList
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

    render() {
        let {form, onSubmit} = this.props,
            {brandList, classificationList, specificationCategoryList, spuList, serviceCategoryList, serviceList} = this.state,
            {model, errors} = form;
        return (
            <div className="form count-form">
                <FormField label="优惠券名称" error={errors.name}>
                    <FormField.Input value={model.name} onChange={this.onChangeField('name').bind(this)} />
                </FormField>
                <FormField label="优惠券规则" error={errors.couponRule}>
                    <FormField.RadioGroup datas={LIMIT_RULE_LIST} valueType="number" value={model.couponRule} onChange={this.onChangeField('couponRule').bind(this)} />
                </FormField>
                <FormField label="分组规则" error={errors.classificationId} hide={model.couponRule !== 1}>
                    <FormField.Select datas={classificationList} value={model.classificationId} onChange={this.onChangeField('classificationId').bind(this)} />
                </FormField>
                <FormField label="品牌" error={errors.brandId} hide={model.couponRule !== 2}>
                    <FormField.Select datas={brandList} value={model.brandId} onChange={this.onChangeField('brandId').bind(this)} />
                </FormField>
                <FormField label="商品SPU" error={errors.spuId} hide={model.couponRule !== 2}>
                    <FormField.Select datas={spuList} value={model.spuId} onChange={this.onChangeField('spuId').bind(this)} />
                </FormField>
                <FormField label="服务分类" error={errors.serviceCategoryId} hide={model.couponRule !== 3}>
                    <FormField.Select datas={serviceCategoryList} value={model.serviceCategoryId} onChange={this.onChangeField('serviceCategoryId').bind(this)} />
                </FormField>
                <FormField label="服务细项" error={errors.serviceId} hide={model.couponRule !== 3}>
                    <FormField.Select datas={serviceList} value={model.serviceId} onChange={this.onChangeField('serviceId').bind(this)} />
                </FormField>
                <FormField label="优惠模式" error={errors.couponMode}>
                    <FormField.Select datas={COUPON_MODE_LIST} valueType="number" value={model.couponMode} onChange={this.onChangeField('couponMode').bind(this)} />
                </FormField>
                <FormField label="优惠类型" error={errors.couponType}>
                    <FormField.Select datas={model.couponMode === 1 ? FIXED_COUPON_TYPE_LIST : FLOAT_COUPON_TYPE_LIST} valueType="number" value={model.couponType} onChange={this.onChangeField('couponType').bind(this)} />
                </FormField>
                <FormField label="满减设置-满（元）" error={errors.fullAmount} hide={model.couponType !== 1}>
                    <FormField.Input value={model.fullAmount} onChange={this.onChangeField('fullAmount').bind(this)} />
                </FormField>
                <FormField label="满减设置-减（元）" error={errors.fullCutAmount} hide={!(model.couponType === 1 && model.couponMode === 1)}>
                    <FormField.Input value={model.fullCutAmount} onChange={this.onChangeField('fullCutAmount').bind(this)} />
                </FormField>
                <FormField label="满减设置-最多减（元）" error={errors.fullCutAmountMax} hide={!(model.couponType === 1 && model.couponMode === 2)}>
                    <FormField.Input value={model.fullCutAmountMax} onChange={this.onChangeField('fullCutAmountMax').bind(this)} />
                </FormField>
                <FormField label="满减设置-最少减（元）" error={errors.fullCutAmountMin} hide={!(model.couponType === 1 && model.couponMode === 2)}>
                    <FormField.Input value={model.fullCutAmountMin} onChange={this.onChangeField('fullCutAmountMin').bind(this)} />
                </FormField>
                <FormField label="立减设置-减（元）" error={errors.instantCutAmount} hide={!(model.couponType === 2 && model.couponMode === 1)}>
                    <FormField.Input value={model.instantCutAmount} onChange={this.onChangeField('instantCutAmount').bind(this)} />
                </FormField>
                <FormField label="立减设置-最多减（元）" error={errors.instantCutAmountMax} hide={!(model.couponType === 2 && model.couponMode === 2)}>
                    <FormField.Input value={model.instantCutAmountMax} onChange={this.onChangeField('instantCutAmountMax').bind(this)} />
                </FormField>
                <FormField label="立减设置-最少减（元）" error={errors.instantCutAmountMin} hide={!(model.couponType === 2 && model.couponMode === 2)}>
                    <FormField.Input value={model.instantCutAmountMin} onChange={this.onChangeField('instantCutAmountMin').bind(this)} />
                </FormField>
                <FormField label="折扣设置（折）" error={errors.discount} hide={model.couponType !== 3}>
                    <FormField.Input value={model.discount} onChange={this.onChangeField('discount').bind(this)} />
                </FormField>
                <FormField label="计算金额" error={errors.calculateField}>
                    <FormField.Select datas={CALCULATE_FIELD_LIST} valueType="number" value={model.calculateField} onChange={this.onChangeField('calculateField').bind(this)} />
                </FormField>
                <FormField label="有效期规则" error={errors.validateDayType}>
                    <FormField.RadioGroup datas={VALIDATE_RULE_LIST} valueType="number" value={model.validateDayType} onChange={this.onChangeField('validateDayType').bind(this)} />
                </FormField>
                <FormField label="有效期开始" error={errors.validateBegin} hide={model.validateDayType !== 1}>
                    <FormField.Input value={model.validateBegin} onChange={this.onChangeField('validateBegin').bind(this)} />
                </FormField>
                <FormField label="有效期截止" error={errors.validateEnd} hide={model.validateDayType !== 1}>
                    <FormField.Input value={model.validateEnd} onChange={this.onChangeField('validateEnd').bind(this)} />
                </FormField>
                <FormField label="有效天数" error={errors.validateDays} hide={model.validateDayType !== 2}>
                    <FormField.Input value={model.validateDays} onChange={this.onChangeField('validateDays').bind(this)} />
                </FormField>
                <FormField label="发行量" error={errors.initialCount}>
                    <FormField.Input value={model.initialCount} onChange={this.onChangeField('initialCount').bind(this)} />
                </FormField>
                <FormField label="每人限领" error={errors.thresholdPerPerson}>
                    <FormField.Input value={model.thresholdPerPerson} onChange={this.onChangeField('thresholdPerPerson').bind(this)} />
                </FormField>
                <FormField label="优惠券图片" error={errors.image}>
                    <ImageUploader value={model.image} onChange={this.onChangeField("image").bind(this)} businessType="coupon_image"/>
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
