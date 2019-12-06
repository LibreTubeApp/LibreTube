import { withApollo } from '../utils/apollo';
import Layout from '../components/Layout';
import AccountSetup from '../components/AccountSetup';

export default withApollo(props => (
  <Layout title="Account setup - Libretube" >
    <main className="fixed-width">
      <h1>Let's get started</h1>
      <AccountSetup />
    </main>
  </Layout>
));

