import React from 'react';
import {ws} from '../../../lib/main.js';
import Grid from '../../NewGrid.jsx';
import {Link} from 'react-router';
import url from '../url.js';

export default class extends React.Component {

    constructor(props) {
        super(props);
        let _this = this;
        this.refresh = this.refresh.bind(this);
        this.changePage = this.changePage.bind(this);
        this.colModels = [{
            name: '序号',
            index: 'serial'
        }, {
            name: 'SP简称',
            index: 'name',
            formatter: function(value, options, rowObject) {
                return (
                    <Link to={'/SP/DmListPage?spKey=' + rowObject.key}>{value}</Link>
                )
            }
        }, {
            name: 'SP公司全称',
            index: 'fullName'
        }, {
            name: '所属公司',
            index: 'upayCompanyName'
        }, {
            name: '联系人',
            index: 'contact',
        }, {
            name: '联系电话',
            index: 'mobile'
        }, {
            name: '联系邮箱',
            index: 'email'
        }, {
            name: '操作',
            index: 'Operation',
            formatter: function(value, options, rowObject) {
                return (
                  <div>
                    <Link className="table-operation-btn" to={'/SP/SpAddPage?id=' + rowObject.id}>编辑</Link>
                  </div>
                )
            }
        }];
    }

    changePage(page) {
        let {actions, pagination} = this.props;
        pagination.pageNo = page;
        actions.spListAction.changeListPagination(pagination);
        this.refresh();
    }

    refresh() {
        let {actions, queryOptions, pagination} = this.props;
        actions.utilAction.showLoading();
        ws.get({
            url: '/api/sp',
            data: {
                ...queryOptions,
                page: pagination.pageNo
            }
        }).then(function (response) {
            actions.utilAction.hideLoading();
            if (response.code == 0) {
                actions.spListAction.changeListData(response.data);
                pagination.total = response.pagination.total;
                actions.spListAction.changeListPagination(pagination);
            }
        })
    }

    render() {
        let {actions, dataSource, pagination, queryOptions} = this.props;
        return (
            <div className="form">
                  <Grid serialNumber = "true" colModels={this.colModels} dataSource={dataSource} pagination={pagination} queryOptions={queryOptions} changePage={this.changePage}/>
            </div>
        )
    }

}
