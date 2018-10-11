import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import BookForm from '../components/book-form/book-form';

import Api from '../utils/api';

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
    this.getBook = this.getBook.bind(this);
  }

  componentDidMount() {
    if (this.props.match.params.id) this.getBook();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.id !== nextProps.match.params.id) {
      this.setState({
        author: '',
        title: '',
        rating: '',
        status: true,
        file: null,
        description: ''
      });
    }
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
      if (this.state[prop]) body.append(prop, this.state[prop]);
    };

    const route = this.props.location.pathname;
    if (route.indexOf('/add') !== -1) {
      api.createBook(body)
        .then(() => this.props.history.push('/'));
    } else if (route.indexOf('/edit') !== -1) {
      api.updateBook(this.props.match.params.id, body)
        .then(() => this.props.history.push('/'));
    }
  }

  render() {
    // if (this.route.indexOf('/add' !== -1)) 
    //   return <BookForm />
    // if (this.route.indexOf('/edit' !== -1))
    return <BookForm
      handleChange={this.handleChange}
      handleUpload={this.handleUpload}
      onSubmit={this.onSubmit}
      state={this.state}
    />

  }

}

export default withRouter(BookEditor);