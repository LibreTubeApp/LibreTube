import withData from '../lib/withData'
import Head from '../components/Head';
import AddSubscription from '../components/AddSubscription';
import SubscriptionList from '../components/SubscriptionList';

export default withData(props => (
  <div>
    <Head title="Subscriptions - Webtube" />
    <main>
      <AddSubscription />
      <SubscriptionList />
    </main>
  </div>
));

