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

  .input-group :global(.react-autosuggest__container) {
    flex: 1;
  }

  .input-group :global(input) {
    width: calc(100% - 21px);
  }

  .input-group button {
    width: 90px;
    margin-left: -1px;
  }

  :global(.react-autosuggest__container) {
    position: relative;
  }

  :global(.react-autosuggest__input--focused) {
    outline: none;
  }

  :global(.react-autosuggest__input--open) {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  :global(.react-autosuggest__suggestions-container) {
    display: none;
  }

  :global(.react-autosuggest__suggestions-container--open) {
    display: block;
    position: absolute;
    top: 33px;
    width: 100%;
    border: 1px solid #aaa;
    background-color: #fff;
    font-size: 12px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    z-index: 2;
  }

  :global(.react-autosuggest__suggestions-list) {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  :global(.react-autosuggest__suggestion) {
    cursor: pointer;
    padding: 10px;
    color: initial;
  }

  :global(.react-autosuggest__suggestion--highlighted) {
    background-color: #ddd;
  }
`;
