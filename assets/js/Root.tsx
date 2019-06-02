import * as React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Header from './components/Header';
import HomePage from './pages';
import CounterPage from './pages/counter';
import FetchDataPage from './pages/fetch-data';
import AddLanguagePage from './pages/language-add';

const Root: React.FC = () => (
    <>
        <Header/>
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={HomePage}/>
                <Route path="/counter" component={CounterPage}/>
                <Route path="/fetch-data" component={FetchDataPage}/>
                <Route path="/add-language" component={AddLanguagePage}/>
            </Switch>
        </BrowserRouter>
    </>
);

export default Root;
