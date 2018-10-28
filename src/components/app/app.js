import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

//CSS
import './app.scss';

//Utils
import Auth from '../../utils/auth';

class App extends Component {

  render() {
    let currentRoute = this.props.location.pathname;

    return (
      <nav className='navbar navbar-expand navbar-light bg-light justify-content-between'>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className={[currentRoute === '/' ? 'active nav-link' : 'nav-link']} to="/">Books</Link>
          </li>
          <li className="nav-item">
            <Link className={[currentRoute.indexOf('/add') !== -1 ? 'active nav-link' : 'nav-link']} to="/add">Add</Link>
          </li>
          <li className="nav-item">
            <Link className={[currentRoute.indexOf('/edit') !== -1 ? 'active nav-link' : 'nav-link']} to="/edit">Edit</Link>
          </li>
        </ul>
        <div>
          <span className="nav__email navbar-text"> {Auth.getEmail() || ''} </span>
          <Link to={Auth.isLoggedIn() ? '/' : '/login'}>
            <button className="btn btn-outline-primary" onClick={Auth.isLoggedIn() ? () => Auth.logout(this.props) : () => this.props.history.push('/')}>
              {Auth.isLoggedIn() ? 'Logout' : 'Login'}
            </button>
          </Link>
        </div>
      </nav>
    );
  }

}

export default withRouter(App);