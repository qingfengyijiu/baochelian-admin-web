/**
 * Created by jasonzhang on 2017/3/7.
 */
"use strict";
import React from 'react';
import onClickOutside from 'react-onclickoutside';

/**
 * datas        原始数据源，Array[{id: "", name: ""}]
 * keyName      默认：id
 * valueName    默认：name
 * value
 * onChange
 */
 class ProvinceSelect extends React.Component {

    keyName = "id";
    valueName = "name";

    constructor(props) {
        super(props);
        this.state = {
            helperVisible: false
        };
        if(props.keyName) {
            this.keyName = props.keyName;
        }
        if(props.valueName) {
            this.valueName = prosp.valueName;
        }
        this.getItemViews = this.getItemViews.bind(this);
        this.onInputKeyDown = this.onInputKeyDown.bind(this);
        this.onInputFocus = this.onInputFocus.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    onChange(item) {
        let {value} = this.props,
            keyName = this.keyName;
        let valueParts = value ? value.split(",") : [];
        let idx = _.findIndex(valueParts, function(valueItem) {
            return valueItem == item[keyName].toString();
        });
        if(idx > -1) {
            valueParts = _.filter(valueParts, function(valueItem) {
                return valueItem != item[keyName].toString();
            })
        } else {
            valueParts.push(item[keyName].toString());
        }
        value = valueParts.join(",");
        value = value.length > 0 ? value : null;
        this.props.onChange(value);
    }

    handleClickOutside() {
        let _this = this;
        setTimeout(function() {
            _this.setState({
                helperVisible: false
            });
        }, 200);
    }

    getItemViews(datas) {
        let _this = this,
            keyName = this.keyName,
            valueName = this.valueName;
        return _.map(datas, function(item) {
            return (
                <li key={item[keyName]} onClick={_this.onChange.bind(_this, item)} className="province-item">
                    <span>{item[valueName]}</span>
                    <span>{item.selected ? "☑️" : ""}</span>
                </li>
            )
        });
    }

    onInputFocus() {
        this.setState({
            helperVisible: true
        });
    }

    onInputKeyDown(event) {
        let keyCode = event.keyCode,
            value = event.target.value,
            keyName = this.keyName,
            valueName = this.valueName,
            datas = this.props.datas,
            result;
        if(keyCode !== 8) return;
        if(value.length === 0) {
            this.props.onChange(null);
        } else {
            let valueParts = value.split(",");
            valueParts = _.map(valueParts, function(valueItem) {
                console.log(valueItem);
                let idx = _.findIndex(datas, function(dataItem) {
                    return dataItem[valueName].toString() == valueItem.toString();
                });
                if(idx > - 1) {
                    return datas[idx][keyName].toString();
                } else {
                    return "";
                }
            });
            valueParts.pop();
            result = valueParts.join(",");
            result = result.length > 0 ? result : null;
            this.props.onChange(result);
        }
    }

    render() {
        let {datas, value} = this.props,
            {helperVisible} = this.state,
            keyName = this.keyName,
            valueName = this.valueName;
        datas = datas ? datas : [];
        let valueParts = value ? value.split(",") : [];
        datas = _.map(datas, function(item) {
           let idx = _.findIndex(valueParts, function(valueItem) {
               return item[keyName].toString() == valueItem.toString();
           });
           if(idx > - 1) {
               item.selected = true;
           } else {
               item.selected = false;
           }
           return item;
        });
        let inputValue = _.map(valueParts, function(valueItem) {
            let idx = _.findIndex(datas, function(dataItem) {
                return dataItem[keyName].toString() == valueItem.toString();
            });
            if(idx > - 1) {
                return datas[idx][valueName].toString();
            } else {
                return "";
            }
        }).join(",");
        return (
            <div className="province-select">
                <input value={inputValue} className="province-input form-input form-control" onFocus={this.onInputFocus}/>
                <ul className="helper-container clearfix" style={{display: helperVisible ? 'block' : 'none'}}>
                    {this.getItemViews(datas)}
                </ul>
            </div>
        )
    }
}

export default onClickOutside(ProvinceSelect);
