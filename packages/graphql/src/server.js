import 'babel-polyfill';
import express from 'express'
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';

import typeDefs from './graphql/schema';
import resolvers from './graphql/resolvers';

const main = async () => {
  const schema = makeExecutableSchema({
      typeDefs,
      resolvers
  });

  const PORT = 4000;
  const app = express();

  if (process.env.NODE_ENV !== 'production') {
    app.use(require('cors')())
  }

  app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
  app.use('/graphql-explorer', graphiqlExpress({
    endpointURL: '/graphql',
  }));

  app.listen(PORT);
};

main();
