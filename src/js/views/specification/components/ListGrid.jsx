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
            name: '规格名称',
            index: 'categoryName'
        }, {
            name: '值',
            index: 'value'
        }, {
            name: '创建时间',
            index: 'createTime'
        }, {
            name: '操作',
            index: 'operation',
            formatter: function(value, options, rowObject) {
                var id = rowObject.id;
                return (
                    <div>
                        <Link to={'/specification/' + id + '/update'}>编辑</Link>
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
            url: '/api/specification/' + id
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
              url: '/api/specification',
              data: {
                  ...queryOptions,
                  page: pagination.pageNo
              }
          }).then(function(response) {
              actions.utilAction.hideLoading();
              if(response.code == 0) {
                  actions.thisAction.changeListData(response.data.specifications);
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
