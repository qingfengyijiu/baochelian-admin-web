import React from 'react';
import {Route, IndexRoute} from 'react-router';
import AddPage from './containers/AddPage.jsx';
import ListPage from './containers/ListPage.jsx';
import UpdatePage from './containers/UpdatePage.jsx';

export default (
    <Route path='specificationCategory'>
        <IndexRoute component={ListPage}/>
        <Route path=":id/update" component={UpdatePage}/>
        <Route path="add" component={AddPage}/>
    </Route>
)
