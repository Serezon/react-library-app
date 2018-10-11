import React, { Component } from 'react';

import './books.css';

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
        There's no book left <br />
        <button onClick={() => this.props.changePage(-1)}>
          Page before
        </button>

        <button onClick={this.props.resetSearch}>
          Cancel search
        </button>
      </div>)
    }

    return (
      <div className="container">

        <h1 className="head">Books</h1>

        <div className="search">

          <input type="search"
            name="search"
            ref="searchField"
            placeholder="search"
          />
          <button onClick={() => this.props.handleChange(this.refs.searchField.value)}>GO</button>
          <button hidden={!this.props.query.search} onClick={this.props.resetSearch}>Cancel</button>

        </div>

        <div className="change-page">
          <button disabled={this.props.query.skip === 0}
            onClick={() => this.props.changePage(-1)}>&#8592; Previous page</button>
          <button disabled={this.props.data.length < 3}
            onClick={() => this.props.changePage(1)}>Next page &#8594;</button>
        </div>

        <table className="table">

          <thead>
            <tr>
              <th>№</th>
              <th>
                <button onClick={() => this.props.sortList('author')}> Author </button>
              </th>
              <th>
                <button onClick={() => this.props.sortList('title')}> Title </button>
              </th>
              <th>
                <button onClick={() => this.props.sortList('rating')}> Rating </button>
              </th>
              <th>
                <button onClick={() => this.props.sortList('status')}> Status </button>
              </th>
              <th>
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