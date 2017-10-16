import React from 'react';
import ReactDatetime from 'react-datetime';
import locale from 'moment/locale/zh-cn';

const DEFAULT_DATE_FORMAT = 'YYYY-MM-DD';   // according to moment.js
const DEFAULT_TIME_FORMAT = 'HH:mm:ss';

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    onChange(value) {
        let {dateFormat, timeFormat} = this.props;
        dateFormat = dateFormat != null ? dateFormat : DEFAULT_DATE_FORMAT;
        timeFormat = timeFormat != null ? timeFormat : DEFAULT_TIME_FORMAT;
        let format = '';
        if(dateFormat) {
            format = format + dateFormat;
        }
        if(timeFormat) {
            if(dateFormat) {
                format = format + ' ';
            }
            format = format + timeFormat;
        }
        this.props.onChange(value.format(format));
    }

    render() {
        let {locale, dateFormat, timeFormat, onChange, ...other} = this.props;
        locale = locale != null ? locale : 'zh-cn';
        dateFormat = dateFormat != null ? dateFormat : DEFAULT_DATE_FORMAT;
        timeFormat = timeFormat != null ? timeFormat : DEFAULT_TIME_FORMAT;
        return (
            <ReactDatetime locale={locale}
                           dateFormat={dateFormat}
                           timeFormat={timeFormat}
                           onChange={this.onChange}
                           {...other}
            />
        )
    }
}