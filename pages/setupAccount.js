import withData from '../utils/withData'
import Head from '../components/Head';
import AccountSetup from '../components/AccountSetup';

export default withData(props => (
  <div>
    <Head title="Account setup - Libretube" />
    <main className="fixed-width">
      <h1>Let's get started</h1>
      <AccountSetup />
    </main>
  </div>
));

