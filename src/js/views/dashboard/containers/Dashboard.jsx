import React, {Component} from 'react';

class Dashboard extends Component {

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		document.title = '运营概览';
	}

	getDashboardItems = items => {
		return items.map((item, index) => {
			return (
				<div className="dashboard-item" key={item.label}>
					<div className="item-label">{item.label}</div>
					<div className="item-value">{item.value}</div>
				</div>
			)
		})
	}

	render() {
		let items = [{
			label: "今日流水",
			value: "16678.97"
		}, {
			label: "今日订单",
			value: "16678.97"
		}, {
			label: "新增用户",
			value: "16678"
		}, {
			label: "总流水",
			value: "16678.97"
		}, {
			label: "总订单数",
			value: "16678"
		}, {
			label: "总用户数",
			value: "16678"
		}]
		return (
			<div className="dashboard">
				{this.getDashboardItems(items)}
			</div>
		)
	}
}

export default Dashboard;