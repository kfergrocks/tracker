import { Link, useLocation } from 'react-router-dom';
import AuthUtil from '../utils/auth';

export default function Header() {
  const location = useLocation();
  const { pathname } = location;

  function getProfile() {
    if (AuthUtil.isLoggedIn()) {
      return [
        <h3 className="ms-auto" key="my-account">
          <Link
            to={`/editAccount`}
            className={`navlink ${
              pathname === '/editAccount' ? ' active' : ''
            }`}
          >
            My Account
          </Link>
        </h3>,
        <h5 className="mx-3" key="logout">
          <a className="navlink" onClick={AuthUtil.logout}>
            Logout
          </a>
        </h5>,
      ];
    } else {
      return (
        <h3 className="ms-auto">
          <Link
            to="/login"
            className={`navlink ${pathname === '/login' ? ' active' : ''}`}
          >
            Login
          </Link>
        </h3>
      );
    }
  }

  return (
    <header className="container-fluid bg-success-subtle py-3 px-5">
      <div className="d-flex align-items-center">
        <h2>Menopause Assistant</h2>
        {getProfile()}
      </div>
    </header>
  );
}
