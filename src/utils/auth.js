import history from './history';

const Auth = {
  getEmail() {
    return localStorage.getItem('email');
  },

  logout() {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('email');
    alert('Logout successful');
    history.push('/login');
  },

  getToken() {
    return localStorage.getItem('jwtToken');
  },

  isLoggedIn() {
    return this.getToken() !== null;
  }
}

export default Auth;