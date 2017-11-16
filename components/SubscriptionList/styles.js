import css from 'styled-jsx/css'

export default css`
  .subscription-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-auto-rows: minmax(300px, auto);
    max-width: 100vw;
    padding: 20px;
    grid-gap: 40px;
  }

  img {
    width: 100%;
  }
`;
