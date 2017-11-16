import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

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
        <label>
          New subscription
          <input name="username" onChange={this.handleChange} />
        </label>
        <button>
          Add
        </button>
      </form>
    );
  }
};

const addSubscription = gql`
  mutation addSubscription($username: String!) {
    addChannel(username: $username) {
      id
    }
  }
`

export default graphql(addSubscription)(AddSubscription)
