import axios from "axios";
import { returnErrors } from "./messages";
import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "./types";

// Check the token and load user
export const loadUser = () => (dispatch, getState) => {
  //User loading
  dispatch({
    type: USER_LOADING,
  });

  axios
    .get("/api/auth/user", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

// Login
export const login = (username, password) => (dispatch) => {
  //Headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  // Request Body
  const body = JSON.stringify({
    username,
    password,
  });

  axios
    .post("/api/auth/login", body, config)
    .then((res) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};

// Register user
export const register =
  ({ email, username, password }) =>
  (dispatch) => {
    //Headers
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    // Request Body
    const body = JSON.stringify({
      username,
      password,
      email,
    });

    axios
      .post("/api/auth/register", body, config)
      .then((res) => {
        dispatch({
          type: REGISTER_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
          type: REGISTER_FAIL,
        });
      });
  };

// Logout user
export const logout = () => (dispatch, getState) => {
  axios
    .post("/api/auth/logout", null, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: LOGOUT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// Setup config with token - Helper function
export const tokenConfig = (getState) => {
  //Get the roken from the state
  const token = getState().auth.token;

  //Headers

  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  // If token has 2 header config
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  return config;
};
