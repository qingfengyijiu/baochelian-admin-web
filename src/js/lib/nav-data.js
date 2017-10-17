export let navIds = {
	DASHBOARD: '100000',
	USER_LIST: '200000',
	yy: '300000',
	yy_ADD: '300001',
	BRAND_LIST: '400000',
	BRAND_ADD: '400001',
	CLASSIFICATION_LIST: '500000',
	CLASSIFICATION_ADD: '500001',
	SPECIFICATION: '600000',
	SPECIFICATION_CATEGORY_LIST: '600001',
	SPECIFICATION_CATEGORY_ADD: '600002',
	SPECIFICATION_LIST: '600003',
	SPECIFICATION_ADD: '600004',
	PRODUCT: '700000',
	SPU_LIST: '700001',
	SPU_ADD: '700002',
	SKU_LIST: '700003',
	SKU_ADD: '700004',
	yhq: '800000',
	yhq_ADD: '800001',
	SERVICE_LIST: '900000',
	SERVICE_ADD: '900001',
	ORDER_LIST: '010000',
	WITHDRAW_LIST: '110000',
	FINANCE_REPORT: '210000',
	ACCOUNT_LIST: '310000',
	ACCOUNT_ADD: '310001'
};

export let navDatas = [{
    id: navIds.DASHBOARD,
    text: '运营概况',
    href: '/dashboard'
}, {
    id: navIds.USER_LIST,
    text: '用户管理',
    href: '/user'
}, {
	id: navIds.BRAND_LIST,
	text: '品牌管理',
	href: '/brand',
	children: [{
		id: navIds.BRAND_ADD,
		text: '新增品牌',
		href: '/brand/add'
	}]
}, {
	id: navIds.CLASSIFICATION_LIST,
	text: '分组管理',
	href: '/classification',
	children: [{
		id: navIds.CLASSIFICATION_ADD,
		text: '新增分组',
		href: '/classification/add'
	}]
}, {
	id: navIds.SPECIFICATION,
	text: '规格管理',
	children: [{
		id: navIds.SPECIFICATION_CATEGORY_LIST,
		text: '规格种类列表',
		href: '/specificationCategory'
	}, {
		id: navIds.SPECIFICATION_CATEGORY_ADD,
		text: '新增规格种类',
		href: '/specificationCategory/add'
	}, {
		id: navIds.SPECIFICATION_LIST,
		text: '规格列表',
		href: '/specification',
	}, {
		id: navIds.SPECIFICATION_ADD,
		text: '新增规格',
		href: '/specification/add'
	}]
}, {
	id: navIds.PRODUCT,
	text: '商品管理',
	children: [{
		id: navIds.SPU_LIST,
		text: 'spu列表',
		href: '/spu'
	}, {
		id: navIds.SPU_ADD,
		text: '新增spu',
		href: '/spu/add'
	}, {
		id: navIds.SKU_LIST,
		text: 'sku列表',
		href: '/sku'
	}, {
		id: navIds.SKU_ADD,
		text: '新增sku'
	}]
}, {
    id: navIds.SERVICE_LIST,
    text: '服务管理',
    href: '/service',
    children: [{
        id: navIds.SERVICE_ADD,
        text: '新增服务',
        href: '/service/add'
    }]
}];


export function getNavData(loginType, roleId, roleType) {
    return navDatas;
}
