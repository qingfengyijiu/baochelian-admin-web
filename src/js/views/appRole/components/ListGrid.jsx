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
            name: 'APP编号',
            index: 'key'
        }, {
            name: 'APP名称',
            index: 'name'
        }, {
            name: 'secret',
            index: 'secret'
        }, {
            name: '回调地址',
            index: 'callbackUrl'
        }, {
            name: '操作',
            index: 'operation',
            formatter: function(value, options, rowObject) {
                var id = rowObject.id;
                let realA = '';
                if (roleType == '2') {
                  realA = <a href="javascript:void(0)" onClick={_this.deleteItem.bind(_this, id)}>删除</a>
                }
                return (
                    <div>
                      <Link to={'/app/' + id + '/update'}>编辑</Link>
                      {realA}
                      {/* <a href="javascript:void(0)" onClick={_this.deleteItem.bind(_this, id)}>删除</a> */}
                    </div>
                )
            }
        }];
    }

    deleteItem(id) {
      if (confirm("确定要删除吗？\n\n请确认。")) {
        let _this = this,
            {actions} = this.props;
        actions.utilAction.showLoading();
        ws.delete({
            url: '/api/app/' + id
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
        actions.appAction.changeListPagination(pagination);
        this.refresh();
    }

    refresh() {
        let {actions, queryOptions, pagination} = this.props,
            _this = this;
        actions.utilAction.showLoading();
        ws.get({
            url: '/api/app',
            data: {
                ...queryOptions,
                cpKey:cpKey,
                page: pagination.pageNo
            }
        }).then(function(response) {
            actions.utilAction.hideLoading();
            if(response.code == 0) {
                actions.appAction.changeListData(response.data);
                pagination.total = response.pagination.total;
                actions.appAction.changeListPagination(pagination);
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
