import React from 'react';
import Router from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

import globalStyles from './globalStyles';
import headerStyles from './styles';

export default class Layout extends React.Component {
  componentDidMount() {
    Router.onRouteChangeStart = async url => {
      const { ok } = await fetch('/check-login', {
        method: 'HEAD',
        credentials: 'same-origin',
      });

      if (!ok) {
        Router.replace('/login');
      }
    }
  }

  render() {
    const { children, title = 'Libretube' } = this.props;

    return [
      <Head key="1">
         <title>{ title }</title>
      </Head>,
      <header key="2">
        <style jsx global>{globalStyles}</style>
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
      children,
    ];
  }
}
