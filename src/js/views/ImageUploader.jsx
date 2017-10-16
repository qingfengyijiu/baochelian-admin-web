import React from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.onDrop = this.onDrop.bind(this);
        this.onOpenClick = this.onOpenClick.bind(this);
    }

    onDrop(acceptedFiles) {
        let {onChange} = this.props;
        if(acceptedFiles && acceptedFiles.length > 0) {
            let file = acceptedFiles[0];
            request.put('/api/oss')
                .attach('file', file)
                .on('progress', function(e) {
                    //console.log(e.percent);
                })
                .end(function(err, response) {
                    if(err) {
                        alert(err);
                    } else {
                        if(typeof onChange === 'function') {
                            let fileUrl = response.body && response.body.data ? response.body.data.url : null;
                            onChange(fileUrl);
                        }
                    }
                });
        }
    }

    onOpenClick() {
        this.refs.dropzone.open();
    }

    render() {
        let {value, onChange, containerClass, containerProps, imgProps, ...other} = this.props;
        containerClass =  containerClass ? containerClass : 'image-uploader';
        containerClass = containerClass + (value == null ? ' unkonw' : '');
        return (
            <div className={containerClass} onClick={this.onOpenClick} {...containerProps}>
                <Dropzone ref="dropzone" onDrop={this.onDrop} style={{display: 'none'}} {...other}/>
                <img src={value} className='previewer' {...imgProps}/>
            </div>

        )
    }

}