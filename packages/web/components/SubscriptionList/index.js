import Link from 'next/link'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import styles from './styles'

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

  return (
    <div className="subscription-list">
      <style jsx>{styles}</style>
      {videos.map(video => (
        <Link
          href={{
            pathname: '/watch',
            query: { v: video.id }
          }}
          prefetch
          key={video.id}
        >
          <a>
            <img
              srcSet={buildSrcset(video.thumbnails)}
              sizes="(min-width: 600px) 480px, 50vw"
            />
            <p>{video.title}</p>
            <p>{video.channel.username}</p>
          </a>
        </Link>
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
        url
        width
      }
    }
  }
`

export default graphql(allSubscriptions)(SubscriptionList)
