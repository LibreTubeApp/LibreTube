import gql from 'graphql-tag'

export default async (context, apolloClient) => {
  try {
    const { data } = await apolloClient.query({
      query: gql`
        query getUser {
          currentUser {
            loggedIn
          }
        }
      `
    });
    return data.currentUser.loggedIn;
  } catch (error) {
    console.log('error', error);
    return false;
  }
};
