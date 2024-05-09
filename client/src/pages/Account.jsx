import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import { createUser, getUser, updateUser } from '../utils/API';
import { format } from 'date-fns';

export default function Account() {
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
    lName: '',
    fName: '',
    dob: '',
  });
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isUpdate, setIsUpdate] = useState(false);
  let { id } = useParams();

  useEffect(() => {
    const getPageInfo = async () => {
      try {
        if (pathname === '/editAccount') {
          const userResp = await getUser();
          const user = await userResp.json();
          const dob = user.dob;
          user.updatePassword = false;
          user.password = '';
          user.passwordConfirm = '';
          user.loginPw = '';
          user.dob = format(new Date(dob), 'MM/dd/yyyy');
          setUserInfo(user);
          setIsUpdate(true);
        }
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    getPageInfo();
  }, [id]);

  const getPageTitle = () => {
    if (id) {
      return <h2 className="my-5">Update Account</h2>;
    } else {
      return <h2 className="my-5">Create Account</h2>;
    }
  };

  const getHeader = () => {
    if (!id) {
      return <Header></Header>;
    }
  };

  const handleInputChange = (e) => {
    const newUserInfo = { ...userInfo };
    if (e.target.type === 'checkbox') {
      newUserInfo[e.target.id] = e.target.checked;
    } else {
      newUserInfo[e.target.id] = e.target.value;
    }

    setUserInfo(newUserInfo);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    let createResp;
    if (isUpdate) {
      createResp = await updateUser(id, userInfo);
    } else {
      createResp = await createUser(userInfo);
    }
    if (createResp.status === 500) {
      const create = await createResp.json();
      if (create.errors) {
        setErrors(create.errors);
      }
    } else {
      navigate('/login');
    }
  };

  const getErrors = () => {
    if (errors.length > 0) {
      return (
        <div className="alert alert-danger mb-5" role="alert">
          Please fix the errors below:
          <ul className="mt-1 mb-0 errorList">
            {errors.map((error, i) => {
              return <li key={`error-${i}`}>{error}</li>;
            })}
          </ul>
        </div>
      );
    } else return;
  };

  return [
    <div key="body">
      <div className="row mt-2">
        <div className="col-1 col-sm-1 col-md-3"></div>
        <div className="col-10 col-sm-10 col-md-6">
          {loading ? (
            <div className="spinner-border text-dark" role="status">
              <span className="sr-only"></span>
            </div>
          ) : (
            <>
              {getPageTitle()}
              {getErrors()}
              <form
                className="row g-3 needs-validation"
                onSubmit={handleFormSubmit}
                noValidate
              >
                <div className="col-md-12">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    onChange={handleInputChange}
                    value={userInfo.email}
                    required
                  />
                </div>
                {isUpdate ? (
                  <>
                    <div className="col-md-6 mt-4">
                      <div className="form-check">
                        <label
                          className="form-check-label"
                          htmlFor="updatePassword"
                        >
                          Update Password
                        </label>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          onChange={handleInputChange}
                          checked={userInfo.updatePassword}
                          id="updatePassword"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="loginPw" className="form-label">
                        Current Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="loginPw"
                        onChange={handleInputChange}
                        value={userInfo.loginPw}
                        required={userInfo.updatePassword}
                        disabled={!userInfo.updatePassword}
                      />
                    </div>
                  </>
                ) : (
                  <></>
                )}
                {!isUpdate || userInfo.updatePassword ? (
                  <>
                    <div className="col-md-6">
                      <label htmlFor="password" className="form-label">
                        New Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        onChange={handleInputChange}
                        value={userInfo.password}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="passwordConfirm" className="form-label">
                        Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="passwordConfirm"
                        onChange={handleInputChange}
                        value={userInfo.passwordConfirm}
                        required
                      />
                    </div>
                  </>
                ) : (
                  <></>
                )}
                <div className="col-md-6">
                  <label htmlFor="fName" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="fName"
                    onChange={handleInputChange}
                    value={userInfo.fName}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="lName" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lName"
                    onChange={handleInputChange}
                    value={userInfo.lName}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="dob" className="form-label">
                    Date of Birth
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="dob"
                    onChange={handleInputChange}
                    value={userInfo.dob}
                    required
                  />
                </div>
                <div className="col-12 mb-5">
                  <button
                    type="submit"
                    className="btn bg-success-subtle mt-5 float-end"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>,
  ];
}
