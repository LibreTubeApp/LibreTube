import passport from 'passport';
import argon from 'argon2';
import { Strategy as LocalStrategy } from 'passport-local';

import { User } from '../graphql/connectors';

export default () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id)
      .then(user => done(null, user))
      .catch(error => done(error));
  });
};
