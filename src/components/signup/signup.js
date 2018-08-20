import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
// import history from '../../utils/history';
import './signup.css';

class Signup extends Component {

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
    
    fetch('http://localhost:4040/api/users/signup', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { "Content-Type" : "application/json" }
    }).then(res => res.json())
    .then( () => {
      alert('Signup successful!');
      this.props.history.push('/login');
    })
    .catch(error => console.error('Error:', error));
  }

  render() {
    return (
      <div className="wrapper">
        <form className="signin" onSubmit={this.handleSubmit}>
          <h2>Sign Up Now</h2>

          <label htmlFor="inputEmail">Email address</label>
          <input type="email" placeholder="Email address" name="email" required />

          <label htmlFor="inputPassword" >Password</label>
          <input type="password" placeholder="Password" name="password" required />
          
          <button type="submit">Sign Up</button>
        </form>
      </div>
    );
  }
}

export default withRouter(Signup);