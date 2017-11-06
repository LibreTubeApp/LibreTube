import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const SubscriptionList = (props) => {
  const {
    data: {
      loading,
      error,
      videos,
    },
  } = props;

  if (error) return `An error occured: ${error}`;
  if (loading) return <p>Loading...</p>;
  console.log('videos', videos);

  return (
    <div>
      {videos.map(video => (
        <div>
          <p>{video.title}</p>
          <p>{video.channel.username}</p>
        </div>
      ))}
    </div>
  );
};

const allSubscriptions = gql`
  query allSubscriptions {
    videos {
      id
      title
      channel {
        username
      }
    }
  }
`

export default graphql(allSubscriptions)(SubscriptionList)
