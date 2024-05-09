import { jwtDecode } from 'jwt-decode';
class AuthUtil {
  getAuthHeader() {
    const token = this.getToken();
    return token ? `Bearer ${token}` : '';
  }

  getUserData(key) {
    try {
      return this.isLoggedIn && jwtDecode(this.getToken()).data[key];
    } catch (err) {
      return '';
    }
  }

  isLoggedIn() {
    const token = this.getToken();
    console.log(!!token && !this.isTokenExpired(token));
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token) {
    try {
      const decoded = jwtDecode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    return localStorage.getItem('id_token');
  }

  login(idToken) {
    localStorage.setItem('id_token', idToken);
  }

  logout() {
    localStorage.removeItem('id_token');
    window.location.assign('/login');
  }
}

export default new AuthUtil();
