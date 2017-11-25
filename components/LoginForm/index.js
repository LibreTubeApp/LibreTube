import React from 'react';
import { graphql, compose, withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router'

import ErrorMessage from '../ErrorMessage';
import styles from './styles';

class LoginForm extends React.Component {
  state = {
    username: '',
    password: '',
    error: null,
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  setRef = ref => this.formRef = ref;

  handleLogin = async event => {
    const { username, password } = this.state;
    event.preventDefault();

    this.setState({ submitting: true, error: null });

    try {
      await this.props.mutate({
        variables: { username, password },
      });

      // Clean any residual data between state changes
      await this.props.client.resetStore();

      Router.push('/');
    } catch (error) {
      this.setState({ error, submitting: false });
    }
  };

  render() {
    const { submitting, error } = this.state;
    return (
      <div>
        <form onSubmit={this.handleLogin} ref={this.setRef}>
          <style jsx>{styles}</style>
          <label>
            Username
            <input
              name="username"
              type="text"
              required
              onChange={this.handleChange}
            />
          </label>
          <label>
            Password
            <input
              name="password"
              type="password"
              required
              minLength={6}
              onChange={this.handleChange}
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
}

const loginUser = gql`
  mutation loginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      loggedIn
    }
  }
`;

export default compose(
  withApollo,
  graphql(loginUser),
)(LoginForm);
