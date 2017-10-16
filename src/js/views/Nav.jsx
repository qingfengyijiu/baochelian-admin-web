import React from 'react';
import history from './history.jsx';

class NavItem extends React.Component {

    constructor(props) {
        super(props);
        let {id, activeId, isActive} = props;
        let active = isActive(id, activeId);
        this.state = {
            collapse: true
        };
        this.change = this.change.bind(this);
        this.toggleCollapse = this.toggleCollapse.bind(this);
    }

    toggleCollapse() {
        let {children} = this.props;
        let hasChildren = children && children.length > 0;
        if(hasChildren) {
            this.setState({
                collapse: !this.state.collapse
            });
        }
    }

    change(event) {
        event.preventDefault();
        let {id, change, history, href,} = this.props;
        change(id);
        this.toggleCollapse();
        if(href) {
            history.push(href);
        }
    }

    render() {
        const DEFAULT_ICON_CLASS = '';
        let {id, iconClass, text, children, href, activeId, isActive, change, history} = this.props;
        let active = isActive(id, activeId);
        let hasChildren = children && children.length > 0;
        let linkIconClass = "link-icon " + (iconClass ? iconClass :  DEFAULT_ICON_CLASS);
        let containerClass = 'nav-item ' + (active ? ' active' : '');
        let linkClass = "us-nav-link" + (hasChildren ? ' has-children' : '') + (active ? ' active' : '');
        let linkHref = hasChildren ? 'javascript:void(0);' : href;
        let linkText = text ? text : 'test';
        if(!active) {
            this.state.collapse = true;
        } else if(active && id != activeId) {
            this.state.collapse = false;
        }
        let collapse = this.state.collapse;
        let arrowClass = "link-arrow fa" + (collapse ? ' fa-angle-down' : ' fa-angle-left');
        return (
            <li className={containerClass}>
                <a className={linkClass} href={linkHref} onClick={this.change}>
                    <i className={linkIconClass}></i>
                    <span className="link-text">{linkText}</span>
                    <span className={arrowClass}></span>
                </a>
                <Nav datas={children} activeId={activeId} isActive={isActive} change={change} history={history} collapse={collapse}/>
            </li>
        )
    }

}

class Nav extends React.Component {

    constructor(props) {
        super(props);
        this.getItems = this.getItems.bind(this);
    }

    getItems() {
        let {datas, activeId, isActive, change, history} = this.props;
        return _.map(datas, function(item) {
            return (
                <NavItem key={item.id} {...item} activeId={activeId} isActive={isActive} change={change} history={history}/>
            )
        })
    }

    render() {
        let {datas, collapse} = this.props;
        if(datas && datas.length > 0) {
            let containerClass = "us-nav" + (collapse ? ' collapse' : '');
            let itemViews = this.getItems();
            return (
                <ul className={containerClass}>
                    {itemViews}
                </ul>
            )
        } else {
            return (
                <span style={{display: 'none'}}></span>
            )
        }
    }

}

export default class extends React.Component {

    isActive(id, activeId, superIsActive) {
        if(typeof superIsActive === 'function') {
            return superIsActive(id, activeId);
        } else {
            let active = false;
            if(activeId) {
                if(id == activeId || (activeId.substring(0, 3) + '000' == id)) {
                    active = true;
                }
            }
            return active;
        }
    }

    render() {
        let {datas, activeId, collapse, header, footer, changeActive, toggleCollapse} = this.props;
        let containerClass = "us-navbar" + (collapse ?  ' us-collapse' : '');
        return (
            <div className={containerClass}>
                <div className="us-navbar-collapse">
                    <button className="collapse-btn" onClick={toggleCollapse}>
                        <i className="fa fa-bars"></i>
                    </button>
                </div>
                {header}
                <Nav datas={datas} activeId={activeId} isActive={this.isActive} change={changeActive} history={history}/>
                {footer}
            </div>

        );
    }
}
