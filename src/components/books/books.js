import React, { Component } from 'react';
import Book from './book';

import './books.css';
import Api from '../../utils/api';

class Books extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sortBy: 'author',
      order: 1,
      skip: 0,
      limit: 3,
      search: '',
      data: null
    };
    this.bookDetails = document.getElementsByClassName('book-details');

    this.getBooks = this.getBooks.bind(this);
    this.showBooks = this.showBooks.bind(this);
    this.getQuery = this.getQuery.bind(this);
    this.sortList = this.sortList.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.getBooks();
  }

  sortList(sortBy) {
    if (this.state.sortBy === sortBy) {
      this.setState({ order: -this.state.order }, () => this.getBooks());
    } else {
      this.setState({ sortBy: sortBy }, () => this.getBooks());
    }
  }

  changePage(n) {
    let newSkip = this.state.skip + this.state.limit * n;
    this.setState({ skip: newSkip > 0 ? newSkip : 0 }, () => this.getBooks());
  }

  getQuery() {
    //Library that you gave me don't want to work properly, so i used some code from there for creating queries :)
    const qs = require('qs');

    let params = {
      sortBy: this.state.sortBy,
      order: this.state.order,
      skip: this.state.skip,
      limit: this.state.limit
    };

    if (this.state.search !== '') params['search'] = this.state.search;

    return qs.stringify(params);

  }

  handleChange(e) {
    this.setState({ search: e.target.value });
  }

  getBooks() {

    const api = new Api();
    api.getBooks(this.getQuery())
      .then(result => this.showBooks(result))
      .catch(error => console.log(error));
  }

  showBooks(result) {
    let bookCounter = this.state.skip;
    const api = new Api();

    let books = result.map((book) => {
      book.file = `${api.getUrl()}/${book.file}`;
      bookCounter += 1;
      return (<Book
        author={book.author}
        title={book.title}
        rating={book.rating}
        status={book.status}
        file={book.file}
        description={book.description}
        id={bookCounter}
        _id={book._id}
        key={bookCounter}
        details={this.bookDetails}
        rerenderList={this.getBooks}
      />);
    });

    this.setState({ data: books });

  }

  render() {
    if (!this.state.data) return (
      <img
        src="loading.gif"
        alt="Loading.."
        className="loading-gif"
      />
    );

    if (this.state.data && this.state.data.length === 0) {
      return <div className="nobook-message" >
        There's no book left <br />
        <button onClick={() => this.changePage(-1)}>
          Page before
      </button>

        <button onClick={() => this.setState({ search: '' }, () => this.getBooks())}>
          Cancel search
      </button>
      </div>
    }

    return (
      <div className="container">

        <h1 className="head">Books</h1>

        <div className="search">

          <input type="search"
            name="search"
            value={this.state.search}
            onChange={this.handleChange}
            placeholder="search"
          />
          <button onClick={this.getBooks}>GO</button>

        </div>

        <div className="change-page">
          <button disabled={this.state.skip === 0} onClick={() => this.changePage(-1)}>&#8592; Previous page</button>
          <button disabled={this.state.data.length < 3} onClick={() => this.changePage(1)}>Next page &#8594;</button>
        </div>

        <table className="table">

          <thead>
            <tr>
              <th>№</th>
              <th>
                <button onClick={() => this.sortList('author')}> Author </button>
              </th>
              <th>
                <button onClick={() => this.sortList('title')}> Title </button>
              </th>
              <th>
                <button onClick={() => this.sortList('rating')}> Rating </button>
              </th>
              <th>
                <button onClick={() => this.sortList('status')}> Status </button>
              </th>
              <th>
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {this.state.data}
          </tbody>

        </table>

        <div className="book-details"></div>

      </div >
    );
  }
}

export default Books;