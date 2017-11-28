import Autosuggest from 'react-autosuggest';
import debounce from 'just-debounce-it';

import SearchFetcher from './SearchFetcher';

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.title;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
  <div>
    {suggestion.title}
  </div>
);

export default class ChannelSearch extends React.Component {
  state = {
    value: '',
    searchTerm: null,
  };

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  updateModel = debounce(({ value }) => {
    this.setState({ searchTerm: value });
  }, 300);

  clearModel = () => {
    this.setState({ searchTerm: null });
  };

  render() {
    const { value, searchTerm } = this.state;

    const inputProps = {
      id: 'AddSubscription',
      placeholder: 'Type a channel to subscribe',
      value,
      onChange: this.onChange
    };

    return (
      <SearchFetcher
        searchTerm={searchTerm}
        render={({ suggestions }) => (
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.updateModel}
            onSuggestionsClearRequested={this.clearModel}
            getSuggestionValue={getSuggestionValue}
            onSuggestionSelected={this.props.onSelect}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
          />
        )}
      />
    );
  }
}
