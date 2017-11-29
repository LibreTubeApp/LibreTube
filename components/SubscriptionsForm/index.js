import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import UnsubscribeButton from './UnsubscribeButton'
import styles from './styles'

export const SubscriptionList = (props) => {
  const {
    data: {
      loading,
      error,
      channels,
    },
  } = props;

  if (error) return `An error occured: ${error}`;
  if (loading) return <p>Loading...</p>;

  return (
    <table className="channel-list">
      <style jsx>{styles}</style>
      <thead>
        <tr>
          <th>Channel</th>
          <td className="button-header" />
        </tr>
      </thead>
      <tbody>
        {channels.map(channel => (
          <tr key={channel.id}>
            <td>
              {channel.title}
            </td>
            <td>
              <UnsubscribeButton id={channel.id} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const allChannels = gql`
  query allChannels {
    channels {
      id
      title
      description
    }
  }
`

export default graphql(allChannels)(SubscriptionList)
