import React from 'react';
import FormField from '../../FormField.jsx';
import {validate} from '../validate.js';
import {Link} from 'react-router';
import history from '../../history.jsx';
import ws from '../../../lib/ws';
import DateTime from '../../Datetime.jsx';

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
            specificationCategoryName1: '规格一',
            specificationCategoryList1: [],
	        specificationCategoryName2: '规格二',
	        specificationCategoryList2: [],
	        specificationCategoryName3: '规格三',
	        specificationCategoryList3: [],
        }
    }

    componentDidMount() {
        let _this = this,
            {spuId} = this.props;
        ws.get({
            url: '/api/spu/' + spuId
        }).then(response => {
	        if(response.code == 0) {
		        _this.setState({
		            specificationCategoryName1: response.data.specificationCategoryName1,
			        specificationCategoryName2: response.data.specificationCategoryName2,
			        specificationCategoryName3: response.data.specificationCategoryName3,
                });
                if(response.data.specificationCategoryId1) {
		            ws.get({
		                url: '/api/specificationCategory/' + response.data.specificationCategoryId1 + '/specifications'
                    }).then(res => {
                        if(res.code === 0) {
	                        _this.setState({
		                        specificationCategoryList1: res.data.specifications ? res.data.specifications.map(item => {return {key: item.id, value: item.value}}) : []
	                        });
                        } else {
                            alert(res.message);
                        }
                    });
                }
		        if(response.data.specificationCategoryId2) {
			        ws.get({
				        url: '/api/specificationCategory/' + response.data.specificationCategoryId2 + '/specifications'
			        }).then(res => {
				        if(res.code === 0) {
					        _this.setState({
						        specificationCategoryList2: res.data.specifications ? res.data.specifications.map(item => {return {key: item.id, value: item.value}}) : []
					        });
				        } else {
					        alert(res.message);
				        }
			        });
		        }
		        if(response.data.specificationCategoryId3) {
			        ws.get({
				        url: '/api/specificationCategory/' + response.data.specificationCategoryId3 + '/specifications'
			        }).then(res => {
				        if(res.code === 0) {
					        _this.setState({
						        specificationCategoryList3: res.data.specifications ? res.data.specifications.map(item => {return {key: item.id, value: item.value}}) : []
					        });
				        } else {
					        alert(res.message);
				        }
			        });
		        }
	        } else {
		        alert(response.message);
	        }
        });

        ws.get({
            url: '/api/brand/simple'
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
            url: '/api/specificationCategory/simple'
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
            {specificationCategoryName1, specificationCategoryList1, specificationCategoryName2, specificationCategoryList2, specificationCategoryName3, specificationCategoryList3} = this.state,
            {model, errors} = form;
        return (
            <div className="form count-form">
                {specificationCategoryList1.length > 0 ?
                    (<FormField label={specificationCategoryName1} error={errors.specificationId1}>
                        <FormField.Select datas={specificationCategoryList1} value={model.specificationId1} onChange={this.onChangeField('specificationId1').bind(this)} />
                    </FormField>) : undefined}
	            {specificationCategoryList2.length > 0 ?
		            (<FormField label={specificationCategoryName2} error={errors.specificationId2}>
                        <FormField.Select datas={specificationCategoryList2} value={model.specificationId2} onChange={this.onChangeField('specificationId2').bind(this)} />
                    </FormField>) : undefined}
	            {specificationCategoryList3.length > 0 ?
		            (<FormField label={specificationCategoryName3} error={errors.specificationId3}>
                        <FormField.Select datas={specificationCategoryList3} value={model.specificationId3} onChange={this.onChangeField('specificationId3').bind(this)} />
                    </FormField>) : undefined}
                <FormField label="商品属性">
                    <table className="form-in-table">
                        <thead>
                            <tr>
                                <th>长(cm)</th>
                                <th>宽(cm)</th>
                                <th>高(cm)</th>
                                <th>毛重(kg)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <FormField.Input type="text" value={model.length} onChange={this.onChangeField("length").bind(this)}/>
                                </td>
                                <td>
                                    <FormField.Input type="text" value={model.width} onChange={this.onChangeField("width").bind(this)}/>
                                </td>
                                <td>
                                    <FormField.Input type="text" value={model.height} onChange={this.onChangeField("height").bind(this)}/>
                                </td>
                                <td>
                                    <FormField.Input type="text" value={model.grossWeight} onChange={this.onChangeField("grossWeight").bind(this)}/>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </FormField>
                <FormField label="库存价格">
                    <table className="form-in-table">
                        <thead>
                        <tr>
                            <th>售价</th>
                            <th>市场价</th>
                            <th>成本价</th>
                            <th>库存</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>
                                <FormField.Input type="text" value={model.salePrice} onChange={this.onChangeField("salePrice").bind(this)}/>
                            </td>
                            <td>
                                <FormField.Input type="text" value={model.marketPrice} onChange={this.onChangeField("marketPrice").bind(this)}/>
                            </td>
                            <td>
                                <FormField.Input type="text" value={model.cost} onChange={this.onChangeField("cost").bind(this)}/>
                            </td>
                            <td>
                                <FormField.Input type="text" value={model.storage} onChange={this.onChangeField("storage").bind(this)}/>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </FormField>
                <FormField label="分润设置">
                    <table className="form-in-table">
                        <thead>
                        <tr>
                            <th>平台服务费</th>
                            <th>保哥分润</th>
                            <th>一级推荐人分润</th>
                            <th>二级推荐人分润</th>
                            <th>一级运营中心</th>
                            <th>二级运营中心</th>
                            <th>司机返现</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>
                                <FormField.Input type="text" value={model.platformFee} onChange={this.onChangeField("platformFee").bind(this)}/>
                            </td>
                            <td>
                                <FormField.Input type="text" value={model.technicianFee} onChange={this.onChangeField("technicianFee").bind(this)}/>
                            </td>
                            <td>
                                <FormField.Input type="text" value={model.parentRefererFee} onChange={this.onChangeField("parentRefererFee").bind(this)}/>
                            </td>
                            <td>
                                <FormField.Input type="text" value={model.grandpaRefererFee} onChange={this.onChangeField("grandpaRefererFee").bind(this)}/>
                            </td>
                            <td>
                                <FormField.Input type="text" value={model.firstOsFee} onChange={this.onChangeField("firstOsFee").bind(this)}/>
                            </td>
                            <td>
                                <FormField.Input type="text" value={model.secondOsFee} onChange={this.onChangeField("secondOsFee").bind(this)}/>
                            </td>
                            <td>
                                <FormField.Input type="text" value={model.driverFee} onChange={this.onChangeField("driverFee").bind(this)}/>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </FormField>
                <FormField label="上架时间">
                    <DateTime value={model.onShelf ? model.onShelf.substring(0, 10) : ''} timeFormat={false} onChange={this.onChangeField("onShelf").bind(this)}/>
                </FormField>
                <FormField label="下架时间">
                    <DateTime value={model.offShelf ? model.offShelf.substring(0, 10) : ''} timeFormat={false} onChange={this.onChangeField("offShelf").bind(this)}/>
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
