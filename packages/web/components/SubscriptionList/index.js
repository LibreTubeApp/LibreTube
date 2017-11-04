import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const SubscriptionList = (props) => {
  const {
    data: {
      loading,
      error,
      allSubscriptions,
    },
  } = props;

  if (error) return 'Error!';
  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {allSubscriptions.hello} World
    </div>
  );
};

const allSubscriptions = gql`
  query allSubscriptions {
    hello
  }
`

export default graphql(allSubscriptions)(SubscriptionList)
