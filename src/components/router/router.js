import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

//Components
import App from '../app/app';
import Login from '../login/login';
import Signup from '../signup/signup';

//Containers
import BookList from '../../containers/BookList';
import BookEditor from '../../containers/BookEditor';

//Utils
import Auth from '../../utils/auth';

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
        <Fragment>
          <App />
          <Switch>
            <PrivateRoute path='/' roles={['admin', 'editor', 'user']} exact component={BookList} />
            <PrivateRoute path='/add' roles={['admin']} component={BookEditor} />
            <PrivateRoute path='/edit/:id' roles={['admin', 'editor']} component={BookEditor} />
            <Route path='/login' component={Login} />
            <Route path='/signup' component={Signup} />
            <Route component={ () => <h2>Page not found</h2> }/>
            <Redirect from='*' to='/' />
          </Switch>
        </Fragment>
      </BrowserRouter>
    );
  }
}

export default Router;