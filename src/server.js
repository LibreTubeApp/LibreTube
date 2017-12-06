import 'babel-polyfill';
import path from 'path';
import { parse } from 'url';
import express from 'express'
import session from 'express-session';
import helmet from 'helmet';
import next from 'next';
import passport from 'passport';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import ytdl from 'ytdl-core';
import { ensureLoggedIn } from 'connect-ensure-login';
import storeBuilder from 'connect-session-sequelize';

import typeDefs from './graphql/schema';
import resolvers from './graphql/resolvers';
import { db, User } from './graphql/connectors';
import parseXml from './utils/parseXml';
import startCron from './utils/cron';
import { setupPassport } from './utils/auth';

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev });
const handle = app.getRequestHandler()
const server = express();

setupPassport();
startCron();

const schema = makeExecutableSchema({ typeDefs, resolvers });
const SequelizeStore = storeBuilder(session.Store);

const getCspOverrides = () => {
  if (dev) {
    return ["'self'", "'unsafe-eval'", "'unsafe-inline'"];
  }
};

if (process.env.PROXY === 'true') {
  server.set('trust proxy', 1); // trust first proxy
}

// Middlewares
server.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: getCspOverrides(),
      styleSrc: getCspOverrides(),
      // TODO proxy images and remove this
      imgSrc: ["'self'", 'https://*.ytimg.com'],
    },
    browserSniff: false,
  },
  referrerPolicy: {
    policy: 'no-referrer',
  },
}));
server.use(bodyParser.json());
server.use(session({
  store: new SequelizeStore({ db }),
  secret: 'dogs',
  name: 'session',
  cookie: {
    secure: process.env.HTTPS === 'true',
    expires: new Date(Date.now() + 48 * 60 * 60 * 1000) // 48 hours
  },
}));
server.use(passport.initialize());
server.use(passport.session());

app.prepare().then(() => {
  server.use('/graphql', graphqlExpress((request, response) => ({
    schema,
    context: {
      user: request.user,
      request,
      response,
    },
  })));

  if (process.env.NODE_ENV !== 'production') {
    server.use('/graphql-explorer', graphiqlExpress({
      endpointURL: '/graphql',
    }));
  }

  server.use('/videoplayback', ensureLoggedIn(), (req, res) => {
    const { v: videoId } = req.query;

    // Default timeout is 5 minutes, which is too short for videos
    req.setTimeout(10 * 60 * 60 * 1000);

    if (!ytdl.validateID(videoId)) {
      res.status(400).send({
        error: 'VALIDATION_ERROR',
        reason: 'Invalid video id',
      });
      return;
    }

    ytdl(`https://youtube.com/watch?v=${videoId}`).pipe(res);
  });

  server.use('/subtitles', ensureLoggedIn(), async (req, res) => {
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

  server.use('/sw.js', express.static(path.join(__dirname, '../.next/sw.js')));

  server.get('*', (req, res) => {
    const parsedUrl = parse(req.url, true);
    return handle(req, res, parsedUrl);
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  });
});
