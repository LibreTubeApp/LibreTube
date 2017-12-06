import React from 'react';
import { withApollo, compose } from 'react-apollo'

import withData from '../utils/withData';
import redirect from '../utils/redirect';
import isLoggedIn from '../utils/isLoggedIn';
import Layout from '../components/Layout';
import AddSubscription from '../components/AddSubscription';
import SubscriptionList from '../components/SubscriptionList';

class Index extends React.Component {
  static async getInitialProps (context, apolloClient) {
    if (!await isLoggedIn(context, apolloClient)) {
      redirect(context, '/login');
    }

    return {};
  }


  async componentDidMount() {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then(registration => {
          console.log("service worker registration successful");
        })
        .catch(err => {
          console.warn("service worker registration failed");
        });
    }
  }

  render() {
    return (
      <Layout withSidebar title="Subscriptions - Libretube" >
        <style jsx>{`
          h1 {
            margin-left: 15px;
          }
        `}</style>
        <main>
          <h1>Your subscriptions</h1>
          <AddSubscription />
          <SubscriptionList />
        </main>
      </Layout>
    );
  }
}

export default compose(
  withData,
  withApollo,
)(Index);
