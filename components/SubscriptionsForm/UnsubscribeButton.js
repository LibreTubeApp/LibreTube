import { Fragment } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import ErrorMessage from '../ErrorMessage';

export class UnsubscribeButton extends React.Component {
  state = {};

  handleUnsubscribe = async event => {
    const { id } = this.props;
    event.preventDefault();
    this.setState({ error: null });

    try {
      await this.props.mutate({
        variables: {
          id,
        },
        refetchQueries: [
          'allSubscriptions',
          'allChannels',
        ],
      });
    } catch (error) {
      this.setState({ error });
    }
  };

  render() {
    const { error } = this.state;

    return (
      <Fragment>
        <button className="primary-btn" onClick={this.handleUnsubscribe}>
          Unsubscribe
        </button>
        <ErrorMessage
          message="Could not add this subscription."
          error={error}
        />
      </Fragment>
    );
  }
};

const removeChannel = gql`
  mutation removeChannel($id: String!) {
    removeChannel(id: $id)
  }
`;

export default graphql(removeChannel)(UnsubscribeButton);
