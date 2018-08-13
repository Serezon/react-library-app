import React, { Component } from 'react';
import { Router, Route, Link, Redirect } from 'react-router-dom';
import history from './utils/history';

//Components
import Books from './components/books/books';
import Login from './components/login/login';
import Signup from './components/signup/signup';

//CSS
import './app.css';


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

class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router history={history}>
        <div>
          <nav className='nav'>
            <div className="nav__links">
              <Link to="/">Books</Link>
              <Link to="/add">Add</Link>
              <Link to="/edit">Edit</Link>
            </div>
            <div>
              <span className="nav__email"> {Auth.getEmail() || ''} </span>
              <Link to={Auth.isLoggedIn() ? '/' : '/login'}>
                <button onClick={Auth.isLoggedIn() ? Auth.logout : () => history.push('/') }>{Auth.isLoggedIn() ? 'Logout' : 'Login'}</button>
              </Link>
            </div>
          </nav>

          <PrivateRoute path='/' exact component={Books} />
          <PrivateRoute path='/add' render={() => <a> Add </a>} />
          <PrivateRoute path='/edit' render={() => <a> Edit </a>} />
          <Route path='/login' component={Login} />
          <Route path='/signup' component={Signup}/>
        </div>
      </Router>
    );
  }
}

export default App;