import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const buildSrcset = thumbnails => (
  thumbnails.reduce((prev, thumbnail) => {
    const src = `${thumbnail.url} ${thumbnail.width}w`;
    return prev ? `${prev}, ${src}` : src;
  }, '')
);

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
      {videos.map(video => console.log('video.thumbnails', video.thumbnails)||(
        <div>
          <img
            srcSet={buildSrcset(video.thumbnails)}
            sizes="(min-width: 600px) 200px, 50vw"
          />
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
      thumbnails {
        type
        url
        width
      }
    }
  }
`

export default graphql(allSubscriptions)(SubscriptionList)
