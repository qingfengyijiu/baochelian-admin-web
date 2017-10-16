import React from 'react';

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

    getBodyItemViews(datas, colModels, keyName) {
        keyName = keyName ? keyName : 'id';
        return _.map(datas, function(item) {
            let key = item[keyName] != null ? item[keyName] : _.uniqueId();
            return (
                <TRow key={key} data={item} colModels={colModels}/>
            )
        })
    }

    render() {
        let {colModels, datas, keyName} = this.props;
        colModels = colModels ? colModels : [];
        datas = datas ? datas : [];
        let headViews = this.getHeadItemViews(colModels);
        let bodyViews = this.getBodyItemViews(datas, colModels, keyName);
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
    }

    render() {
        const DEFAULT_PAGE_CURRENT = 1;
        let {searchOptions, colModels, keyName} = this.props;
        let datas = this.props.datas ? this.props.datas : this.props.dataSource;
        return (
            <div>
                <Table colModels={colModels} datas={datas} keyName={keyName}/>
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
