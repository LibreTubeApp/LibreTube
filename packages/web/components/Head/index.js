import Head from 'next/head'

export const HeadComponent = (props) =>
  <Head>
    <title>{props.title}</title>
    <meta httpEquiv="x-ua-compatible" content="ie=edge" key="xUaCompat" />
    <meta name="viewport" content="width=device-width, initial-scale=1" key="viewport" />
  </Head>

HeadComponent.defaultProps = {
  title: 'Webtube',
};

export default HeadComponent;
