import Link from 'next/link'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'

import styles from './styles'

const sortByDate = (a, b) => b.publishedAt - a.publishedAt;

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
      {[...videos].sort(sortByDate).map(video => (
        <div key={video.id}>
          <Link
            href={{
              pathname: '/watch',
              query: { v: video.id }
            }}
            prefetch
          >
            <a>
              <img
                srcSet={buildSrcset(video.thumbnails)}
                sizes="(min-width: 600px) 480px, 50vw"
                alt=""
              />
              <p>{video.title}</p>
              <p>{distanceInWordsToNow(new Date(video.publishedAt))} ago</p>
            </a>
          </Link>
          <a
            href={`https://youtube.com/channel/${video.channel.id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <p>{video.channel.username}</p>
          </a>
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
`

export default graphql(allSubscriptions)(SubscriptionList)
