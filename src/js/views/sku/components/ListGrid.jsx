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
            name: '规格一',
            index: 'specificationId1',
	        formatter: function(value, options, rowObject) {
            	if(rowObject.specificationId1 != null) {
		            return rowObject.specificationCategoryName1 + "（" + rowObject.specificationValue1 +"）";
	            } else {
            		return "";
	            }
	        }
        }, {
            name: '规格二',
            index: 'specificationId2',
	        formatter: function(value, options, rowObject) {
		        if(rowObject.specificationId2 != null) {
			        return rowObject.specificationCategoryName2 + "（" + rowObject.specificationValue2 +"）";
		        } else {
			        return "";
		        }
	        }
        }, {
            name: '规格三',
            index: 'specificationId3',
	        formatter: function(value, options, rowObject) {
		        if(rowObject.specificationId3 != null) {
			        return rowObject.specificationCategoryName3 + "（" + rowObject.specificationValue3 +"）";
		        } else {
			        return "";
		        }
	        }
        }, {
            name: '售价',
            index: 'salePrice'
        }, {
            name: '市场价',
            index: 'marketPrice'
        }, {
            name: '成本价',
            index: 'cost'
        }, {
            name: '库存',
            index: 'storage'
        }, {
	        name: '毛重(kg)',
	        index: 'grossWeight'
        }, {
	        name: '长(cm)',
	        index: 'length'
        }, {
	        name: '宽(cm)',
	        index: 'width'
        }, {
	        name: '高(cm)',
	        index: 'height'
        }, {
	        name: '供应商',
	        index: ''
        }, {
	        name: '平台服务费',
	        index: 'profitAllocations.platformFee',
            formatter: function(value, options, rowObject) {
	            return rowObject.profitAllocations ? rowObject.profitAllocations.platformFee : '';
            }
        }, {
	        name: '保哥分润',
	        index: 'profitAllocations.technicianFee',
            formatter: function(value, options, rowObject) {
	            return rowObject.profitAllocations ? rowObject.profitAllocations.technicianFee : '';
            }
        }, {
	        name: '一级推荐人分润',
	        index: 'profitAllocations.parentRefererFee',
            formatter: function(value, options, rowObject) {
	            return rowObject.profitAllocations ? rowObject.profitAllocations.parentRefererFee : '';
            }
        }, {
	        name: '二级推荐人分润',
	        index: 'profitAllocations.grandpaRefererFee',
            formatter: function(value, options, rowObject) {
	            return rowObject.profitAllocations ? rowObject.profitAllocations.grandpaRefererFee : '';
            }
        }, {
	        name: '一级运营中心',
	        index: 'profitAllocations.firstOsFee',
            formatter: function(value, options, rowObject) {
	            return rowObject.profitAllocations ? rowObject.profitAllocations.firstOsFee : '';
            }
        }, {
	        name: '二级运营中心',
	        index: 'profitAllocations.secondOsFee',
            formatter: function(value, options, rowObject) {
	            return rowObject.profitAllocations ? rowObject.profitAllocations.secondOsFee : '';
            }
        }, {
	        name: '司机返现',
	        index: 'profitAllocations.driverFee',
	        formatter: function(value, options, rowObject) {
		        return rowObject.profitAllocations ? rowObject.profitAllocations.driverFee : '';
	        }
        }, {
            name: '操作',
            index: 'operation',
            formatter: function(value, options, rowObject) {
                var id = rowObject.id;
                return (
                    <div>
                        <Link to={'/spu/' + props.params.id + '/sku/' + id + '/update'}>编辑</Link>
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
            url: '/api/sku/' + id
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
              url: '/api/sku',
              data: {
                  ...queryOptions,
	              spuId: params.id,
                  page: pagination.pageNo
              }
          }).then(function(response) {
              actions.utilAction.hideLoading();
              if(response.code == 0) {
                  actions.thisAction.changeListData(response.data.skus);
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
