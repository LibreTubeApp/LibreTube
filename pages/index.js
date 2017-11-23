import withData from '../utils/withData'
import Layout from '../components/Layout';
import AddSubscription from '../components/AddSubscription';
import SubscriptionList from '../components/SubscriptionList';

export default withData(props => (
  <Layout title="Subscriptions - Libretube" >
    <main>
      <h1>Your subscriptions</h1>
      <AddSubscription />
      <SubscriptionList />
    </main>
  </Layout>
));

