import React, { Component } from 'react';

import './book-form.scss';

class BookForm extends Component {

  render() {
    return (
      <form onSubmit={this.props.onSubmit} className="form-editor form justify-content-center">
        <h4 className="display-4">Book Editor</h4>
        <div className="form-group">
          <div className="custom-file">
            <input
              type="file"
              className="custom-file-input"
              name="file"
              onChange={this.props.handleUpload}
              accept=".jpg, .png"
            />
            <label class="custom-file-label" for="file">Choose file</label>
          </div>
        </div>

        <div className="form-group">
          <label for="author">Author</label>
          <input
            type="text"
            className="form-control"
            name="author"
            placeholder="Author"
            value={this.props.state.author}
            onChange={this.props.handleChange}
            required />
        </div>

        <div className="form-group">
          <label for="title">Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            placeholder="Title"
            value={this.props.state.title}
            onChange={this.props.handleChange}
            required />
        </div>

        <div className="form-group">
          <label for="description">Book description</label>
          <textarea
            name="description"
            className="form-control"
            rows="5"
            placeholder="Description..."
            value={this.props.state.description}
            onChange={this.props.handleChange}
            required />
        </div>

        <div className="form-group">
          <label for="rating">Rating</label>
          <input
            type="number"
            className="form-control"
            name="rating"
            placeholder="Number from 1 to 5"
            min="1" max="5"
            value={this.props.state.rating}
            onChange={this.props.handleChange}
            required />
        </div>

        <div className="form-group">
          <label for="status">Status</label>
          <select className="custom-select" name="status" value={this.props.state.status} onChange={this.props.handleChange}>
            <option value="true">true</option>
            <option value="false">false</option>
          </select>
        </div>

        <button className="btn btn-primary" type="submit">Submit</button>
      </form>
    );
  }

}

export default BookForm;