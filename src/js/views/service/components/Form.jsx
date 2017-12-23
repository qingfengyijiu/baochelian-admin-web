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
                total: 0,
                onChange: this.onChangePagination
            },
            tableColumns: [{
                key: "name",
                title: 'spu名称',
                dataIndex: 'name'
            }, {
                title: '品牌',
                key: "brandName",
                dataIndex: "brandName"
            }],
            tableSearch: {
                name: null,
                brandId: null
            },
            brandList: [],
            spuRelated: []
        }
    }

    componentDidMount() {
        let {tablePagination, tableSearch} = this.state;
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
            url: '/api/brand/simple'
        }).then(response => {
            if(response.code === 0) {
                this.setState({
                    brandList: response.data.brands.map(item => {
                        return {
                            key: item.id,
                            value: item.name
                        }
                    })
                });
            } else {
                alert(response.message);
            }
        });
        this.searchSpu();
    }

    searchSpu = () => {
	    let {tablePagination, tableSearch} = this.state;
	    ws.get({
		    url: '/api/spu',
            data: {
                ...tableSearch,
                page: tablePagination.current,
                pageSize: tablePagination.pageSize
		    }
	    }).then(response => {
		    if(response.code === 0) {
			    tablePagination.total = response.pagination.total;
			    this.setState({
				    tableDatas: response.data.spus,
				    tablePagination:  tablePagination,
                    spuRelated: []
			    });
		    } else {
			    alert(response.message);
		    }
	    });
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

    onChangeRowSelection = (selectedRowKeys, selectedRows) => {
        let {form, actions} = this.props;
        form.model.spuRelated = selectedRowKeys.map(item => {
            return {
                id: item
            }
        });
        actions.thisAction.changeForm(form);
    }

    onChangePagination = (page, size) => {
        let {tablePagination} = this.state;
        tablePagination.current = page;
        tablePagination.pageSize = size;
        this.setState({
            tablePagination: tablePagination
        });
    }

    onChangeSearchField = function(field) {
        return function(value) {
            let {tableSearch} = this.state;
            tableSearch[field] = value;
            this.setState({
                tableSearch: tableSearch
            });
        }
    }

    render() {
        let {form, onSubmit} = this.props,
            {serviceCategoryList, tableDatas, tableColumns, tablePagination, brandList, tableSearch} = this.state,
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
                    <div className="search-container">
                        <div className="search-form-container">
                            <div className="form form-search">
                                <FormField label="spu名称">
                                    <FormField.Input value={tableSearch.name} onChange={this.onChangeSearchField('name').bind(this)}/>
                                </FormField>
                                <FormField label="品牌名称">
                                    <FormField.Select datas={brandList} value={tableSearch.brandId} onChange={this.onChangeSearchField('brandId').bind(this)}/>
                                </FormField>
                            </div>
                        </div>
                        <div className="search-btn-container form form-search">
                            <FormField>
                                <button className="btn btn-primary" onClick={this.searchSpu}>查询</button>
                            </FormField>
                        </div>
                    </div>
                    <Table rowKey="id" dataSource={tableDatas} columns={tableColumns} pagination={tablePagination} rowSelection={{selectedRowKeys: form.model.spuRelated ? form.model.spuRelated.map(item => item.id) : [], onChange: this.onChangeRowSelection}}></Table>
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
