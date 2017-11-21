import Document, { Head, Main, NextScript } from 'next/document';
import flush from 'styled-jsx/server';

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
          <style key="1" jsx global>{`
            :root {
              --primary-color: #f00;
              --secondary-color: #071e22;
              --tertiary-color: #292f36;
              --quaternary-color: #3e78b2;
              --quinary-color: #fff;

              --shadow-color: #292f3680;
            }

            body {
              margin: 0;
            }

            .sr-only {
              position: absolute;
              width: 1px;
              height: 1px;
              padding: 0;
              overflow: hidden;
              clip: rect(0,0,0,0);
              white-space: nowrap;
              -webkit-clip-path: inset(50%);
              clip-path: inset(50%);
              border: 0;
            }
          `}</style>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
