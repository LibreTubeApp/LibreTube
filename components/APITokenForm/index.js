import React from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import ErrorMessage from '../ErrorMessage';

class APITokenForm extends React.Component {
  state = {
    username: '',
    password: '',
    error: null,
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async event => {
    const { data } = this.props;
    const { password, apiToken } = this.state;
    event.preventDefault();

    this.setState({ submitting: true, error: null });

    try {
      await this.props.mutate({
        variables: {
          user: {
            username: data.currentUser.user.username,
            password,
            apiToken,
          },
        },
      });
      this.setState({ submitting: false });
    } catch (error) {
      this.setState({ error, submitting: false });
    }
  };

  render() {
    const { submitting, error } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          API Token
          <input
            name="apiToken"
            type="text"
            required
            onChange={this.handleChange}
          />
        </label>

        <label>
          Confirm password
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            required
            onChange={this.handleChange}
          />
        </label>

        <input
          type="submit"
          className="primary-btn"
          disabled={submitting}
          value="Submit"
        />

        <ErrorMessage
          message="Failed to update user."
          error={error}
        />
        {submitting && <p>Please wait...</p>}
      </form>
    );
  }
}

const currentUser = gql`
  query CurrentUser {
    currentUser {
      user {
        username
      }
    }
  }
`;

const updateApiToken = gql`
  mutation APITokenUpdate($user: UserInput!) {
    updateUser(user: $user) {
      id
    }
  }
`;

export default compose(
  graphql(currentUser),
  graphql(updateApiToken),
)(APITokenForm);
