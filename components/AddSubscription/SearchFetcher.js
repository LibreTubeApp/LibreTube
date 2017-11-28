import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class SearchFetcher extends React.Component {
  render() {
    const {
      data: {
        channelsSearch,
      }
    } = this.props;

    if (!channelsSearch) return null;

    return this.props.render({
      suggestions: channelsSearch,
    });
  }
}

const channelsSearch = gql`
  query ChannelsSearch($searchTerm: String) {
    channelsSearch(searchTerm: $searchTerm) {
      id
      title
    }
  }
`;

export default graphql(channelsSearch)(SearchFetcher);
