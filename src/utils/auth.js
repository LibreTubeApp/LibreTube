import passport from 'passport';
import argon from 'argon2';
import { Strategy as LocalStrategy } from 'passport-local';

import { User } from '../graphql/connectors';

export const setupPassport = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id)
      .then(user => done(null, user))
      .catch(error => done(error));
  });
};

const dummyPassword = '$argon2i$v=19$m=32768,t=20,p=1$cHk+Rc3BPAxdZN2ASo92Mw$31RMbtKtMos7NMgAf0Hq1U6Bh6d4B/pnDNQES2U1tOk';
export const verifyPassword = (storedHash, incomingPassword) => (
  argon.verify(
    // Always run password validation to impede side channel attacks
    storedHash || dummyPassword,
    incomingPassword,
  )
);

export const loginUser = (request, username, password) => (
  new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({ where: { username }});
      const validPassword = await verifyPassword(user.password, password);

      if (!user || !validPassword) {
        return reject(
          'The username and password you\'ve given doesn\'t match any ' +
          'account. Try again'
        );
      }

      request.login(user, (loginError) => {
        if (loginError) return reject(loginError);

        // OK, logged in
        resolve({
          loggedIn: true,
          user,
        });
      });
    } catch (error) {
      reject(error);
    }
  })
);

