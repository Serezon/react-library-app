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
        console.log(response);
        Auth.setUser(response.email, response.token, response.role);
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
      .then(res => {
        if (res.status === 200) return res.json();

        if (res.status === 401) {
          alert('Authentication failed');
          throw new Error('Authentication failed!');
        }

        alert('Data load from server failed!');
        throw new Error('Data load from server failed!');

      })
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
    if (Auth.getRole() !== 'admin') {
      alert("You don't have permission to do this");
      return new Promise(() => Promise.reject());
    }

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