const Auth = {
  getEmail() {
    return localStorage.getItem('email');
  },

  getRole() {
    return localStorage.getItem('role');
  }, 

  logout(props) {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('email');
    alert('Logout successful');
    props.history.push('/login');
  },

  setUser(email, token, role) {
    localStorage.setItem('jwtToken', token);
    localStorage.setItem('email', email);
    localStorage.setItem('role', role);
  },

  getToken() {
    return localStorage.getItem('jwtToken');
  },

  isLoggedIn() {
    return this.getToken() !== null;
  }
}

export default Auth;