import React, { Fragment, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../actions/auth';
import  Logo from '../assets/images/logo-dark.png';
import  Ats from '../assets/images/ats.png';
import { setAlert } from '../actions/alert';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const { username, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    login(username, password);
    setAlert('Login Successfully!', 'success');
  };

  // redirect if logged in
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment className="body">
      <div className="top"><img src={Logo} /></div>
      <div className="main">
      <div className="fblank"></div>
      <div className="first"><img src={Ats} /></div>
      <div className="blank"></div>
      <div className="second">
        <h1>Welcome to Zimyo Recruit!</h1>
        <form onSubmit={(e) => onSubmit(e)}>
          <input id="in1"
            type="text"
            placeholder="Username"
            name="username"
            value={username}
            onChange={(e) => onChange(e)}
            required
          />
        <br />
        <br />
          <input id="in2"
            type="password"
            placeholder="password"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
          />
        <br />
          <br />
          <button type='submit' id="login">
            LOGIN
          </button>
          <br />
          <br />
          <button id="demo">
            DEMO
          </button>
        </form>
      </div>
      </div>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login, setAlert })(Login);
