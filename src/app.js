import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
// import history from './utils/history';

//CSS
import './app.css';

//Utils
import Auth from './utils/auth';

class App extends Component {

  render() {
    let currentRoute = this.props.location.pathname;

    return (
          <nav className='nav'>
            <div className="nav__links">
              <Link className={ currentRoute === '/' ? 'current-route' : null } to="/">Books</Link>
              <Link className={ currentRoute === '/add' ? 'current-route' : null } to="/add">Add</Link>
              <Link className={ currentRoute.indexOf('/edit') !== -1 ?  'current-route' : null } to="/edit">Edit</Link>
            </div>
            <div>
              <span className="nav__email"> {Auth.getEmail() || ''} </span>
              <Link to={Auth.isLoggedIn() ? '/' : '/login'}>
                <button onClick={Auth.isLoggedIn() ? () => Auth.logout(this.props) : () => this.props.history.push('/')}>
                  {Auth.isLoggedIn() ? 'Logout' : 'Login'}
                </button>
              </Link>
            </div>
          </nav>
    );
  }
  
}

export default withRouter(App);