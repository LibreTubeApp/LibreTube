import withData from '../utils/withData'
import Layout from '../components/Layout';
import APITokenForm from '../components/APITokenForm';
import SubscriptionsForm from '../components/SubscriptionsForm';

export default withData(props => (
  <Layout title="Settings - Libretube" >
    <main className="fixed-width">
      <h1>Settings</h1>
      <APITokenForm />
      <SubscriptionsForm />
    </main>
  </Layout>
));

