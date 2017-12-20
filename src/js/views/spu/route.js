import React from 'react';
import {Route, IndexRoute} from 'react-router';
import AddPage from './containers/AddPage.jsx';
import ListPage from './containers/ListPage.jsx';
import UpdatePage from './containers/UpdatePage.jsx';
import SkuAddPage from '../sku/containers/AddPage.jsx';
import SkuListPage from '../sku/containers/ListPage.jsx';

export default (
    <Route path='spu'>
        <IndexRoute component={ListPage}/>
        <Route path=":id/update" component={UpdatePage}/>
        <Route path=":id/sku/add" component={SkuAddPage}/>
        <Route path="add" component={AddPage}/>
        <Route path=":id/sku" component={SkuListPage}/>
    </Route>
)
