import React from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import Progress from './Progress.jsx';

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.onDrop = this.onDrop.bind(this);
        this.onOpenClick = this.onOpenClick.bind(this);
        this.state = {
            progress: 0,
            progressText: props.btnName ? props.btnName : '点击导入'
        }
    }

    onOpenClick() {
        this.refs.dropzone.open();
    }

    onDrop(acceptedFiles) {
        let _this = this,
            {onChange, url} = this.props;
        if(acceptedFiles && acceptedFiles.length > 0) {
            let file = acceptedFiles[0];
            request.post(url)
                .attach('file', file)
                .set('Accept', 'application/json')
                .on('request', function(req) {
                    _this.setState({
                        progressText: file.name
                    });
                })
                .on('progress', function(e) {
                    _this.setState({
                        progress: e.percent / 100.0
                    });
                })
                .end(function(err, response) {
                    if(err) {
                        alert(err);
                    } else {
                        if(typeof onChange === 'function') {
                            let responseData = JSON.parse(response.body);
                            let fileUrl = responseData ? responseData.data : null;
                            onChange(fileUrl);
                        }
                    }
                });
        }
    }

    render() {
        let {progress, progressText} = this.state;
        return (
            <div>
                <Dropzone ref="dropzone" onDrop={this.onDrop} style={{display: 'none'}} multiple={false}/>
                <div className="btn form-control" onClick={this.onOpenClick}>
                    <Progress value={progress} text={progressText}/>
                </div>
            </div>
        )
    }
}