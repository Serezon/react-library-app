import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
// import history from '../../utils/history';
import './signup.css';
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
        <form className="signin" onSubmit={this.handleSubmit}>
          <h2>Sign Up Now</h2>

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

          <button type="submit">Sign Up</button>
        </form>
      </div>
    );
  }
}

export default withRouter(Signup);