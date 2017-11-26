import argon from 'argon2';
import { User } from '../graphql/connectors';

export const addUser = async args => {
  const matches = await User.findAndCount({
    where: {
      username: args.user.username,
    },
  });

  if (matches.count) {
    throw `A user with the username ${args.user.username} already exists`;
  }

  // Some minor extra hardening
  const hashOptions = {
    timeCost: 20,
    memoryCost: 15,
  };
  const hash = await argon.hash(args.user.password, hashOptions);
  const created = await User.create({
    ...args.user,
    password: hash,
  });
  return created.dataValues;
};

export const verifyLogin = async args => {
  const user = await User.findOne({
    where: {
      username: args.username,
    },
  });

  return await argon.verify(user.password, args.password);
};

