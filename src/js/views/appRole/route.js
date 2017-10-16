import React from 'react';
import {Route, IndexRoute} from 'react-router';
import AppAddPage from './containers/AddPage.jsx';
import AppListPage from './containers/ListPage.jsx';
import AppUpdatePage from './containers/UpdatePage.jsx';
import AppCountChargeDetailPage from './containers/CountChargeDetailPage.jsx';

import CpUpdatePage from './containers/UpdatePage.jsx';

export default (
    <Route path='app'>
        <IndexRoute component={AppListPage}/>
        <Route path="add" component={AppAddPage}/>
        <Route path=":id" component={AppCountChargeDetailPage}/>
        <Route path=":id/update" component={AppUpdatePage}/>
    </Route>
)
