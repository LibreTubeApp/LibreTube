import React from 'react';
import Router from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { Settings } from 'react-feather';

import globalStyles from './globalStyles';
import headerStyles from './styles';

export default ({ children, title = 'Libretube' }) => (
  <>
    <Head>
       <title>{title}</title>
    </Head>
    <header>
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
      <Link href="/settings">
        <a className="settings">
          <Settings color="white" />
          <span className="sr-only">Edit your settings</span>
        </a>
      </Link>
    </header>
    {children}
  </>
);
