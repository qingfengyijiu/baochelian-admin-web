import React from 'react';
import ImageUploader from './ImageUploader.jsx';

export default class extends React.Component {

    constructor(props) {
        super(props);
    }

    onChange(index, val) {
        let {value, onChange} = this.props;
        value = value ? value : [];
        value[index] = val;
        if(typeof onChange === 'function') {
            onChange(value.filter(item => item != null));
        }
    }

    renderItems = (items) => {
        let {businessType} = this.props;
        return items.map((item, index) => {
	        return (
                <ImageUploader key={item ? item : "待添加"} value={item} businessType={businessType} onChange={this.onChange.bind(this, index)}/>
	        );
        });
    }

    render() {
        let {value, businessType} = this.props;
        value = value ? value.filter(item => item != null) : [];
        value.push(null);
        return (
            <div className="image-uploader-group">
                {this.renderItems(value)}
            </div>
        )
	    return
    }

}