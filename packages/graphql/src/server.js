const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');

const main = async () => {
  const schema = makeExecutableSchema({
      typeDefs,
      resolvers
  });

  const PORT = 4000;
  const app = express();

  app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
  app.use('/graphql-explorer', graphiqlExpress({
    endpointURL: '/graphql',
  }));

  app.listen(PORT);
};

main();
