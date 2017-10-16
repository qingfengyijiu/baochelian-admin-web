import React from 'react';
import {Route, IndexRoute} from 'react-router';
import MyTestAddPage from './containers/AddPage.jsx';
import MyTestListPage from './containers/ListPage.jsx';
import MyTestUpdatePage from './containers/UpdatePage.jsx';

export default (
    <Route path='mytest'>
        <IndexRoute component={MyTestListPage}/>
        <Route path="add" component={MyTestAddPage}/>
        <Route path=":id/update" component={MyTestUpdatePage}/>
    </Route>
)