import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import ErrorMessage from '../ErrorMessage';

const CURRENT_USER = gql`
  query CurrentUser {
    currentUser {
      user {
        username
      }
    }
  }
`;

const UPDATE_API_TOKEN = gql`
  mutation APITokenUpdate($user: UserInput!) {
    updateUser(user: $user) {
      id
    }
  }
`;

const APITokenForm = () => {
  const { data } = useQuery(CURRENT_USER);
  const [updateToken] = useMutation(UPDATE_API_TOKEN);
  const [state, setState] = useState({
    username: '',
    password: '',
    error: null,
  });

  const handleChange = event => {
    const { name, value } = event.target;
    setState({ [name]: value });
  };

  const handleSubmit = async event => {
    const { password, apiToken } = state;
    event.preventDefault();

    setState({ submitting: true, error: null });

    try {
      await updateToken({
        variables: {
          user: {
            username: data.currentUser.user.username,
            password,
            apiToken,
          },
        },
      });
      setState({ submitting: false });
    } catch (error) {
      setState({ error, submitting: false });
    }
  };

  const { submitting, error } = state;

  return (
    <form onSubmit={handleSubmit}>
      <label>
        API Token
        <input
          name="apiToken"
          type="text"
          required
          onChange={handleChange}
        />
      </label>

      <label>
        Confirm password
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          required
          onChange={handleChange}
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

export default APITokenForm;
