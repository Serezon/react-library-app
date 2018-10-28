import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './signup.scss';
import Api from '../../utils/api';

class Signup extends Component {

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
    api.signup(this.state)
      .then(() => this.props.history.push('/login'))
      .catch(error => console.error('Error:', error));
  }

  render() {
    return (
      <div className="wrapper">
        <form className="signup" onSubmit={this.handleSubmit}>
          <h2 className="display-4">Sign Up Now</h2>
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

          <button className="btn btn-primary" type="submit">Sign Up</button>
        </form>
      </div>
    );
  }
}

export default withRouter(Signup);