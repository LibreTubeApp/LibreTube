import css from 'styled-jsx/css'

export default css`
  .subscription-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-auto-rows: minmax(300px, auto);
    padding: 20px;
    grid-gap: 40px;
  }

  .title {
    font-weight: bold;
  }

  a {
    color: var(--tertiary-color);
    text-decoration: none;
  }

  p {
    margin-top: 5px;
    margin-bottom: 0;
  }

  img {
    width: 100%;
  }
`;
