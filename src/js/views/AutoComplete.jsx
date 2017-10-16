import _ from "lodash";
import React from "react";

function handleHelperChange(value) {
    let onChangeCallback = this.props.onChange;
    if(typeof onChangeCallback === 'function') {
        onChangeCallback(value);
    } else {
        throw new Error("you forgot to config the 'AutoComplete.onChange' attribute");
    }
}

const DEFAULT_BLUR_TIMEOUT = 200;

/**
 *  value           Function       选中的item value
 *  helperList      Array          原始全部数据集
 *  onChange        Function       根据item确定autocomplete change逻辑
 *
 */
export default class AutoComplete extends React.Component{

    constructor(props) {
        let value = props.value,
            helperList;
        super(props);
        helperList = this.filter(value);
        this.state = {
            isFocus: false
        };
        this.getHelperListView = this.getHelperListView.bind(this);
        this.handleSearchTextBlur = this.handleSearchTextBlur.bind(this);
        this.handleSearchTextFocus = this.handleSearchTextFocus.bind(this);
        this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
    }

    getHelperListView(datas) {
        let _this = this;
        datas = _.union(datas);
        return _.map(datas, function (item) {
            return (
                <li key={item} onClick={handleHelperChange.bind(_this, item)}>{item}</li>
            )
        });
    }

    handleSearchTextChange(event) {
        let value = event.target.value,
            onChangeCallback = this.props.onChange;
        if(typeof onChangeCallback === 'function') {
            onChangeCallback(value);
        } else {
            throw new Error("you forgot to config 'AutoComplete.onChange' atrribute");
        }
    }

    filter(value) {
        let originList = this.props.helperList ? this.props.helperList : [],
            result;
        if(value && value.length > 0) {
            result = _.filter(originList, function(item) {
                return item.indexOf(value) > -1;
            });
        } else {
            result = originList;
        }
        return result;
    }

    handleSearchTextFocus() {
        this.setState({
            isFocus: true
        });
    }

    handleSearchTextBlur() {
        let _this = this;
        //如果先触发blur事件,则可能无法触发item点击事件,因此需要timeout
        window.setTimeout(function() {
            _this.setState({
                isFocus: false
            });
        }, DEFAULT_BLUR_TIMEOUT);
    }

    getNativeView() {
        return this.refs.nativeView;
    }

    render() {
        let value = this.props.value,
            helperList = this.filter(value),
            helperListView = this.getHelperListView(helperList),
            isFocus = this.state.isFocus,
            helperListVisible = false,
            helperListDisplay;
        if(helperList && helperList.length > 0 && isFocus) {
            helperListVisible = true;
        }
        helperListDisplay = helperListVisible ? 'block' : 'none';
        return (
            <div className="autocomplete-helper-container">
                <input ref="nativeView" type="text" className="form-control form-input" value={value != null ? value : ''}
                       onFocus={this.handleSearchTextFocus} onBlur={this.handleSearchTextBlur}
                       onChange={this.handleSearchTextChange}/>
                <ul className="autocomplete-helper-list" style={{display: helperListDisplay}}>
                    {helperListView}
                </ul>
            </div>
        );
    }
}
