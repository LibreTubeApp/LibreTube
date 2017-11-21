import withData from '../utils/withData'
import Head from '../components/Head';
import AddSubscription from '../components/AddSubscription';
import SubscriptionList from '../components/SubscriptionList';

export default withData(props => (
  <div>
    <Head title="Subscriptions - Libretube" />
    <main>
      <AddSubscription />
      <SubscriptionList />
    </main>
  </div>
));

