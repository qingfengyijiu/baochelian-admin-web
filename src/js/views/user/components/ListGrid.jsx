import React from 'react';
import {ws} from '../../../lib/main.js';
import Grid from '../../NewGrid.jsx';
import {Link} from 'react-router';

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.refresh = this.refresh.bind(this);
        this.changePage = this.changePage.bind(this);
        this.colModels = [{
            name: '序号',
            index: 'serial'
        }, {
            name: '用户ID',
            index: 'spName',
            formatter: function(value, options, rowObject) {
                return (
                    <Link to={'/SP/SpListPage?spKey=' + rowObject.spKey}>{value}</Link>
                )
            }
        }, {
            name: '代码名称',
            index: 'codeName',
            formatter: function(value, options, rowObject) {
                return (
                    <Link to={'/SP/DmListPage?spKey=' + rowObject.spKey + '&&codeKey=' + rowObject.codeKey}>{value}</Link>
                )
            }
        }, {
            name: '代码资费编号',
            index: 'key'
        },  {
            name: '代码资费名称',
            index: 'name',
            formatter: function(value, options, rowObject) {
                return (
                    <Link to={'/SP/DzListPage?spKey=' + rowObject.spKey + '&&codeKey=' + rowObject.codeKey + '&&cmdKey=' + rowObject.key}>{value}</Link>
                )
            }
        }, {
            name: '运营商',
            index: 'carrierName'
        }, {
            name: '业务类型',
            index: 'bizName',
        }, {
            name: '开通省份',
            index: 'provinceName',
            formatter: function(value, options, rowObject) {
              return <div style={{width: 280, margin: 'auto'}}> {value} </div>
            }
        }, {
            name: '代码资费状态',
            index: 'status',
            formatter: function(value, options, rowObject) {
              return value ? "开" : "关";
            }
        }];
    }

    changePage(page) {
        let {actions, pagination} = this.props;
        pagination.pageNo = page;
        actions.spAction.changeListPagination(pagination);
        this.refresh();
    }

    refresh() {
        let {actions, queryOptions, pagination} = this.props;
        actions.utilAction.showLoading();
        ws.get({
            url: '/api/cmd',
            data: {
                ...queryOptions,
                page: pagination.pageNo
            }
        }).then(function (response) {
            actions.utilAction.hideLoading();
            if (response.code == 0) {
                actions.spAction.changeListData(response.data);
                pagination.total = response.pagination.total;
                actions.spAction.changeListPagination(pagination);
            }
        })
    }

    render() {
        let { actions, dataSource, pagination, queryOptions} = this.props;
        return (
            <div className="form">
                  <Grid serialNumber = "true" colModels={this.colModels} dataSource={dataSource} pagination={pagination} queryOptions={queryOptions} changePage={this.changePage}/>
            </div>
        )
    }

}
