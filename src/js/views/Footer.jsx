import React from 'react';
import {Link} from 'react-router';

export default class extends React.Component {

    render() {
        return (
            <footer className="footer">
                <Link className="menu" to="/game">
                    <div className="menu-icon">
                        <span className="iconfont icon-youxi"></span>
                    </div>
                    <div className="menu-text">游戏</div>
                </Link>
                <Link className="menu" to="/giftPack">
                    <div className="menu-icon">
                        <span className="iconfont icon-libao"></span>
                    </div>
                    <div className="menu-text">礼包</div>
                </Link>
                <a className="menu" href="http://www.baidu.com">
                    <div className="menu-icon">
                        <span className="iconfont icon-shequ"></span>
                    </div>
                    <div className="menu-text">社区</div>
                </a>
                <Link className="menu" to="/personalCenter">
                    <div className="menu-icon">
                        <span className="iconfont icon-hzicongerentouxiang"></span>
                    </div>
                    <div className="menu-text">个人</div>
                </Link>
            </footer>
        )

    }
}