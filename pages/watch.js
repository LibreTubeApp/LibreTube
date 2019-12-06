import React from 'react';

import { withApollo } from '../utils/apollo';
import redirect from '../utils/redirect';
import isLoggedIn from '../utils/isLoggedIn';
import Layout from '../components/Layout';
import VideoPlayer from '../components/VideoPlayer';

class Watch extends React.Component {
  static async getInitialProps (context, apolloClient) {
    if (!await isLoggedIn(context, apolloClient)) {
      redirect(context, '/login');
    }

    return {};
  }

  render() {
    const { v: videoId } = this.props.url.query;

    return (
      <Layout withSidebar title="Video player - Libretube" >
        <main>
          <VideoPlayer videoId={videoId} />
        </main>
      </Layout>
    );
  }
};

export default withApollo(Watch);
