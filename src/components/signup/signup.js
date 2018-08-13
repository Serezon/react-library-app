import React, { Component } from 'react';
import history from '../../utils/history';
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
    
    fetch('https://enigmatic-badlands-81212.herokuapp.com/api/users/signup', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { "Content-Type" : "application/json" }
    }).then(res => res.json())
    .then( () => {
      alert('Signup successful!');
      history.push('/login');
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

export default Signup;