import React, { useState } from 'react';
import gql from 'graphql-tag';
import Router from 'next/router'
import { useApolloClient, useMutation } from '@apollo/react-hooks';

import { withApollo } from '../../utils/apollo';
import ErrorMessage from '../ErrorMessage';
import styles from './styles';

const loginUser = gql`
  mutation loginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      loggedIn
    }
  }
`;

const LoginForm = () => {
  const [login] = useMutation(loginUser);
  const [state, setState] = useState({
    username: '',
    password: '',
    error: null,
  });

  const handleChange = event => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };

  const handleLogin = async event => {
    const { username, password } = state;
    event.preventDefault();

    setState({ ...state, submitting: true, error: null });

    try {
      await login({
        variables: { username, password },
      });

      // Clean any residual data between state changes
      // await this.props.client.resetStore();

      Router.push('/');
    } catch (error) {
      setState({ ...state, error, submitting: false });
    }
  };

  const { submitting, error } = state;
  return (
    <div>
      <form onSubmit={handleLogin}>
        <style jsx>{styles}</style>
        <label>
          Username
          <input
            name="username"
            type="text"
            required
            onChange={handleChange}
          />
        </label>
        <label>
          Password
          <input
            name="password"
            type="password"
            required
            minLength={6}
            onChange={handleChange}
            autoComplete="current-password"
          />
        </label>

        <input
          type="submit"
          className="primary-btn"
          disabled={submitting}
          value="Login"
        />

        <ErrorMessage
          message="Failed to login."
          error={error}
        />
        {submitting && <p>Please wait...</p>}
      </form>
    </div>
  );
}

export default withApollo(LoginForm);
