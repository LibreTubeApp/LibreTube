import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const SubscriptionList = (props) => {
  const {
    data: {
      loading,
      error,
      hello,
    },
  } = props;

  if (error) return `An error occured: ${error}`;
  if (loading) return <p>Loading...</p>;

  return (
    <div>
      Hello {hello}!
    </div>
  );
};

const allSubscriptions = gql`
  query allSubscriptions {
    hello
  }
`

export default graphql(allSubscriptions)(SubscriptionList)
