import React from "react";
import Nav from './Nav.jsx';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as UtilAction from './_util/action.js';
import {getNavData, ws} from '../lib/main.js';
import Header from './Header.jsx';
import LoadingToast from './LoadingToast.jsx';

const WAIT_INTERVAL = 60000;
const WAIT_TOTAL = 3600000;

class App extends React.Component{

    constructor(props) {
        super(props);
        this.changeNavActiveId = this.changeNavActiveId.bind(this);
        this.toggleNavCollapse = this.toggleNavCollapse.bind(this);
        this.startTimer = this.startTimer.bind(this);
        this.state = {
            waitTime: WAIT_TOTAL
        }
    }

	startTimer() {
        var _this = this;
        setInterval(function() {
            var oldTime = _this.state.waitTime;
            var newTime = oldTime - WAIT_INTERVAL;
            if(newTime > 0) {
                _this.setState({
                    waitTime: newTime
                });
            } else {
	            ws.post({
		            url: '/api/login/logout'
	            }).then(function(response) {
		            if(response.code == 0) {
			            window.location.href = '/login';
		            } else {
			            alert(response.msg);
		            }
	            });
	            alert("页面等待超时，请重新登录");
            }
        }, WAIT_INTERVAL)
    }

    componentDidMount() {
        var _this = this;
        this.startTimer();
        if(document.addEventListener) {
	        document.addEventListener("click", function() {
		        _this.setState({
			        waitTime: WAIT_TOTAL
		        });
	        });
	        document.addEventListener("mousemove", function() {
		        _this.setState({
			        waitTime: WAIT_TOTAL
		        });
	        });
	        document.addEventListener("keypress", function() {
		        _this.setState({
			        waitTime: WAIT_TOTAL
		        });
	        })
        } else {
	        document.attachEvent("onclick", function() {
		        _this.setState({
			        waitTime: WAIT_TOTAL
		        });
	        });
	        document.attachEvent("onmousemove", function() {
		        _this.setState({
			        waitTime: WAIT_TOTAL
		        });
	        });
	        document.attachEvent("onkeypress", function() {
		        _this.setState({
			        waitTime: WAIT_TOTAL
		        });
	        })
        }

    }

    handleHomeClick() {
        window.location.href = "/home";
    }


    changeNavActiveId(navId) {
        let {actions} = this.props;
        actions.utilAction.changeNavActive(navId);
    }

    toggleNavCollapse() {
        let {actions, nav} = this.props;
        actions.utilAction.collapseNavBar(!nav.collapse);
    }


    render() {
        let {nav, actions, loading} = this.props;
        let contentClass = 'content-container' + (nav.collapse ? ' full-width' : '');
        let realNav = getNavData(loginType, roleId);
        return (
            <div id="container">
                <Header navCollapse={nav.collapse} toggleNavCollapse={this.toggleNavCollapse}/>
                <div className="body">
                    <div className="nav-container">
                        <Nav datas={realNav} changeActive={this.changeNavActiveId} activeId={nav.activeId}
                             collapse={nav.collapse} toggleCollapse={this.toggleNavCollapse}/>
                    </div>
                    <div className={contentClass}>
                        <div className="content-body">
                            {this.props.children}
                        </div>
                    </div>
                </div>
                <LoadingToast isOpen={loading > 0}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    let utilState = state.reducers.util.toJS();
    return {...utilState};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            utilAction: bindActionCreators(UtilAction, dispatch)
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
