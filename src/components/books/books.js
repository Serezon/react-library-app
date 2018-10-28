import React, { Component } from 'react';

import './books.scss';

class Books extends Component {

  render() {
    if (this.props.isFetching) return (
      <img
        src="loading.gif"
        alt="Loading.."
        className="loading-gif"
      />
    );

    if (this.props.fetchError) return (
      <p>Error occured while loading books</p>
    )

    if (this.props.data && this.props.data.length === 0) {
      return (<div className="nobook-message" >
        <h4>There's no book left</h4> 
        <button className="btn btn-light" onClick={() => this.props.changePage(-1)}>
          Page before
        </button>

        <button className="btn btn-light" onClick={this.props.resetSearch}>
          Cancel search
        </button>
      </div>)
    }

    return (
      <div className="container">
        <div className="head">
          <h1 className="display-4">Books</h1>

          <div className="search">

            <input type="search"
              className="form-control"
              name="search"
              ref="searchField"
              placeholder="search"
            />

            <button
              className="btn btn-secondary"
              onClick={() => this.props.handleChange(this.refs.searchField.value)}
            >
              GO
          </button>

            <button
              hidden={!this.props.query.search}
              className="btn btn-secondary"
              onClick={this.props.resetSearch}
            >
              Cancel
            </button>

          </div>
        </div>
        <div className="change-page">
          <button
            disabled={this.props.query.skip === 0}
            className="btn btn-light"
            onClick={() => this.props.changePage(-1)}>&#8592; Previous page</button>
          <button
            disabled={this.props.data.length < 3}
            className="btn btn-light"
            onClick={() => this.props.changePage(1)}>Next page &#8594;</button>
        </div>

        <table className="table table-hover">

          <thead className="thead-light">
            <tr>
              <th scope="col">№</th>
              <th scope="col">
                <span onClick={() => this.props.sortList('author')}> Author </span>
              </th>
              <th scope="col">
                <span onClick={() => this.props.sortList('title')}> Title </span>
              </th>
              <th scope="col">
                <span onClick={() => this.props.sortList('rating')}> Rating </span>
              </th>
              <th scope="col">
                <span onClick={() => this.props.sortList('status')}> Status </span>
              </th>
              <th scope="col">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {this.props.data}
          </tbody>

        </table>

        <div className="book-details"></div>

      </div >
    );
  }
}

export default Books;