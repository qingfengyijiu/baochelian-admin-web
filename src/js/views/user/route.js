import React from 'react';
import {Route, IndexRoute} from 'react-router';
import ListPage from './containers/ListPage.jsx';

export default (
    <Route path='user'>
        <IndexRoute component={ListPage}/>
    </Route>
)
