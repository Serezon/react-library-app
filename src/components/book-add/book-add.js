import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import './book-add.css';

class BookAdd extends Component {

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    let body = new FormData();

    let data = Array.prototype.filter.call(e.target.elements, 
      (input) => {
        if (input.nodeName === 'BUTTON') return false;
        return true;
      });
    Array.prototype.map.call(data, (input) => {
      input.id !== 'file' ? body.append( input.id, input.value )
      : body.append('file', input.files[0]);
    });
    
    fetch('http://localhost:4040/api/books/create', {
      method: 'POST',
      headers: { 
        'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
     },
      body: body,
    })
    .then(res => res.json())
      .then(response => {
        console.log(response);
        alert('Book was added successfully!')
        this.props.history.push('/');
      })
      .catch(error => console.error('Error:', error));
  }

  render() {
    return (
      <form onSubmit={this.onSubmit} className="form-add">
        <input type="file" id="file" accept=".jpg, .png" required />
        <input type="text" id="author" placeholder="author" required />
        <input type="text" id="title" placeholder="Title" required />
        <textarea id="description" rows="10" placeholder="Description..." required ></textarea>
        <input type="number" id="rating" placeholder="Number from 1 to 5" min="1" max="5" required/>
        <select name="status" id="status">
          <option value="true">true</option>
          <option value="false">false</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    );
  }

}

export default withRouter(BookAdd);