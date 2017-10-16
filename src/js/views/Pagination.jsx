import _ from "lodash";
import React from "react";

const DEFAULT_SIZE = 5;
/**
 * props: total     Number
 *        size      Number  optional    10
 *        current   Number  optional    1
 *        changePage    Function
 */
export default class Pagination extends React.Component{

    constructor(props) {
        super(props);
        this.getPageNumbers = this.getPageNumbers.bind(this);
    }

    changePage(page) {
        let {changePage, total} = this.props;
        if(page < 1 || page > total) {
            return;
        }
        if(typeof changePage === 'function') {
            changePage(page);
        }
    }

    getPageNumbers(size, current, total) {
        var i,
            middle,
            pageNumbers = [];
        middle = parseInt(size / 2) + 1;
        if (total < size) {
            size = total;
            for (i = 0; i < size; i++) {
                pageNumbers.push(i + 1);
            }
        } else if (current < middle + 1) {
            for (i = 0; i < size; i++) {
                pageNumbers.push(i + 1);
            }
        } else if (current < total - (size - middle)) {
            for (i = middle - 1; i > 0; i--) {
                pageNumbers.push(current - i);
            }
            pageNumbers.push(current);
            for (i = 1; i < (size - middle + 1); i++) {
                pageNumbers.push(current + i);
            }
        } else {
            for (i = size - 1; i > -1; i--) {
                pageNumbers.push(total - i);
            }
        }
        return pageNumbers;
    }

    render() {
        var {current, total, size} = this.props,
            _this = this;
        current = current != null ? current : 1;
        total = total != null ? total : current;
        size = size != null ? size : DEFAULT_SIZE;
        let pageNumbers,
            pageViews,
            firstClass = 'page-first' + (current == 1 ? ' disabled' : ''),
            prevClass = 'page-prev' + (current == 1 ? ' disabled' : ''),
            nextClass = 'page-next' + (current == total ? ' disabled' : ''),
            lastClass = 'page-last' + (current == total ? ' disabled' : '');

        pageNumbers = this.getPageNumbers(size, current, total);
        pageViews = _.map(pageNumbers, function (item) {
            var className = undefined;
            if (item == current) {
                className = 'active';
            }
            return (
                <li key={item} className={className} onClick={_this.changePage.bind(_this, item)}>
                    <a>{item}</a></li>
            );
        });
        if(total === 0) {
            return (<div/>);
        } else {
            return (
                <ul className="pagination pull-right">
                    <li key="first" onClick={this.changePage.bind(this, 1)} className={firstClass}><a>«</a></li>
                    <li key="prev" onClick={this.changePage.bind(this, current - 1)} className={prevClass}><a>‹</a></li>
                    {pageViews}
                    <li key="next" onClick={this.changePage.bind(this, current + 1)} className={nextClass}><a>›</a></li>
                    <li key="last" onClick={this.changePage.bind(this, total)} className={lastClass}><a>»</a></li>
                </ul>
            )
        }
    }
}