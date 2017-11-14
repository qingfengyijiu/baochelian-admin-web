import React from 'react';
import {Link} from 'react-router';
import Grid from '../../NewGrid.jsx';
import history from '../../history.jsx';
import {ws} from '../../../lib/main.js';

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.changePage = this.changePage.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.refresh = this.refresh.bind(this);
        let _this = this;
        this.colModels = [{
            name: '序号',
            index: 'serial'
        }, {
            name: '名称',
            index: 'name'
        }, {
            name: '服务分类',
            index: 'parentServiceId'
        }, {
            name: '基准距离（km）',
            index: 'basicDistance'
        }, {
            name: '调度费用(元/km)',
            index: 'bumpPrice'
        }, {
            name: '工时费',
            index: 'hourlyCharge'
        }, {
            name: '预付设置',
            index: 'hasDeposit',
	        formatter: function(value, options, rowObject) {
            	if(value != null) {
		            return value ? '是' : '否';
	            } else {
            		return '';
	            }
	        }
        }, {
            name: '平台服务费',
            index: 'profitAllocations.platformFee',
	        formatter: function(value, options, rowObject) {
				return rowObject.profitAllocations && rowObject.profitAllocations.platformFee ? rowObject.profitAllocations.platformFee : '';
	        }
        }, {
	        name: '保哥分润',
	        index: 'profitAllocations.technicianFee',
	        formatter: function(value, options, rowObject) {
	        	return rowObject.profitAllocations && rowObject.profitAllocations.technicianFee != null ? rowObject.profitAllocations.technicianFee : '';
	        }
        }, {
	        name: '一级推荐人分润',
	        index: 'profitAllocations.parentRefererFee',
	        formatter: function(value, options, rowObject) {
	        	return rowObject.profitAllocations && rowObject.profitAllocations.parentRefererFee != null ? rowObject.profitAllocations.parentRefererFee : '';
	        }
        }, {
	        name: '二级推荐人分润',
	        index: 'profitAllocations.grandpaRefererFee',
	        formatter: function(value, options, rowObject) {
	        	return rowObject.profitAllocations && rowObject.profitAllocations.grandpaRefererFee != null ? rowObject.profitAllocations.grandpaRefererFee : '';
	        }
        }, {
	        name: '一级运营中心分润',
	        index: 'profitAllocations.firstOsFee',
	        formatter: function(value, options, rowObject) {
	        	return rowObject.profitAllocations && rowObject.profitAllocations.firstOsFee != null ? rowObject.profitAllocations.firstOsFee : '';
	        }
        }, {
	        name: '二级运营中心',
	        index: 'profitAllocations.secondOsFee',
	        formatter: function(value, options, rowObject) {
	        	return rowObject.profitAllocations && rowObject.profitAllocations.secondOsFee != null ? rowObject.profitAllocations.secondOsFee : '';
	        }
        }, {
            name: '操作',
            index: 'operation',
            formatter: function(value, options, rowObject) {
                var id = rowObject.id;
                return (
                    <div>
                        <Link to={'/service/' + id + '/update'}>编辑</Link>
                        <a className="btn" onClick={_this.deleteItem.bind(this, id)} href="javascript:void(0)">删除</a>
                    </div>
                )
            }
        }];
    }

    deleteItem(id) {
      if (confirm("确定要删除吗？")) {
        let _this = this,
            {actions} = this.props;
        actions.utilAction.showLoading();
        ws.delete({
            url: '/api/service/' + id
        }).then(function(response) {
            actions.utilAction.hideLoading();
            if(response.code == 0) {
                _this.refresh();
            } else {
                alert(response.msg);
            }
        })
      }
    }

    changePage(page) {
        let {actions, pagination} = this.props;
        pagination.pageNo = page;
        actions.thisAction.changeListPagination(pagination);
        this.refresh();
    }

    refresh() {
        let {actions, queryOptions, pagination, params} = this.props,
            _this = this;
        actions.utilAction.showLoading();
        ws.get({
              url: '/api/service',
              data: {
                  ...queryOptions,
                  page: pagination.pageNo
              }
          }).then(function(response) {
              actions.utilAction.hideLoading();
              if(response.code == 0) {
                  actions.thisAction.changeListData(response.data.bizServices);
                  pagination.total = response.pagination.total;
                  actions.thisAction.changeListPagination(pagination);
              }
          })
    }

    render() {
        let {datas, pagination} = this.props;
        return (
            <Grid ref="grid" serialNumber={true} colModels={this.colModels} datas={datas} pagination={pagination}
                  changePage={this.changePage} refresh={this.refresh}/>
        )
    }

}
