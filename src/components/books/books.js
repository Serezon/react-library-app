import React, { Component } from 'react';
import Book from './book';

import './books.css';

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
    this.makeQuery = this.makeQuery.bind(this);
    this.sortList = this.sortList.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
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

  makeQuery() {
    //Is there a better way to create a query in react w/o libraries?
    let params = Object.assign({}, this.state);
    delete params.data;
    if (!params.search) delete params.search;

    let esc = encodeURIComponent;
    return '/?' + Object.keys(params)
      .map(k => esc(k) + '=' + esc(params[k]))
      .join('&');
  }

  handleSearch() {
    let searchValue = document.getElementsByName('search')[0].value;
    this.setState({ search: searchValue }, () => this.getBooks());
  }

  getBooks() {
    let bookCounter = this.state.skip;

    fetch('http://localhost:4040/api/books' + this.makeQuery(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
      }
    }).then(res => res.json())
      .then(result => {
        return result.map((book) => {
          book.file = 'http://localhost:4040/' + book.file;
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
      })
      .then((data) => {
        this.setState({ data: data });
      })
      .catch(error => console.log(error));
  }

  render() {
    if (!this.state.data) return (
      <img
        src="loading.gif"
        alt="Loading.."
        style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', width: '10%' }}
      />
    );

    if (this.state.data && this.state.data.length === 0) {
      return <div style={{ textAlign: 'center' }} >
        There's no book left <br />
        <button onClick={() => this.changePage(-1)}>Page before</button>
        <button 
        onClick={() => this.setState({search: ''}, () => this.getBooks())}
        >
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
          placeholder="search" 
          />
          <button onClick={this.handleSearch}>GO</button>
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