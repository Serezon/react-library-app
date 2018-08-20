import React, { Component } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import Auth from '../../utils/auth';
import './login.css';

class Login extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const inputs = event.target;
    let data = {};

    for (let input of inputs) {
      if (input.value)
        data[input.name] = input.value;
    }

    fetch('http://localhost:4040/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    }).then(res => {
      if (res.status === 200 ) return res.json();
      alert('Authentication error');
      throw new Error('Authentication failed!');
    })
      .then(response => {
        localStorage.setItem('jwtToken', response.token);
        localStorage.setItem('email', data.email);
        alert('Login successful!');
        this.props.history.push('/');
      })
      .catch(error => console.error('Error:', error));
  }

  render() {
    if (!Auth.isLoggedIn()) {
      return (
        <div className="wrapper">
          <form className="signin" onSubmit={this.handleSubmit}>
            <label htmlFor="inputEmail" className="signin__label">Email</label>
            <input type="email" className="signin__input" placeholder="Email address" name="email" required />
            <label htmlFor="inputPassword" className="signin__label">Password</label>
            <input type="password" className="signin__input" placeholder="Password" name="password" required />
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