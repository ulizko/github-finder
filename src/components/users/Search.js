import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import GithubContext from '../../context/github/githubContext';
import AlertContext from '../../context/alert/alertContext';

const Search = () => {
  const githubContext = useContext(GithubContext);
  const alertContext = useContext(AlertContext);

  const { users, clearUsers, searchUsers } = githubContext;
  const { showAlert } = alertContext;
  const [text, setText] = useState('');

  const onChange = e => {
    const value = e.target.value;
    setText(value);
  };

  const onSubmit = e => {
    e.preventDefault();
    if (text === '') {
      showAlert('Please enter something', 'light');
    } else {
      searchUsers(text);
      setText('');
    }
  };

  return (
    <div>
      <form className='form' onSubmit={onSubmit}>
        <input
          type='text'
          name='text'
          placeholder='Search Users...'
          value={text}
          onChange={onChange}
        />
        <input
          type='submit'
          value='Search'
          className='btn btn-dark btn-block'
        />
      </form>
      {users.length > 0 && (
        <button className='btn btn-light btn-block' onClick={clearUsers}>
          Clear
        </button>
      )}
    </div>
  );
};

Search.propTypes = {
  showAlert: PropTypes.func.isRequired,
};

export default Search;
