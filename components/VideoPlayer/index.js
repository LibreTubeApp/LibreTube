import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import styles from './styles';

const VideoPlayer = ({ videoId, data }) => {
  return (
    <div>
      <div className="outer-wrapper">
        <style jsx>{styles}</style>
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
      <article>
        {data.video && data.video.description}
      </article>
    </div>
  );
}

const videoDetails = gql`
  query videoDetails($id: ID!) {
    video(id: $id) {
      title
      description
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
