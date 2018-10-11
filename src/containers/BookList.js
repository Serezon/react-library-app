import React, { Component } from 'react';
import Books from '../components/books/books'
import Book from '../components/books/book'
import { connect } from 'react-redux'
import {
  fetchBooks,
  sortListBy,
  changeListOrder,
  changeListPage,
  searchBook
} from '../actions/index';
import Api from '../utils/api';

class BookList extends Component {

  constructor(props) {
    super(props);
    this.bookDetails = document.getElementsByClassName('book-details');

    this.showBooks = this.showBooks.bind(this);
    this.changePage = this.changePage.bind(this);
    this.sortList = this.sortList.bind(this);
    this.resetSearch = this.resetSearch.bind(this);
    this.getQuery = this.getQuery.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const query = this.getQuery();
    fetchBooks(dispatch, query)
      .then((books) => this.showBooks(books))
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.query !== nextProps.query) {
      const query = this.getQuery(nextProps.query);

      fetchBooks(nextProps.dispatch, query)
        .then(() => this.showBooks(nextProps.listOfBooks, nextProps.query.skip));
    }
  }

  sortList(sortBy) {
    const { dispatch } = this.props;
    console.log(this.props.query.sortBy + ' ' + sortBy)

    if (this.props.query.sortBy === sortBy) {
      dispatch(changeListOrder());
    } else {
      dispatch(sortListBy(sortBy))
    }
  }

  changePage(n) {
    const { query, dispatch } = this.props;

    let newSkip = query.skip + query.limit * n;
    newSkip = newSkip > 0 ? newSkip : 0;
    dispatch(changeListPage(newSkip));
  }

  getQuery(query = this.props.query) {
    //Library that you gave me don't want to work properly, so i used some code from there for creating queries :)
    const qs = require('qs');

    const { sortBy, order, skip, limit, search } = query;

    let params = {
      sortBy: sortBy,
      order: order,
      skip: skip,
      limit: limit
    };

    if (search !== '') params['search'] = search;

    return qs.stringify(params);

  }

  resetSearch() {
    this.props.dispatch(searchBook(''))
  }

  handleChange(search) {
    this.props.dispatch(searchBook(search));
  }

  showBooks(result, bookCounter = this.props.query.skip) {
    const api = new Api();
    const url = api.getUrl();

    let books = result.map((book) => {
      book.file = `${url}/${book.file}`;
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
        rerenderList={() => this.showBooks(fetchBooks(this.props.dispatch, this.getQuery()))}
      />);
    });

    return books
  }

  render() {
    if (this.props.listOfBooks) {
      let data = this.showBooks(this.props.listOfBooks)
      return <Books data={data}
        handleChange={this.handleChange}
        changePage={this.changePage}
        resetSearch={this.resetSearch}
        sortList={this.sortList}
        {...this.props} />
    }
    return (
      <Books isFetching={this.props.isFetching} />
    );
  }

}

const mapStateToProps = state => {
  const { query, listOfBooks, isFetching, fetchError } = state;


  return {
    query,
    listOfBooks,
    isFetching,
    fetchError
  }
}

export default connect(mapStateToProps)(BookList);