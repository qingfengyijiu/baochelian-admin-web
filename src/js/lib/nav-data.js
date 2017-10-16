export let navIds = {
    SP_DATA: '100000',
    SP_DATA_LIST: '100001',
    SP_DATA_ADD_UPDATA: '100002',
    SP_DATA_CODE_LIST: '100003',
    SP_DATA_CODE_ADD_UPDATA: '100004',
    SP_DATA_CODE_RATES_LIST: '100006',
    SP_DATA_CODE_RATES_ADD_UPDATA: '100006',
    SP_DATA_RATES_LIST: '100007',
    SP_DATA_CODE_CONFIG: '100008',
    SP_DATA_CODE_CONFIG_ADD: '100009',
    SP_USERDATA: '200000',
    SP_USERDATA_LIST: '200001',
    SP_USERDATA_ADD: '200002',
    CP: '300000',
    CP_LIST: '300001',
    CP_COUNTLIST: '300002',
    APP_LIST: '300003',
    COUNT_LIST: '300004',
    CHARGE: '900000',
    CP_CMD_FEE_LIMIT_LIST: '400000',
    CP_CHECK_REDUCE_LIST: '500000',
    BLACKLIST:'600000',
    USER: '110000',
    USER_LIST: '110001',
    USER_ADD: '110002',
    HELP: '700000'
};

export let navDatas = [{
    id: "100000",
    text: '运营概况',
    href: '/dashboard'
}, {
    id: '200000',
    text: '用户管理',
    href: '/user'
}, {
    id: '300000',
    text: '订单管理',
    href:'/order'
}, {
    id: '400000',
    text: '提现管理',
    href:'/withdraw'
}, {
	id: '500000',
	text: '品牌管理',
	href: '/brand',
	children: [{
		id: '500001',
		text: '新增品牌',
		href: '/brand/add'
	}]
}, {
    id: '600000',
    text: '服务管理',
    href: '/service',
    children: [{
        id: '600001',
        text: '新增服务',
        href: '/service/add'
    }, {
        id: '600002',
        text: '添加耗材',
        href: '/equipment/add'
    }]
}, {
	id: '700000',
	text: '商品管理',
	href: '/brand',
	children: [{
		id: '700001',
		text: '添加商品',
		href: '/brand/add'
	}]
}, {
	id: '800000',
	text: '商品组管理',
	href: '/classification',
	children: [{
		id: '800001',
		text: '添加商品组',
		href: '/classification/add'
	}]
},{
    id: '900000',
    text: '分润管理',
    children: [{
        id: '900001',
        text: '平台收费',
        href: '/profit'
    }]
}];


export function getNavData(loginType, roleId, roleType) {
    return navDatas;
}
