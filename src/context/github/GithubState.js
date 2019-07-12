import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS,
} from '../types';

const GithubState = props => {
  const baseUrl = `https://api.github.com`;
  const credentials = {
    client_id: process.env.REACT_APP_GITHUB_CLIENT_ID,
    client_secret: process.env.REACT_APP_GITHUB_CLIENT_SECRET,
  };

  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  const searchUsers = async query => {
    setLoading();
    const params = { q: query, ...credentials };
    const response = await axios.get(`${baseUrl}/search/users`, { params });
    dispatch({ type: SEARCH_USERS, payload: response.data.items });
  };

  const setLoading = () => dispatch({ type: SET_LOADING });

  const { users, user, repos, loading } = state;

  return (
    <GithubContext.Provider
      value={{ users, user, repos, loading, searchUsers }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
