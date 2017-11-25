import { Channel } from '../graphql/connectors';

export const getAllChannels = async (user) => {
  if (!user) {
    throw 'Not authorized';
  }

  return Channel.findAll();
};

export const getChannelById = async (user, id) => {
  if (!user) {
    throw 'Not authorized';
  }

  return Channel.findById(id);
};
