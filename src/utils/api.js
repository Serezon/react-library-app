import Auth from './auth';

export default class Api {

  constructor() {
    this.url = 'http://localhost:4040';
  }

  getUrl() {
    return this.url;
  }

  login(data) {
    return fetch(`${this.url}/api/auth/login`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => {
        if (res.status === 200) return res.json();
        alert('Authentication error');
        throw new Error('Authentication failed!');
      })
      .then(response => {
        alert('Login successful!');
        Auth.setUser(data.email, response.token);
      })
      .catch(error => console.error('Error:', error))
  }

  signup(data) {
    return fetch(`${this.url}/api/users/signup`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    }).then(res => res.json())
      .then((res) => {
        alert('Signup successful!');
        return res;
      })
  }

  getBooks(query) {
    return fetch(`${this.url}/api/books/?${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + Auth.getToken()
      }
    })
      .then(res => res.json())
      .catch(error => console.log(error));
  }

  getBook(_id) {
    return fetch(`${this.url}/api/books/${_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + Auth.getToken()
      }
    }).then(res => res.json())
  }

  createBook(body) {
    return fetch(`${this.url}/api/books/create`, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + Auth.getToken()
      },
      body: body,
    })
      .then(res => res.json())
      .then(response => {
        console.log(response);
        alert('Book was added successfully!')
        return response;
      })
      .catch(error => console.error('Error:', error));

  }

  updateBook(id, body) {
    return fetch('http://localhost:4040/api/books/' + id, {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + Auth.getToken()
      },
      body: body,
    })
      .then(res => res.json())
      .then(response => {
        console.log(response);
        alert('Book was updated successfully!');
        return response;
      })
      .catch(error => console.error('Error:', error));
  }

  deleteBook(_id) {
    return fetch(`${this.url}/api/books/${_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + Auth.getToken()
      }
    })
      .then(res => res.json())
      .then(response => {
        console.log(response);
        alert('Book was deleted successfully!');
        return response;
      })
      .catch(error => console.error('Error:', error));
  }


}