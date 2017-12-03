import css from 'styled-jsx/css'

export default css`
  .subscription-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-auto-rows: minmax(300px, auto);
    padding: 20px;
    grid-gap: 40px;
  }

  .subscription-list .title {
    font-weight: bold;
  }

  .subscription-list a {
    color: var(--tertiary-color);
    text-decoration: none;
  }

  .subscription-list p {
    margin-top: 5px;
    margin-bottom: 0;
  }

  .subscription-list img {
    width: 100%;
  }

  .load-more {
    display: block;
    margin: 0 auto 15px;
    text-align: center;
  }
  .load-more a {
    padding: 10px 40px;
  }
`;
