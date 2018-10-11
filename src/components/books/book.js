import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import './books.css';
import Api from '../../utils/api';

class Book extends Component {

  constructor(props) {
    super(props);

    this.showDetails = this.showDetails.bind(this);
    this.deleteBook = this.deleteBook.bind(this);
    this.editBook = this.editBook.bind(this);
  }

  getStars(n) {
    let result = '';
    for (let i = 0; i < n; i++) result += String.fromCharCode(9733);
    for (let i = n; i < 5; i++) result += String.fromCharCode(9734);
    return result;
  }

  showDetails() {
    const details =
      (<React.Fragment>
        <img src={this.props.file} alt="Book" />
        <div className="book-info">
          <h3> {this.props.author + " - " + this.props.title} </h3>
          <div> {this.getStars(this.props.rating)} </div>
          <div> {this.props.description} </div>
        </div>
      </React.Fragment>);
    ReactDOM.render(details, this.props.details[0]);
  }

  editBook() {
    this.props.history.push('/edit/' + this.props._id);
  }

  deleteBook() {
    const api = new Api();

    api.deleteBook(this.props._id)
      .then(() => this.props.rerenderList());
  }

  render() {

    return (
      <tr className={this.props.status ? null : 'disabled-row'}>
        <td> {this.props.id} </td>
        <td> {this.props.author} </td>
        <td
          onClick={this.showDetails}
          style={{ cursor: 'pointer' }}>
          {this.props.title}
        </td>
        <td> {this.getStars(this.props.rating)} </td>
        <td> {this.props.status ? 'ON' : 'OFF'} </td>
        <td>
          <button
            className="button button-edit"
            onClick={this.editBook}
          >
            Edit
          </button>

          <button
            className="button button-delete"
            onClick={this.deleteBook}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  }

}

export default connect()(withRouter(Book));