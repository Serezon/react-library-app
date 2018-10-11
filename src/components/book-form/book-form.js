import React, { Component } from 'react';

import './book-form.css';

class BookForm extends Component {

  render() {
    return (
      <form onSubmit={this.props.onSubmit} className="form-editor">
        <input type="file" name="file" onChange={this.props.handleUpload} accept=".jpg, .png" />
        <input type="text" name="author" placeholder="author" value={this.props.state.author} onChange={this.props.handleChange} required />
        <input type="text" name="title" placeholder="Title" value={this.props.state.title} onChange={this.props.handleChange} required />
        <textarea
          name="description"
          rows="10"
          placeholder="Description..."
          value={this.props.state.description}
          onChange={this.props.handleChange}
          required
        >
        </textarea>
        <input
          type="number"
          name="rating"
          placeholder="Number from 1 to 5"
          min="1" max="5"
          value={this.props.state.rating}
          onChange={this.props.handleChange}
          required />
        <select name="status" value={this.props.state.status} onChange={this.props.handleChange}>
          <option value="true">true</option>
          <option value="false">false</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    );
  }

}

export default BookForm;