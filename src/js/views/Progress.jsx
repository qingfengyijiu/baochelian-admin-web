import React from 'react';

export default class extends React.Component {

    render() {
        let {value, text} = this.props;
        let width = (value != null ? value : 0) * 100 + '%';
        return (
            <div className="progress">
                {text && value <= 0.5 ? text : ''}
                <div className="progress-bar" style={{width: width}}>
                    {text && value > 0.5 ? text : ''}
                </div>
            </div>
        )
    }
}