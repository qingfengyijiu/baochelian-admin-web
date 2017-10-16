import React from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRoute, Redirect, IndexRedirect} from 'react-router';
import App from "./App.jsx";
import NotFound from './NotFound.jsx';
import dashboardRoute from "./dashboard/route.js";
import userRoute from "./user/route";
import brandRoute from "./brand/route";
import classificationRoute from './classification/route';
import specificationCategoryRoute from './specificationCategory/route';
import specificationRoute from './specification/route';
import spuRoute from './spu/route';


export default class extends React.Component {

    render() {
        let {history} = this.props;
        return (
            <Router history={history}>
                <Route path="/" component={App}>
                    {dashboardRoute}
                    {userRoute}
                    {brandRoute}
                    {classificationRoute}
                    {specificationCategoryRoute}
                    {specificationRoute}
                    {spuRoute}
                </Route>
                <Route path="*" component={NotFound}/>
            </Router>
        );
    }
}
