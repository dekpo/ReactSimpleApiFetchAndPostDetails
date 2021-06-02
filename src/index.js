import React from 'react';
import ReactDOM from 'react-dom';
import List from './List';
import Details from './Details';
import { BrowserRouter, Switch, Route } from 'react-router-dom';


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Switch>
    <Route path="/details/:id" component={Details} />
    <Route path="/" component={List} />
    </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
