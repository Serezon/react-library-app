import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

//Components
import App from './app';
import Books from './components/books/books';
import Login from './components/login/login';
import Signup from './components/signup/signup';
import BookAdd from './components/book-add/book-add';
import BookEdit from './components/book-edit/book-edit';

//Utils
import Auth from './utils/auth';

//Private route
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    Auth.isLoggedIn() === true
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
)

class Router extends Component {

  render() {
    return (
      <BrowserRouter>
        <div>
          <App />
          <Switch>
            <PrivateRoute path='/' exact component={Books} />
            <PrivateRoute path='/add' component={BookAdd} />
            <PrivateRoute path='/edit/:id' component={BookEdit} />
            <Route path='/login' component={Login} />
            <Route path='/signup' component={Signup} />
            <Redirect from='*' to='/' />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default Router;