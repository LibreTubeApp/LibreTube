import styles from './styles';

export default ({ videoId }) => {

  return (
    <div className="outer-wrapper">
      <style jsx>{styles}</style>
      <div className="video-wrapper">
        <video
          className="video"
          autoPlay
          controls
        >
          <source src={`//graphql:4000/videoplayback?v=${videoId}`} />
          Your browser doesn't support HTML5 video tag. Get a better browser!
        </video>
      </div>
    </div>
  );
}

