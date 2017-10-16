//带有序号功能的Grid  在调用Grid组件的时候添加 serialNumber = {true} 则自动添加序号，否则不添加

import React from 'react';
import Pagination from './Pagination.jsx';
import {ws} from '../lib/main.js';

class THead extends React.Component {

    render() {
        let {name, index, formatter, align, hide, ...other} = this.props;
        let style = hide ? {display: 'none'} : undefined;
        return (
            <th {...other} style={style}>{name}</th>
        )
    }

}

class TCell extends React.Component {

    getValue(formatter, value, options, rowObject) {
        if(typeof formatter === 'string' && typeof Grid.formatters[formatter] === 'function') {
            formatter = Grid.formatters[formatter];
        }
        if(typeof formatter === 'function') {
            return formatter(value, options, rowObject)
        }
        if(typeof value === 'number' || typeof value === 'boolean') {
            value = value.toString();
        }
        return value;
    }

    render() {
        let {value, colModel, rowObject} = this.props;
        let formatter = colModel.formatter;
        let idx = colModel.index;
        let hide = colModel.hide;
        let style = hide ? {display: 'none'} : {};
        let options = {

        };
        let valueView = this.getValue(formatter, value, options, rowObject);
        return (
            <td style={style}>{valueView}</td>
        )
    }

}

class TRow extends React.Component {

    getItemViews(rowObject, colModels) {
        return _.map(colModels, function(item) {
            let key = item.index,
                value = rowObject[key];
            return (
                <TCell key={key} value={value} rowObject={rowObject} colModel={item}/>
            )
        })
    }

    render() {
        let {data, colModels} = this.props;
        let itemViews = this.getItemViews(data, colModels);
        return (
            <tr>
                {itemViews}
            </tr>
        )
    }
}

class Table extends React.Component {

    getHeadItemViews(datas) {
        return _.map(datas, function(item) {
            return (
                <THead key={item.name} {...item}/>
            )
        })
    }

    getBodyItemViews(datas, colModels, keyName ,serialNumber) {
      if(serialNumber){
        let serial = 1;
        keyName = keyName ? keyName : 'id';
        return _.map(datas, function(item) {
          item.serial = serial;
          serial += 1;
            let key = item[keyName] != null ? item[keyName] : _.uniqueId();
            return (
                <TRow key={key} data={item} colModels={colModels}/>
            )
        })
      }else{
            keyName = keyName ? keyName : 'id';
            return _.map(datas, function(item) {
            let key = item[keyName] != null ? item[keyName] : _.uniqueId();
            return (
                <TRow key={key} data={item} colModels={colModels}/>
            )
        })
      }
    }

    render() {
        let {colModels, datas, keyName ,serialNumber} = this.props;
        colModels = colModels ? colModels : [];
        datas = datas ? datas : [];
        let headViews = this.getHeadItemViews(colModels);
        let bodyViews = this.getBodyItemViews(datas, colModels, keyName ,serialNumber);
        return (
            <table className="us-table us-table-striped ">
                <thead>
                    <tr>
                        {headViews}
                    </tr>
                </thead>
                <tbody>
                    {bodyViews}
                </tbody>
            </table>
        )
    }

}

export default class Grid extends React.Component {

    constructor(props) {
        super(props);
        this.getPageSize = this.getPageSize.bind(this);
    }

    /*async loadData() {
        let {dataSource, searchOptions, pageCurrent, pageSize} = this.props;
        pageSize = this.getPageSize();
        let datas = [];
        if(typeof dataSource === 'object') {
            let idxStart = (pageCurrent - 1) * pageSize,
                idxEnd = pageCurrent * pageSize,
                max = dataSource.length;
            idxEnd = idxEnd < max ? idxEnd : max;
            for(let i = idxStart; i < idxEnd; i++) {
                datas.push(dataSource[i]);
            }
        } else {
            let queryData = _.extend({
                pageCurrent: pageCurrent,
                pageSize: pageSize
            }, searchOptions);
            datas = await ws('GET', {
                url: dataSource,
                data: queryData
            })
        }
        this.setState({
            datas: datas
        });
    }*/

    getPageSize() {
        const DEFAULT_PAGE_SIZE = 10;
        let pageSize = this.props.pageSize;
        return pageSize != null ? pageSize : DEFAULT_PAGE_SIZE;
    }

    render() {
        const DEFAULT_PAGE_CURRENT = 1;
        let {dataSource, pagination,  pagerSize, searchOptions, colModels, keyName, changePage ,serialNumber} = this.props;
        let pageCurrent = pagination.pageNo != null ? pagination.pageNo : DEFAULT_PAGE_CURRENT;
        let pageSize = pagination.pageSize != null ? pagination.pageSize : 10;
        let pageTotal = Math.floor(pagination.total / pageSize) + (pagination.total % pageSize > 0 ? 1 : 0);
        pageTotal = pageTotal > 0 ? pageTotal : 1;
        // if(typeof dataSource === 'object') {
        //     pageTotal = _.ceil(dataSource.length / pageSize);
        // }
        let datas = this.props.datas ? this.props.datas : this.props.dataSource;
        return (
            <div className="grid-container">
                <Table colModels={colModels} datas={datas} keyName={keyName} serialNumber={serialNumber}/>
                <div className="clearfix">
                    <Pagination current={pageCurrent} total={pageTotal} size={pageSize}
                     changePage={changePage}/>
                </div>
            </div>
        )
    }

    static formatters = {
        boolean: function(value, options, rowObject) {
            if(value) {
                return '是';
            } else {
                return '否';
            }
        },
        percentage: function(value, options, rowObject) {
            return value != null ? _.round(value * 100, 4) + '%' : '';
        }
    }
}
