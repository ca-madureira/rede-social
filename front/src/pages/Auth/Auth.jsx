import React, { useState } from 'react';
import './Auth.css';
import { logIn, signUp } from '../../actions/AuthActions.js';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const initialState = {
    firstname: '',
    lastname: '',
    username: '',
    password: '',
    confirmpass: '',
  };
  const loading = useSelector((state) => state.authReducer.loading);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSignUp, setIsSignUp] = useState(false);
  const [data, setData] = useState(initialState);
  const [confirmPass, setConfirmPass] = useState(true);

  const resetForm = () => {
    setData(initialState);
    setConfirmPass(confirmPass);
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    setConfirmPass(true);
    e.preventDefault();
    if (isSignUp) {
      data.password === data.confirmpass
        ? dispatch(signUp(data, navigate))
        : setConfirmPass(false);
    } else {
      dispatch(logIn(data, navigate));
    }
  };

  return (
    <div className="Auth">
      <div className="a-left">
        <div className="Webname">
          <h1>Rede Social </h1>
        </div>
      </div>

      <div className="a-right">
        <form className="infoForm authForm" onSubmit={handleSubmit}>
          <h3>{isSignUp ? 'Cadastro' : 'Login'}</h3>
          {isSignUp && (
            <div>
              <input
                required
                type="text"
                placeholder="Nome"
                className="infoInput"
                name="firstname"
                value={data.firstname}
                onChange={handleChange}
              />
              <input
                required
                type="text"
                placeholder="Sobrenome"
                className="infoInput"
                name="lastname"
                value={data.lastname}
                onChange={handleChange}
              />
            </div>
          )}

          <div>
            <input
              required
              type="text"
              placeholder="Digite seu username"
              className="infoInput"
              name="username"
              value={data.username}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              required
              type="password"
              className="infoInput"
              placeholder="Digite sua senha"
              name="password"
              value={data.password}
              onChange={handleChange}
            />
            {isSignUp && (
              <input
                required
                type="password"
                className="infoInput"
                name="confirmpass"
                placeholder="Confirmar senha"
                onChange={handleChange}
              />
            )}
          </div>

          <span
            style={{
              color: 'red',
              fontSize: '12px',
              alignSelf: 'flex-end',
              marginRight: '5px',
              display: confirmPass ? 'none' : 'block',
            }}
          >
            *Confirm password is not same
          </span>
          <div>
            <span
              style={{
                fontSize: '12px',
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
              onClick={() => {
                resetForm();
                setIsSignUp((prev) => !prev);
              }}
            >
              {isSignUp
                ? 'Já tem um conta? Entre agora'
                : 'Não tem uma conta ainda? Venha cadastrar sua conta'}
            </span>
            <button
              className="button infoButton"
              type="Submit"
              disabled={loading}
            >
              {loading ? 'Loading...' : isSignUp ? 'Cadastre-se' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
