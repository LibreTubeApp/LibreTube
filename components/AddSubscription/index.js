import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

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
    this.props.mutate({
      variables: {
        username,
      },
    });
  };

  render() {
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
      </form>
    );
  }
}

const addSubscription = gql`
  mutation addSubscription($username: String!) {
    addChannel(username: $username) {
      id
    }
  }
`;

export default graphql(addSubscription)(AddSubscription);
