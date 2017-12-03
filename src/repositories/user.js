import argon from 'argon2';
import { User } from '../graphql/connectors';
import { verifyPassword } from '../utils/auth';

export const addUser = async args => {
  const count = await User.count();

  if (count) {
    throw 'A user on this system has already been registered';
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

export const updateUser = async (user, userInput) => {
  if (!user) throw 'Not authorized';

  const match = await User.find({
    where: {
      username: userInput.username,
    }
  });

  if (!match) throw 'This user does not exist';

  const validPassword = await verifyPassword(
    match.password,
    userInput.password,
  );

  if (!validPassword) throw 'Invalid password';

  return await match.update({
    ...userInput,
    password: match.password,
  });
};
