import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Api from '../../utils/api';

class BookEditor extends Component {

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
    this.handleChange = this.handleChange.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }


  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleUpload(e) {
    this.setState({ file: e.target.files[0] });
  }

  onSubmit(e) {
    e.preventDefault();
    let body = new FormData();
    const api = new Api();

    for (let prop in this.state) {
      if (this.state[prop]) body.append(prop, this.state[prop]);
    };

    api.createBook(body)
      .then(() => this.props.history.push('/'));
    // api.updateBook(this.props.match.params.id, body)
    //   .then(() => this.props.history.push('/'));
  }

  render() {

  }

}

export default withRouter(BookEditor);