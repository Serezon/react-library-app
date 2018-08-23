const Auth = {
  getEmail() {
    return localStorage.getItem('email');
  },

  logout(props) {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('email');
    alert('Logout successful');
    props.history.push('/login');
  },

  setUser(email, token) {
    localStorage.setItem('jwtToken', token);
    localStorage.setItem('email', email);
  },

  getToken() {
    return localStorage.getItem('jwtToken');
  },

  isLoggedIn() {
    return this.getToken() !== null;
  }
}

export default Auth;