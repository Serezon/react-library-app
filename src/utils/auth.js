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

  getToken() {
    return localStorage.getItem('jwtToken');
  },

  isLoggedIn() {
    return this.getToken() !== null;
  }
}

export default Auth;