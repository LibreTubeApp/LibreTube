import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import styles from './styles';

const printTime = seconds => {
  if (seconds <= 60) {
    return `${seconds} seconds`;
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = parseInt(seconds - minutes * 60, 10);
  return `${minutes} minutes ${remainingSeconds} seconds`;
};

const VideoPlayer = ({ videoId, data }) => {
  return (
    <div>
      <style jsx>{styles}</style>
      <div className="outer-wrapper">
        <div className="video-wrapper">
          <video
            className="video"
            autoPlay
            controls
          >
            <source src={`/videoplayback?v=${videoId}`} />
            {data.video && data.video.subtitles && data.video.subtitles.map(track => (
              <track
                key={track.languageCode}
                kind="subtitles"
                src={track.url}
                srcLang={track.languageCode}
                label={track.name}
              />
            ))}
            Your browser doesn't support HTML5 video tag. Get a better browser!
          </video>
        </div>
      </div>
      <div className="details fixed-width">
        {data.video && data.video.details && (
          <article>
            <h1>{data.video.title}</h1>
            <p className="metadata">
              <span className="views">Views: {data.video.details.view_count}</span>
              <span className="length">Length: {printTime(data.video.details.length_seconds)}</span>
            </p>
            <p>
              <pre>
                {data.video.details.description}
              </pre>
            </p>
          </article>
        )}
      </div>
    </div>
  );
}

const videoDetails = gql`
  query VideoPlayerQuery($id: ID!) {
    video(id: $id) {
      title
      details {
        view_count
        length_seconds
        description
      }
      subtitles {
        name
        languageCode
        url
      }
    }
  }
`;

export default graphql(videoDetails, {
  options: ({ videoId: id }) => ({ variables: { id } }),
})(VideoPlayer);
