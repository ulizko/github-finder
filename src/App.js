import React, { useState, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import axios from 'axios';

import GithubState from './context/github/GithubState';

import './App.css';

const App = () => {
  const baseUrl = `https://api.github.com`;
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const credentials = {
    client_id: process.env.REACT_APP_GITHUB_CLIENT_ID,
    client_secret: process.env.REACT_APP_GITHUB_CLIENT_SECRET,
  };

  const getUser = async username => {
    setLoading(true);
    const params = { ...credentials };
    const response = await axios.get(`${baseUrl}/users/${username}`, {
      params,
    });
    setUser(response.data);
    setLoading(false);
  };

  const getUserRepos = async username => {
    setLoading(true);
    const params = {
      ...credentials,
      per_page: 5,
      sort: 'created:asc',
    };
    const response = await axios.get(`${baseUrl}/users/${username}/repos`, {
      params,
    });
    setRepos(response.data);
    setLoading(false);
  };

  const clearUsers = () => {
    setUsers([]);
    setLoading(false);
  };

  const showAlert = (msg, type) => {
    setAlert({ msg, type });
    setTimeout(() => setAlert(null), 5000);
  };

  return (
    <GithubState>
      <Router>
        <div className='App'>
          <Navbar />
          <div className='container'>
            <Alert alert={alert} />
            <Switch>
              <Route
                exact
                path='/'
                render={() => (
                  <Fragment>
                    <Search
                      clearUsers={clearUsers}
                      showClear={users.length > 0}
                      showAlert={showAlert}
                    />
                    <Users loading={loading} users={users} />
                  </Fragment>
                )}
              />
              <Route exact path='/about' component={About} />
              <Route
                exact
                path='/user/:login'
                render={props => (
                  <User
                    {...props}
                    getUser={getUser}
                    getUserRepos={getUserRepos}
                    user={user}
                    repos={repos}
                    loading={loading}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    </GithubState>
  );
};

export default App;
