import React from 'react';
import {Link} from 'react-router';
import Grid from '../../Grid.jsx';
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
            name: 'ID',
            index: 'id'
        }, {
            name: 'CP名称',
            index: 'name'
        }, {
            name: 'secret',
            index: 'secret'
        }, {
            name: '创建时间',
            index: 'ctime'
        }, {
            name: '备注',
            index: 'comment'
        }, {
            name: '操作',
            index: 'operation',
            formatter: function (value, options, rowObject) {
                let id = rowObject.id;
                return (
                    <div>
                        <Link className="btn" to={'/mytest/' + id + '/update'}>编辑</Link>
                        <a className="btn" onClick={_this.deleteItem.bind(this, id)} href="javascript:void(0)">删除</a>
                    </div>
                )
            }
        }];
    }

    deleteItem(id) {
        let _this = this,
            {actions} = this.props;
        actions.utilAction.showLoading();
        ws.delete({
            url: '/api/mytest/' + id
        }).then(function (response) {
            actions.utilAction.hideLoading();
            if (response.code == 0) {
                _this.refresh();
            } else {
                alert(response.msg);
            }
        })
    }

    changePage(page) {
        let {actions, pagination} = this.props;
        pagination.pageNo = page;
        actions.cpAction.changeListPagination(pagination);
        this.refresh();
    }

    refresh() {
        let {actions, queryOptions, pagination} = this.props,
            _this = this;
        actions.utilAction.showLoading();
        ws.get({
            url: '/api/mytest',
            data: {
                ...queryOptions,
                page: pagination.pageNo
            }
        }).then(function (response) {
            actions.utilAction.hideLoading();
            if (response.code == 0) {
                actions.cpAction.changeListData(response.data);
                pagination.total = response.pagination.total;
                actions.cpAction.changeListPagination(pagination);
            }
        })
    }

    render() {
        let {datas, pagination} = this.props;
        datas = [{
            id:'1',
            name: 'test',
            secret:'secret',
            ctime:'2017-02-23',
            comment:'无备注'
        }];
        return (
            <Grid ref="grid" colModels={this.colModels} datas={datas} pagination={pagination} changePage={this.changePage} refresh={this.refresh}/>
        )
    }

}