import React from "react";
import {ws} from '../lib/main.js';

export default class extends React.Component {

    logout() {
        ws.post({
            url: '/api/login/logout'
        }).then(function(response) {
            if(response.code == 0) {
                window.location.href = '/login';
            } else {
                alert(response.msg);
            }
        })
    }

    render() {
        let {navCollapse, toggleNavCollapse} = this.props;
        let headerClass = "header" + (navCollapse ? ' full-width' : '');
        let _userName = window.userName && window.userName.length > 0 ? window.userName : '游客';
        let _roleName = window.roleName && window.roleName.length > 0 ? '【' + window.roleName + '】' : '';
        return (
            <header className={headerClass}>
                <button className="collapse-btn" onClick={toggleNavCollapse}><i className="fa fa-bars"></i></button>
                <ul className="header-right">
                    <li>
                        <span>您好，</span>
                        <span>{_userName + _roleName}</span>
                        <span>，欢迎登录</span>
                    </li>
                    <li>
                        <a className="btn-sign-out" href="javascript:void(0)" onClick={this.logout}>
                            <i className="fa fa-sign-out"></i>
                            <span>登出</span>
                        </a>
                    </li>
                </ul>
            </header>
        )
    }
}
