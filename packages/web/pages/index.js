import 'isomorphic-fetch';
import React from 'react';

import withData from '../lib/withData'
import Head from '../components/Head';
import SubscriptionList from '../components/SubscriptionList';

export default withData(props => (
  <div>
    <Head title="Subscriptions - Webtube" />
    <main>
      <SubscriptionList stars={props.stars} />
    </main>
  </div>
));

