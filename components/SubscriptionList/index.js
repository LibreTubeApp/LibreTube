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
  const { loading, error, videos, loadNextPage } = props;

  if (error) return `An error occured: ${error}`;
  if (loading) return <p>Loading...</p>;

  return [
    <style jsx>{styles}</style>,
    <div className="subscription-list">
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
              <p className="title">{video.title}</p>
              <p>{distanceInWordsToNow(new Date(video.publishedAt))} ago</p>
            </a>
          </Link>
          <a
            href={`https://youtube.com/channel/${video.channel.id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <p>{video.channel.title}</p>
          </a>
        </div>
      ))}
    </div>,
    <div className="load-more">
      <a className="primary-btn" onClick={loadNextPage}>Load more</a>
    </div>,
  ];
};

const allSubscriptions = gql`
  query allSubscriptions($offset: Int, $limit: Int) {
    videos(offset: $offset, limit: $limit) {
      id
      title
      publishedAt
      channel {
        id
        title
      }
      thumbnails {
        url
        width
      }
    }
  }
`

const ITEMS_PER_PAGE = 15;

export default graphql(allSubscriptions, {
  options: props => ({
    variables: {
      offset: 0,
      limit: ITEMS_PER_PAGE,
    },
  }),
  props({ data: { loading, videos, fetchMore }}) {
    return {
      loading,
      videos,
      loadNextPage() {
        return fetchMore({
          variables: {
            offset: videos.length,
          },

          updateQuery: (previousResult, { fetchMoreResult }) => {
            if (!fetchMoreResult) return previousResult;

            return {
              ...previousResult,
              videos: [...previousResult.videos, ...fetchMoreResult.videos],
            };
          },
        });
      },
    };
  },
})(SubscriptionList)
