import React from 'react';
import {Route, IndexRoute} from 'react-router';
import AppAddPage from './containers/AddPage.jsx';
import AppListPage from './containers/ListPage.jsx';
import UnderAppListPage from './containers/UnderAppListPage.jsx';
import AppUpdatePage from './containers/UpdatePage.jsx';
import AppCountChargeDetailPage from './containers/CountChargeDetailPage.jsx';

import CpUpdatePage from './containers/UpdatePage.jsx';

// let AllListPage = function(props) {
//   return (
//     <CpDetailPage key="all" {...props}/>
//   )
// }
//
// let UnderListPage = function(props) {
//   return (
//     <CpDetailPage key="under" {...props}/>
//   )
// }
export default (
    <Route path='app'>
        <IndexRoute component={AppListPage}/>
        <Route path=":cpKey" component={AppListPage}/>
        <Route path=":cpKey/:appName/:appKey" component={AppListPage}/>
        <Route path="add" component={AppAddPage}/>
          {/* <Route path="cpKey/:cpKey" component={CpDetailPage}/></Route> */}
        {/* <Route path="list/:id" component={UnderAppListPage}/> */}
        {/* <Route path=":id" component={AppCountChargeDetailPage}/> */}
        <Route path=":id/update" component={AppUpdatePage}/>
    </Route>
)
