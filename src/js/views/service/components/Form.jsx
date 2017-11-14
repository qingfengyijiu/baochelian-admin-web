import React from 'react';
import FormField from '../../FormField.jsx';
import {validate} from '../validate.js';
import {Link} from 'react-router';
import history from '../../history.jsx';
import ws from '../../../lib/ws';
import ImageUploader from '../../ImageUploader.jsx';
import ImageUploaderGroup from '../../ImageUploaderGroup.jsx';
import Table from 'antd/lib/table';

const depositList = [{
    key: false,
    value: "不需预付"
}, {
    key: true,
    value: "需要预付"
}];

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            serviceCategoryList: [],
            tableDatas: [],
            tablePagination: {
                current: 1,
                pageSize: 10,
                total: 0
            },
            tableColumns: [{
                title: '商品名称',
                dataIndex: 'name'
            }, {
                title: '品牌'
            }, {
                title: '规格一'
            }, {
                title: '规格二'
            }, {
                title: '规格三'
            }, {
                title: "价格"
            }]
        }
    }

    componentDidMount() {
        let {tablePagination} = this.state;
        ws.get({
            url: '/api/serviceCategory/list/simple'
        }).then(response => {
            if(response.code === 0) {
                this.setState({
                    serviceCategoryList: response.data.bizServiceCategories.map(item => {return {key: item.id, value: item.name}})
                })
            } else {
                alert(response.message);
            }
        })
        ws.get({
            url: '/api/sku?page=' + tablePagination.current + '&pageSize=' + tablePagination.pageSize
        }).then(response => {
	        if(response.code === 0) {
	            tablePagination.total = response.pagination.total;
		        this.setState({
			        tableDatas: response.data.skus,
                    tablePagination:  tablePagination
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
            {serviceCategoryList, tableDatas, tableColumns, tablePagination} = this.state,
            {model, errors} = form;
        return (
            <div className="form count-form">
                <FormField label="服务项目" error={errors.parentServiceId}>
                  <FormField.Select datas={serviceCategoryList} value={model.parentServiceId} onChange={this.onChangeField('parentServiceId').bind(this)} />
                </FormField>
                <FormField label="名称" error={errors.name}>
                    <FormField.Input value={model.name} onChange={this.onChangeField('name').bind(this)} />
                </FormField>
                <FormField label="基准距离(km)" error={errors.basicDistance}>
                    <FormField.Input value={model.basicDistance} onChange={this.onChangeField('basicDistance').bind(this)} />
                </FormField>
                <FormField label="调度费用" error={errors.bumpPrice}>
                    <FormField.Input placeholder="超过基准距离的每公里费用" value={model.bumpPrice} onChange={this.onChangeField('bumpPrice').bind(this)} />
                </FormField>
                <FormField label="工时费" error={errors.hourlyCharge}>
                    <FormField.Input value={model.hourlyCharge} onChange={this.onChangeField('hourlyCharge').bind(this)} />
                </FormField>
                <FormField label="预付设置" error={errors.hasDeposit}>
                    <FormField.RadioGroup datas={depositList} valueType="boolean" value={model.hasDeposit} onChange={this.onChangeField('hasDeposit').bind(this)} />
                </FormField>
                <FormField label="预付金额" error={errors.deposit}>
                    <FormField.Input value={model.deposit} onChange={this.onChangeField('deposit').bind(this)} />
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
                <FormField label="耗材设置" error={errors.level}>
                    <Table tableData={tableDatas} tableColumns={tableColumns} pagination={tablePagination}></Table>
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