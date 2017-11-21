import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router'

import ErrorMessage from '../ErrorMessage';
import styles from './styles';

class AccountSetup extends React.Component {
  state = {
    user: {},
    error: null,
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState(({ user }) => ({
      user: {
        ...user,
        [name]: value,
      },
    }));
  };

  handleSubmit = async event => {
    const { user } = this.state;
    event.preventDefault();

    this.setState({ submitting: true });

    try {
      const result = await this.props.mutate({
        variables: {
          user,
        },
      });
      Router.push('/');
    } catch (error) {
      this.setState({ error, submitting: false });
    }
  };

  render() {
    const { submitting, error } = this.state;
    return (
      <div>
        <p>
          In order to prevent unautorized users from accessing this website, we
          need to set up an account that you can use to log in. The account is
          stored locally in your database and the password is salted and hashed
          with a strong algorithm (Argon2) for your security.
        </p>
        <p>
          To be able to communicate with the YouTube API, we need you to provide
          a <b>YouTube API key</b>. This key is used when fetching your newest
          videos and is required for the system to work. See the documentation
          for more details on this.
        </p>
        <form onSubmit={this.handleSubmit}>
          <style jsx>{styles}</style>
          <label>
            Username *
            <input
              name="username"
              type="text"
              required
              onChange={this.handleChange}
            />
          </label>
          <label>
            Password *
            <input
              name="password"
              type="password"
              required
              minLength={6}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Email
            <input
              name="email"
              type="email"
              onChange={this.handleChange}
            />
          </label>
          <p>
            <i>
              *: Required
            </i>
          </p>

          <ErrorMessage
            message="An error occured while creating your account."
            error={error}
          />

          <button className="primary-btn" disabled={submitting}>
            Create user
          </button>

          {submitting && <p>Please wait...</p>}
        </form>
      </div>
    );
  }
}

const createAccount = gql`
  mutation AccountSetupMutation($user: UserInput!) {
    addUser(user: $user) {
      id
    }
  }
`;

export default graphql(createAccount)(AccountSetup);
