import Head from 'next/head';
import Link from 'next/link';

import headerStyles from './styles';

export const HeadComponent = (props) => [
  <Head key="1">
    <title>{props.title}</title>
  </Head>,
  <header>
    <style jsx>{headerStyles}</style>
    <Link href="/">
      <a>
        <img
          src="/static/logo.png"
          className="logo"
          alt="Red flag with black play button - the LibreTube logo"
        />
        <span className="sr-only">Go to the home page</span>
      </a>
    </Link>
  </header>,
];

HeadComponent.defaultProps = {
  title: 'Webtube',
};

export default HeadComponent;
