import withData from '../utils/withData'
import Head from '../components/Head';
import LoginForm from '../components/LoginForm';

export default withData(() => (
  <div>
    <Head title="Login - Libretube" />
    <main className="fixed-width">
      <h1>Login</h1>
      <LoginForm />
    </main>
  </div>
));

