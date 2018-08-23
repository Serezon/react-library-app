import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import './book-edit.css';
import Api from '../../utils/api';

class BookEdit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      author: '',
      title: '',
      rating: '',
      status: true,
      file: null,
      description: ''
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.getBook = this.getBook.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }

  componentDidMount() {
    this.getBook();
  }

  getBook() {
    const api = new Api();

    api.getBook(this.props.match.params.id)
      .then(result => {
        this.setState({
          author: result.author,
          title: result.title,
          rating: result.rating,
          status: result.status,
          description: result.description,
          file: null
        });
      })
      .catch(error => console.log(error));

  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleUpload(e) {
    this.setState({ file: e.target.files[0] });
  }

  onSubmit(e) {
    e.preventDefault();
    let body = new FormData();
    const api = new Api();

    for (let prop in this.state) {
      body.append(prop, this.state[prop]);
    };

    api.updateBook(this.props.match.params.id, body)
      .then(() => this.props.history.push('/'));
  }

  render() {
    return (
      <form onSubmit={this.onSubmit} className="form-edit">
        <input type="file" name="file" onChange={this.handleUpload} accept=".jpg, .png" />
        <input type="text" name="author" placeholder="author" value={this.state.author} onChange={this.handleChange} required />
        <input type="text" name="title" placeholder="Title" value={this.state.title} onChange={this.handleChange} required />
        <textarea
          name="description"
          rows="10"
          placeholder="Description..."
          value={this.state.description}
          onChange={this.handleChange}
          required
        >
        </textarea>
        <input
          type="number"
          name="rating"
          placeholder="Number from 1 to 5"
          min="1" max="5"
          value={this.state.rating}
          onChange={this.handleChange}
          required />
        <select name="status" value={this.state.status} onChange={this.handleChange}>
          <option value="true">true</option>
          <option value="false">false</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    );
  }

}

export default withRouter(BookEdit);