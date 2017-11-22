import css from 'styled-jsx/css'

export default css`
  .outer-wrapper {
    max-height: 100vh;
    overflow: hidden;
  }

  .video-wrapper {
    width: 100%;
    max-height: 100vh;
    padding-bottom: 56.25%; /* 16:9 */
    position: relative;
    background: black;
  }

  .video {
    position: absolute;
    height: 100%;
    width: 100%;
    max-height: 100vh;
    top: 0; bottom: 0; left: 0; right: 0;
    color: white;
    font-size: 24px;
    text-align: center;
  }

  .metadata {
    display: flex;
    font-weight: bold;
  }

  .views,
  .length {
    flex: 1;
  }

  .length {
    text-align: right;
  }

  .details pre {
    white-space: pre-line;
  }
`;
