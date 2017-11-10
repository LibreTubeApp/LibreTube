import 'babel-polyfill';
import express from 'express'
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import ytdl from 'ytdl-core';

import typeDefs from './graphql/schema';
import resolvers from './graphql/resolvers';
import parseXml from './utils/parseXml';

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
    endpointURL: '/graphql/',
  }));

  app.use('/videoplayback', (req, res) => {
    const { v: videoId } = req.query;
    if (!ytdl.validateID(videoId)) {
      res.status(400).send({
        error: 'VALIDATION_ERROR',
        reason: 'Invalid video id',
      });
      return;
    }

    ytdl(`https://www.youtube.com/watch?v=${videoId}`)
      .pipe(res);
  });

  app.use('/subtitles', async (req, res) => {
    const { url } = req.query;
    console.log('url', url);

    const result = await fetch(url);
    if (!result.ok) {
      res.status(500).send({
        error: 'FETCH_ERROR',
        reason: 'Failed to fetch the subtitles',
      });
    }

    const xml = await result.text();
    const payload = await parseXml(xml);
    res.type('text/vtt').send(payload);
  });

  app.listen(PORT);
};

main();
