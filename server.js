import 'babel-polyfill';
import express from 'express'
import next from 'next';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import ytdl from 'ytdl-core';

import typeDefs from './server/graphql/schema';
import resolvers from './server/graphql/resolvers';
import startCron from './server/utils/cron';

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev });
const handle = app.getRequestHandler()
const server = express();

startCron();

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

app.prepare().then(() => {
  server.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

  server.use('/graphql-explorer', graphiqlExpress({
    endpointURL: '/graphql/',
  }));

  server.use('/videoplayback', (req, res) => {
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

  server.use('/subtitles', async (req, res) => {
    const { url } = req.query;

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

  server.use('*', (req, res) => {
    return handle(req, res);
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  });
});
