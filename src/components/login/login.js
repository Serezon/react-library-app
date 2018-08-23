import React, { Component } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import Auth from '../../utils/auth';
import Api from '../../utils/api';
import './login.css';

class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const api = new Api();

    api.login(this.state)
      .then(() => this.props.history.push('/'));
  }

  render() {
    if (!Auth.isLoggedIn()) {
      return (
        <div className="wrapper">
          <form className="signin" onSubmit={this.handleSubmit}>

            <label htmlFor="inputEmail" className="signin__label">Email</label>
            <input
              type="email"
              placeholder="Email address"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
              required
            />

            <label htmlFor="inputPassword" className="signin__label">Password</label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              required
            />

            <button className="signin__btn" type="submit">Sign in</button>
            <p>
              Not a member?
              <Link to="/signup">
                Signup here
              </Link>
            </p>
          </form>
        </div>
      )
    }
    return <Redirect to='/' />;
  }

}

export default withRouter(Login);