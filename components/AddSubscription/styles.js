import css from 'styled-jsx/css'

export default css`
  label {
    display: block;
    margin: 0 auto;
    max-width: 700px;
    text-align: center;
  }

  .input-group {
    display: flex;
    margin: 10px;
  }

  .input-group input {
    flex: 1;
    padding: 10px;
  }

  .input-group button {
    width: 80px;
    margin-left: -1px;
  }
`;
