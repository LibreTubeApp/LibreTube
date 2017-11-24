import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import ErrorMessage from '../ErrorMessage';
import styles from './styles';

class AddSubscription extends React.Component {
  state = {};

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async event => {
    const { username } = this.state;
    event.preventDefault();
    this.setState({ error: null });

    try {
      await this.props.mutate({
        variables: {
          username,
        },
      });
    } catch (error) {
      this.setState({ error });
    }
  };

  render() {
    const { error } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <style jsx>{styles}</style>
        <label htmlFor="AddSubscription">
          New subscription
          <div className="input-group">
            <input
              name="username"
              type="search"
              id="AddSubscription"
              onChange={this.handleChange}
            />
            <button className="primary-btn">Add</button>
          </div>
        </label>
        <ErrorMessage
          message="Could not add this subscription."
          error={error}
        />
      </form>
    );
  }
}

const addSubscription = gql`
  mutation addSubscription($username: String!) {
    addChannel(username: $username) {
      id
      videos {
        id
        title
        publishedAt
        channel {
          id
          username
        }
        thumbnails {
          url
          width
        }
      }
    }
  }
`;

export default graphql(addSubscription)(AddSubscription);
