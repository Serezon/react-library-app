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
const PrivateRoute = ({ component: Component, roles, ...rest }) => (
  <Route {...rest} render={(props) => {
      if (!Auth.isLoggedIn()) return <Redirect to='/login' />;

      if (!roles.includes(Auth.getRole())) {
        alert("You don't have permission to do this");
        return <Redirect to='/' />;
      }

      return <Component {...props} />
    }
  } />
)

class Router extends Component {

  render() {
    return (
      <BrowserRouter>
        <div>
          <App />
          <Switch>
            <PrivateRoute path='/' roles={['admin', 'editor', 'user']} exact component={Books} />
            <PrivateRoute path='/add' roles={['admin']} component={BookAdd} />
            <PrivateRoute path='/edit/:id' roles={['admin', 'editor']} component={BookEdit} />
            <Route path='/login' component={Login} />
            <Route path='/signup' component={Signup} />
            <Route component={ () => <h2>Page not found</h2> }/>
            <Redirect from='*' to='/' />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default Router;