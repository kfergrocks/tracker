import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { loginUser } from '../utils/API';
import AuthUtil from '../utils/auth';

export default function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const newLoginInfo = { ...loginInfo };
    newLoginInfo[e.target.id] = e.target.value;
    setLoginInfo(newLoginInfo);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const loginResp = await loginUser(loginInfo);
    const loginData = await loginResp.json();
    if (loginResp.status === 200) {
      AuthUtil.login(loginData.token);
      navigate('/home');
    } else {
      setError(loginData.message);
    }
  };

  const getError = () => {
    if (error !== '') {
      return (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      );
    } else return;
  };

  return (
    <div className="row mx-1 mt-5" key="login">
      <div className="col-1 col-md-4"></div>
      <div className="col-10 col-md-4">
        <form className="row center-cell mt-5" onSubmit={handleFormSubmit}>
          {getError()}
          <input
            type="text"
            className="form-control mb-3 mt-5"
            id="email"
            required
            placeholder="email"
            onChange={handleInputChange}
            value={loginInfo.email}
          />
          <input
            type="password"
            className="form-control mb-3"
            id="password"
            required
            placeholder="password"
            onChange={handleInputChange}
            value={loginInfo.password}
          />

          <button
            type="submit"
            className="btn bg-success-subtle mb-3 w-25 mx-auto"
          >
            Submit
          </button>

          <Link to="/account" className="mb-5">
            Create Account
          </Link>
        </form>
      </div>
      <div className="col-1 col-md-4"></div>
    </div>
  );
}
