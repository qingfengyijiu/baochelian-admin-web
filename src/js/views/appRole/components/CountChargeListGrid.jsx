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
            name: '序号',
            index: 'id'
        }, {
            name: '代码资费编号',
            index: 'codeChargeId'
        }, {
            name: '开通省份',
            index: 'open'
        }, {
            name: '屏蔽城市',
            index: 'shieldCountry'
        }, {
            name: '权重',
            index: 'weight'
        }, {
            name: '操作',
            index: 'operation',
            formatter: function(value, options, rowObject) {
                var id = rowObject.giftId;
                return (
                    <div>
                        <Link to={'/app/' + id + '/update'}>编辑</Link>
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
            url: '/api/cp',
            data: {
                ...queryOptions,
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
            <Grid ref="grid" colModels={this.colModels} datas={datas} pagination={pagination}
                  changePage={this.changePage} refresh={this.refresh}/>
        )
    }

}
