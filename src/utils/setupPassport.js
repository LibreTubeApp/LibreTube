import passport from 'passport';
import argon from 'argon2';
import { Strategy as LocalStrategy } from 'passport-local';

import { User } from '../graphql/connectors';

export default () => {
  passport.use(new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ where: { username }});
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }

      const validPassword = await argon.verify(user.password, password);
      if (!validPassword) {
        return done(null, false, { message: 'Incorrect password.' });
      }

      return done(null, user);
    } catch (error) {
      done(error);
    }
  }));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id).then(
      user => done(null, user),
      error => done(error),
    );
  });
};
