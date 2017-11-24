import withData from '../utils/withData'
import Layout from '../components/Layout';
import VideoPlayer from '../components/VideoPlayer';

export default withData((props) => {
  const { v: videoId } = props.url.query;

  return (
    <Layout title="Video player - Libretube" >
      <main>
        <VideoPlayer videoId={videoId} />
      </main>
    </Layout>
  );
});
