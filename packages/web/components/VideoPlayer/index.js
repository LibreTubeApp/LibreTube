import styles from './styles';

export default ({ videoId }) => {

  return (
    <div className="outer-wrapper">
      <style jsx>{styles}</style>
      <div className="video-wrapper">
        <iframe
          className="video"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&autoplay=1`}
          frameBorder="0"
          allowFullScreen
        />
      </div>
    </div>
  );
}

