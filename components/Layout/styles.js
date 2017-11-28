import css from 'styled-jsx/css'

export default css`
  header {
    background-color: var(--tertiary-color);
    padding: 10px 20px;
    box-shadow: 0 4px 3px var(--shadow-color);
    border-bottom: 1px solid var(--shadow-color);
  }

  header .settings {
    float: right;
    margin-top: 15px;
    transition: .25s all;
    cursor: pointer;
  }

  header .settings:hover {
    transform: translateY(-5px);
  }

  .logo {
    height: 45px;
  }
`;
