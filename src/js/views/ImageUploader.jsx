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
        let {onChange, businessType} = this.props;
        if(acceptedFiles && acceptedFiles.length > 0) {
            let file = acceptedFiles[0];
            request.put('/api/upload?businessType=' + businessType)
                .attach('file', file)
                .on('progress', function(e) {
                    //console.log(e.percent);
                })
                .end(function(err, response) {
                    if(err) {
                        alert(err);
                    } else {
                        if(typeof onChange === 'function') {
                            let fileUrl = response.body && response.body.data && response.body.data.path && response.body.data.path.length > 0 ? response.body.data.path[0] : null;
                            onChange(fileUrl);
                        }
                    }
                });
        }
    }

    onOpenClick() {
        this.refs.dropzone.open();
    }

    onDelete = e => {
        let {onChange} = this.props;
        e.preventDefault();
        e.stopPropagation();
        if(typeof onChange === 'function') {
            onChange(null);
        }
    }

    render() {
        let {value, onChange, containerClass, containerProps, imgProps, businessType, ...other} = this.props;
        containerClass =  containerClass ? containerClass : 'image-uploader';
        containerClass = containerClass + (value == null ? ' unkonw' : '');
        return (
            <div className={containerClass} onClick={this.onOpenClick} {...containerProps}>
                <Dropzone ref="dropzone" onDrop={this.onDrop} style={{display: 'none'}} {...other}/>
                <img src={value} className='previewer' {...imgProps}/>
                <i className="fa fa-times-circle image-uploader-btn-delete" onClick={this.onDelete}></i>
            </div>

        )
    }

}