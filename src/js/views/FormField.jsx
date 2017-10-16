import React from 'react';
import AutoComplete from './AutoComplete.jsx';

class Input extends React.Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        let value = event.target.value;
        value = value.length > 0 ? value : null;
        this.props.onChange(value);
    }

    render() {
        let {onChange, type, className, value, ...other} = this.props;
        type = type ? type : 'text';
        className = className ? className : 'form-input form-control';
        value = value != null ? value : '';
        switch (type) {
            case 'number':
                return (
                    <NumberInput {...this.props}/>
                );
            default:
                return (
                    <input type={type} className={className} value={value} onChange={this.onChange} {...other}/>
                );
        }
    }
}

class NumberInput extends React.Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }

    onChange(event) {
        let value = event.target.value;
        this.props.onChange(value);
    }

    onBlur(event) {
        let value = event.target.value;
        if(value == "") {
            value = null;
        } else {
            value = Number(value);
        }
        this.props.onChange(value);
    }

    render() {
        let {onChange, type, className, value, ...other} = this.props;
        type = type ? other.type : 'text';
        className = className ? className : 'form-input form-control';
        value = value != null ? value : '';
        return (
            <input type="number" className={className} value={value} onChange={this.onChange} onBlur={this.onBlur} {...other}/>
        )
    }
}

class Textarea extends React.Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        let value = event.target.value;
        this.props.onChange(value);
    }

    render() {
        let {onChange, className, value, ...other} = this.props;
        className = className ? className : 'form-input form-control';
        value = value != null ? value : '';
        return (
            <textarea className={className} onChange={this.onChange} value={value} {...other}/>
        )
    }

}

class Select extends React.Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    getItemViews(datas) {
        return _.map(datas, function(item) {
            let key, value;
            if(typeof item === 'object') {
                value = item.value;
                key = item.key != null ? item.key : item.value;
            } else {
                value = item;
                key = item;
            }
            return (
                <option key={key} value={key.toString()}>{value}</option>
            )
        });
    }

    onChange(event) {
        let value = event.target.value;
        let {onChange, valueType} = this.props;
        valueType = valueType ? valueType : 'string';
        value = value == '' ? null : value;
        if(value) {
            switch (valueType.toLowerCase()) {
                case 'number':
                    value = Number(value);
                    break;
                case 'boolean':
                    value = value == 'true' ? true : false;
                    break;
                default:
                    // do nothing
            }
        }
        if(typeof onChange === 'function') {
            onChange(value);
        }
    }

    render() {
        let {datas, className, value, valueType, onChange, placeholder, ...other} = this.props;
        placeholder = placeholder != null ? placeholder : '----请选择----'
        className = className ? className : 'form-input form-control';
        datas = datas ? datas : [];
        valueType = valueType ? valueType : 'string';
        value = value != null ? value.toString() : '';
        let itemViews = this.getItemViews(datas);
        return (
            <select className={className} value={value} {...other} onChange={this.onChange}>
                <option value="">{placeholder}</option>
                {itemViews}
            </select>
        )
    }

}

/**
 * props: value         Array
 *        valueType     String      'String' or 'Number' or 'Boolean'
 *        itemDatas     Array
 *        onChange      Function
 *        inline        String      optional    true
 *        keyName     String
 *        valueName     String
 */
class CheckboxGroup extends React.Component{

    constructor(props) {
        super(props);
        this.handleItemChange = this.handleItemChange.bind(this);
        this.getItemViews = this.getItemViews.bind(this);
    }

    handleItemChange(event) {
        let checked = event.target.checked,
            value = event.target.value,
            valueType = this.props.valueType ? this.props.valueType : "String",
            groupValue = this.props.value ? this.props.value : [],
            onChangeCallback = this.props.onChange;
        switch(valueType) {
            case "String":
                value = value.length > 0 ? value : null;
                break;
            case "Number":
                value = value.length > 0 ? Number(value) : null;
                break;
            case "Boolean":
                value = value == "true";
                break;
            default:
                throw new Error("不支持的数据类型:" + valueType);
        }
        if (checked) {
            groupValue = _.union(groupValue, [value]);
        } else {
            groupValue = _.without(groupValue, value);
        }
        if (typeof onChangeCallback === 'function') {
            onChangeCallback(groupValue);
        }
    }

    getItemViews(data, inline) {
        let {keyName, valueName} = this.props,
            _this = this,
            name = "checkbox" + _.uniqueId(),
            groupValue = this.props.value != null ? this.props.value : [],
            labelClass = inline ? 'checkbox-inline' : 'checkbox';
        keyName = keyName ? keyName : 'key';
        valueName = valueName ? valueName : 'value';
        return _.map(data, function (item) {
            let value = item[valueName],
                key = item[keyName],
                checked = _.indexOf(groupValue, key) > -1;
            return (
                <label key={value} className={labelClass}>
                    <input type="checkbox" value={key.toString()} name={name}
                           checked={checked}
                           onChange={_this.handleItemChange}
                    />
                    {value}
                </label>
            )
        });
    }

    render() {
        let {datas, inline} = this.props;
        datas = datas ? datas : [];
        inline = inline != null ? inline : true;
        let itemViews = this.getItemViews(datas, inline)
        return (
            <div className="checkbox-group-container">
                {itemViews}
            </div>
        );
    }
}

class RadioGroup extends React.Component{

    constructor(props) {
        super(props);
        this.getRadioView = this.getRadioView.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    getRadioView(inline, value, key, name) {
        let checked = this.props.value != null ? this.props.value == key: false,
            labelClass = inline ? 'radio-inline' : 'radio';
        return (
            <label key={key.toString()} className={labelClass}>
                <input name={name} type="radio" value={key.toString()} checked={checked}
                       onChange={this.handleChange}/>
                {value}
            </label>
        );
    }

    getValue(value, valueType) {
        valueType = this.props.valueType ? this.props.valueType : "string";
        switch(valueType.toLowerCase()) {
            case "string":
                value = value.length > 0 ? value : null;
                break;
            case "number":
                value = value.length > 0 ? Number(value) : null;
                break;
            case "boolean":
                value = value == "true";
                break;
            default:
                throw new Error("不支持的数据类型:" + valueType);
        }
        return value;
    }

    handleChange(event) {
        let value = event.target.value,
            valueType = this.props.valueType ? this.props.valueType : "string",
            onChangeCallback = this.props.onChange;
        switch(valueType.toLowerCase()) {
            case "string":
                value = value.length > 0 ? value : null;
                break;
            case "number":
                value = value.length > 0 ? Number(value) : null;
                break;
            case "boolean":
                value = value == "true";
                break;
            default:
                throw new Error("不支持的数据类型:" + valueType);
        }
        if(typeof onChangeCallback === 'function') {
            onChangeCallback(value);
        }
    }

    render() {
        let _this = this,
            itemDatas = this.props.datas ? this.props.datas : [],
            inline = this.props.inline != null ? this.props.inline : true,
            visible = this.props.visible != null ? this.props.visible : true,
            itemViews,
            containerClass = "radio-group-container",
            name = this.props.name ? this.props.name : "radio" + _.uniqueId(),
            valueName = this.props.valueName ? this.props.valueName : 'value',
            keyName = this.props.keyName ? this.props.keyName : 'key';
        containerClass = visible ? containerClass : containerClass + " hide";
        itemViews = _.map(itemDatas, function (item) {
            return _this.getRadioView(inline, item[valueName], item[keyName], name)
        });
        return (
            <div className={containerClass}>
                {itemViews}
            </div>
        );
    }
}

/**
 * datas        原始数据集合  Array[{key: 1, value: "北京市"}]
 * keyName      原始数据集的key名称，默认为"key"
 * valueName    原始数据集的value名称，默认为"value"
 * value        组件数据
 * onChange     数据变化事件  (value) => ...
 */
class MultipleAutoComplete extends React.Component {

    keyName = "key";
    valueName = "value";
    blurWait = 200;

    constructor(props) {
        super(props);
        this.state = {
            inputValue: null,
            helperList: [],
            helperVisible: false
        };
        if(props.keyName) {
            this.keyName = props.keyName;
        }
        if(props.valueName) {
            this.valueName = props.valueName;
        }
        this.onInputChange = this.onInputChange.bind(this);
        this.onInputFocus = this.onInputFocus.bind(this);
        this.onInputBlur = this.onInputBlur.bind(this);
        this.onAdd = this.onAdd.bind(this);
        this.getValueItems = this.getValueItems.bind(this);
    }

    onInputChange(event) {
        let value = event.target.value;
        value = value.length > 0 ? value : null;
        this.setState({
            inputValue: value,
            helperVisible: true
        });
    }

    onInputFocus() {
        this.setState({
            helperVisible: true
        })
    }

    onInputBlur() {
        let _this = this;
        setTimeout(function() {
            _this.setState({
                helperVisible: false
            });
        }, _this.blurWait);
    }

    onAdd() {
        let {inputValue} = this.state,
            {value, datas} = this.props,
            keyName = this.keyName,
            valueName = this.valueName,
            result;
        value = value != null ? value : "";
        let valueParts = value.length > 0 ? value.split(",") : [];
        if(inputValue == null) {
            alert("请输入数据");
            return;
        }
        let idx = _.findIndex(datas, function(item) {
            return item.key.toString() == inputValue || item.value.toString() == inputValue;
        });
        if(idx < 0) {
            alert("数据不正确");
            return;
        } else {
            let fidx = _.findIndex(valueParts, function(item) {
                return item == datas[idx][keyName];
            });
            if(fidx < 0) {
                valueParts.push(datas[idx].key);
            }
            result = valueParts.join(",");
            //如果最终结果为空字符串，需要转为null
            result = result.length > 0 ? result : null;
            this.props.onChange(result);
            this.setState({
                inputValue: null
            });
        }
    }

    onRemove(removeItem) {
        let {value} = this.props;
        value = value != null ? value : "";
        let valueParts = value.length > 0 ? value.split(",") : [];

        let removedValues = _.filter(valueParts, function(item) {
            return item.toString() != removeItem.toString();
        });
        let result = removedValues.join(",");
        result = result.length > 0 ? result : null;
        this.props.onChange(result);
    }

    getValueItems(values, datas) {
        let keyName = this.keyName,
            valueName = this.valueName,
            _this = this;
        return _.map(values, function(item) {
            let idx = _.findIndex(datas, function(dataItem) {
                return dataItem[keyName].toString() == item;
            });
            let findItem = datas[idx];
            return (
                <div key={findItem[keyName]} className="value-item">
                    <span>{findItem[valueName]}</span>
                    <a href="javascript:void(0)" className="remove-btn" onClick={_this.onRemove.bind(_this, findItem[keyName])}>x</a>
                </div>
            )
        })
    }

    getHelperListView(helperList) {
        let _this = this,
            keyName = this.keyName,
            valueName = this.valueName;
        return _.map(helperList, function(item) {
            return (
                <li key={item[keyName]} onClick={_this.changeInputValue.bind(_this, item[valueName])}>{item[valueName]}</li>
            )
        })
    }

    changeInputValue(value) {
        value = value.length > 0 ? value : null;
        this.setState({
            inputValue: value,
            helperVisible: false
        });
    }

    render() {
        let {inputValue, helperList, helperVisible} = this.state,
            {value, datas} = this.props,
            keyName = this.keyName,
            valueName = this.valueName;
        value = value != null ? value : "";
        datas = datas ? datas : [];
        if(inputValue != null && inputValue.length > 0) {
            helperList = _.filter(datas, function(item) {
                return item[keyName].toString().indexOf(inputValue) > -1 || item[valueName].toString().indexOf(inputValue) > -1;
            });
        } else {
            helperList = datas;
        }
        inputValue = inputValue != null ? inputValue : "";
        let values = value.length > 0 ? value.split(",") : [];
        return (
            <div className="multiple-auto-complete-container">
                <div className="value-field clearfix">
                    {this.getValueItems(values, datas)}
                </div>
                <div className="input-field">
                    <div className="input-group">
                        <input type="text" value={inputValue} onChange={this.onInputChange} onBlur={this.onInputBlur}
                               onFocus={this.onInputFocus} className="form-control form-input"/>
                        <button onClick={this.onAdd} className="input-add">+</button>
                    </div>
                    <ul className="autocomplete-helper-list" style={{display: helperVisible ? 'block' : 'none'}}>
                        {this.getHelperListView(helperList)}
                    </ul>
                </div>
            </div>
        )
    }
}

/**
 * datas        原始数据集合，Array[{"key": xx, "value": "sss"}]
 * keyName      默认为"key"
 * valueName    默认为"value"
 * value        input显示数据
 * valueKey     实际操作数据
 * onChangeValue    改变value事件
 * onChangeKey      改变valueKey事件
 *
 */
class AutoCompleteForObject extends React.Component {

    keyName = "key";
    valueName = "value";
    blurWait = 1000;

    constructor(props) {
        super(props);
        this.state = {
            helperList: [],
            helperVisible: false
        };
        if(props.keyName) {
            this.keyName = props.keyName;
        }
        if(props.valueName) {
            this.valueName = props.valueName;
        }
        this.onInputChange = this.onInputChange.bind(this);
        this.getHelperView = this.getHelperView.bind(this);
        this.onInputFocus = this.onInputFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }

    getHelperView(helperList) {
        let _this = this,
            keyName = this.keyName,
            valueName = this.valueName;
        helperList = _.union(helperList);
        return _.map(helperList, function (item) {
            return (
                <li key={item[keyName]} onClick={_this.handleHelperChange.bind(_this, item)}>{item[valueName]}</li>
            )
        });
    }

    handleHelperChange(item) {
        let keyName = this.keyName,
            valueName = this.valueName;
        this.props.onChangeValue(item[valueName]);
        this.props.onChangeKey(item[keyName]);
        this.setState({
            helperVisible: false
        });
    }

    onInputChange(event) {
        let value = event.target.value,
            {datas, caseMatch} = this.props,
            {helperList} = this.state,
            keyName = this.keyName,
            valueName = this.valueName;
        let idx = _.findIndex(datas, function(item) {
            if(caseMatch) {
                return item[valueName].toString() == value;
            } else {
                return item[valueName].toString().toLowerCase() == value.toLowerCase();
            }
        });
        if(idx > -1) {
            this.props.onChangeKey(datas[idx][keyName]);
        } else {
            this.props.onChangeKey(null);
        }
        this.props.onChangeValue(value);
        if(value != null && value.length > 0) {
            helperList = _.map(datas, function(item) {
                if(caseMatch) {
                    return item[valueName].toString().indexOf(value) > - 1;
                } else {
                    return item[valueName].toString().toLowerCase().indexOf(value) > - 1;
                }
            })
        } else {
            helperList = [];
        }

        this.setState({
            helperList: helperList,
            helperVisible: true
        });
    }

    onInputFocus() {
        this.setState({
            helperVisible: true
        });
    }

    onBlur() {
        let _this = this;
        setTimeout(function() {
            _this.setState({
                helperVisible: false
            })
        }, this.blurWait);

    }

    render() {
        let {valueKey, value, datas, disabled, caseMatch, placeholder} = this.props,
            {helperList, helperVisible} = this.state,
            keyName = this.keyName,
            valueName = this.valueName;
        datas = datas ? datas : [];
        disabled = disabled ? 'disabled' : undefined;
        if(value == null && valueKey != null) {
            let idx = _.findIndex(datas, function(item) {
                return item[keyName].toString() == valueKey.toString();
            });
            if(idx > -1) {
                value = datas[idx][valueName];
            }
        }
        value = value != null ? value : "";
        helperList = _.filter(datas, function(item) {
            if(caseMatch) {
                return item[valueName].toString().indexOf(value) > -1;
            } else {
                return item[valueName].toString().toLowerCase().indexOf(value.toLowerCase()) > -1;
            }
        });
        return (
            <div className="autocomplete-helper-container" onBlur={this.onBlur}>
                <input ref="nativeView" type="text" className="form-control form-input" value={value} disabled={disabled}
                       onFocus={this.onInputFocus} onChange={this.onInputChange}  placeholder={placeholder}/>
                <ul className="autocomplete-helper-list" style={{display: helperVisible ? "block" : "none"}}>
                    {this.getHelperView(helperList)}
                </ul>
            </div>
        )
    }
}

class FormField extends React.Component {

    render() {
        let {itemClass, label, labelClass, error, errorClass, children, hide, required, tail} = this.props;
        itemClass = itemClass ? itemClass : 'form-group';
        itemClass = hide ? itemClass + ' hide' : itemClass;
        labelClass = labelClass ? labelClass : 'control-label col-sm-2';
        errorClass = errorClass ? errorClass : 'form-error';
        labelClass = required ? labelClass + " required" : labelClass;
        return (
            <div className={itemClass}>
                <div className="clearfix">
                    <label className={labelClass}>{label}</label>
                    <div className="input-container col-sm-8">
                        {children}
                        <div className={errorClass}>{error}</div>
                    </div>
                    {tail}
                </div>
                <div className="hr-line-dashed"></div>
            </div>
        )
    }

    static Input = Input;

    static Number = NumberInput;

    static Textarea = Textarea;

    static Select = Select;

    static CheckboxGroup = CheckboxGroup;

    static RadioGroup = RadioGroup;

    static AutoComplete = AutoComplete;

    static AutoCompleteForObject = AutoCompleteForObject;

    static MultipleAutoComplete = MultipleAutoComplete;

}

export default FormField;
