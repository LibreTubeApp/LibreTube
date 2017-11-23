import withData from '../utils/withData'
import Layout from '../components/Layout';
import Head from '../components/Head';
import LoginForm from '../components/LoginForm';

export default withData(() => (
  <Layout title="Login - Libretube">
    <main className="fixed-width">
      <h1>Login</h1>
      <LoginForm />
    </main>
  </Layout>
));

