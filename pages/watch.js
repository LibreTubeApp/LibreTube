import withData from '../utils/withData'
import Head from '../components/Head';
import VideoPlayer from '../components/VideoPlayer';

export default withData((props) => {
  const { v: videoId } = props.url.query;

  return (
    <main>
      <Head title="Video player - Libretube" />
      <VideoPlayer videoId={videoId} />
    </main>
  );
});
