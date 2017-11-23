import 'babel-polyfill';
import { parse } from 'url';
import express from 'express'
import session from 'express-session';
import next from 'next';
import passport from 'passport';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import ytdl from 'ytdl-core';
import { ensureLoggedIn } from 'connect-ensure-login';

import typeDefs from './graphql/schema';
import resolvers from './graphql/resolvers';
import { User } from './graphql/connectors';
import parseXml from './utils/parseXml';
import startCron from './utils/cron';
import setupPassport from './utils/setupPassport';

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev });
const handle = app.getRequestHandler()
const server = express();

setupPassport();
startCron();

const schema = makeExecutableSchema({ typeDefs, resolvers });

// Middlewares
server.use(session({
  secret: 'dogs',
  resave: false,
  saveUninitialized: false,
}));
server.use(cookieParser());
server.use(bodyParser.json());
server.use(passport.initialize());
server.use(passport.session());

app.prepare().then(() => {
  server.use('/graphql', ensureLoggedIn(), graphqlExpress({ schema }));

  server.use('/graphql-explorer', ensureLoggedIn(), graphiqlExpress({
    endpointURL: '/graphql',
  }));

  server.post('/login', passport.authenticate('local'), (req, res) => {
    res.sendStatus(204);
  });

  server.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

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

  /** These routes do not need authentication */
  const whitelistedRoutes = [
    '/login',
    '/setupAccount',
    '/static',
    '/_next',
  ];
  server.get('*', async (req, res) => {
    const parsedUrl = parse(req.url, true);
    const url = parsedUrl.href;

    if (whitelistedRoutes.some(route => url.startsWith(route))) {
      return handle(req, res, parsedUrl);
    }

    // Check login state
    if (!req.user) {
      const userExists = await User.count();

      if (userExists) {
        return res.redirect('/login');
      }

      return res.redirect('/setupAccount');
    }

    return handle(req, res, parsedUrl);
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  });
});
