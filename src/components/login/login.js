import React, { Component } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import Auth from '../../utils/auth';
import Api from '../../utils/api';
import './login.scss';

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
          <h2 className="display-4">Sign in</h2>
          
          <form className="signin" onSubmit={this.handleSubmit}>

            <div class="form-group">
              <label htmlFor="inputEmail">Email</label>
              <input
                className="form-control"
                type="email"
                placeholder="Email address"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
                required
              />
            </div>

            <div class="form-group">
              <label htmlFor="inputPassword">Password</label>
              <input
                className="form-control"
                type="password"
                placeholder="Password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
                required
              />
            </div>

            <button className="btn btn-primary" type="submit">Sign in</button>
          </form>
          <p className="lead">
              Not a member?&#160;
              <Link to="/signup">
                Signup here
              </Link>
            </p>
        </div>
      )
    }
    return <Redirect to='/' />;
  }

}

export default withRouter(Login);