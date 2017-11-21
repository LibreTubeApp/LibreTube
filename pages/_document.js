import Document, { Head, Main, NextScript } from 'next/document';
import flush from 'styled-jsx/server';

import globalStyles from './_globalStyles';

export default class CustomDocument extends Document {
  static getInitialProps({ renderPage }) {
    const { html, head, errorHtml, chunks } = renderPage();
    const styles = flush();
    return { html, head, errorHtml, chunks, styles };
  }

  render() {
    return (
      <html lang="en">
        <Head>
          <meta httpEquiv="x-ua-compatible" content="ie=edge" key="xUaCompat" />
          <meta name="viewport" content="width=device-width, initial-scale=1" key="viewport" />
          <style key="1" jsx global>{globalStyles}</style>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
