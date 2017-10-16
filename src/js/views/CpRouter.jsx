import React from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRoute, Redirect, IndexRedirect} from 'react-router';
import App from "./App.jsx";
import NotFound from './NotFound.jsx';
import userRoute from "./user/route.js";
// import MyTest from './_mytest/route.js';
// import cpCmdFeeLimit from './cpCmdFeeLimit/route.js';
// import cpReduceper from './cpReduceper/route.js';
// import phoneBlacklist from './PhoneBlacklist/route.js';
// import imsiBlacklist from './imsiBlacklist/route.js';

import cpRoute from './cpRole/route.js';
import appRoute from './appRole/route.js';
import countRoute from './countRole/route.js';
import helpRoute from './help/route.js';

export default class extends React.Component {

    render() {
        let {history} = this.props;
        return (
            <Router history={history}>
                <Route path="/" component={App}>
                    {userRoute}
                    {cpRoute}
                    {appRoute}
                    {countRoute}
                    {helpRoute}
                </Route>
                <Route path="*" component={NotFound}/>
            </Router>
        );
    }
}
