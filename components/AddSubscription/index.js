import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import ChannelSearch from './ChannelSearch';
import ErrorMessage from '../ErrorMessage';
import styles from './styles';

class AddSubscription extends React.Component {
  state = {};

  handleSubmit = async event => {
    const { channelId } = this.state;
    event.preventDefault();
    this.setState({ error: null });

    try {
      await this.props.mutate({
        variables: {
          channelId,
        },
        refetchQueries: [
          'allSubscriptions',
        ],
      });
    } catch (error) {
      this.setState({ error });
    }
  };

  onSelect = (_, value) => {
    this.setState({ channelId: value.suggestion.id });
  };

  render() {
    const { error } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <style jsx>{styles}</style>
        <label htmlFor="AddSubscription">
          New subscription
          <div className="input-group">
            <ChannelSearch onSelect={this.onSelect} />
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
  mutation addSubscription($channelId: String!) {
    addChannel(id: $channelId) {
      id
    }
  }
`;

export default graphql(addSubscription)(AddSubscription);
