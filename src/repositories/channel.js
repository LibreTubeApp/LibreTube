import { getChannelByName, refreshVideosOnChannel } from '../utils/ytapi';
import { Channel } from '../graphql/connectors';

export const getAllChannels = async (user) => {
  if (!user) throw 'Not authorized';

  return Channel.findAll();
};

export const getChannelById = async (user, id) => {
  if (!user) throw 'Not authorized';

  return Channel.findById(id);
};

export const addChannel = async (user, username) => {
  if (!user) throw 'Not authorized';

  const matches = await Channel.findAndCount({ where: { username }});

  if (matches.count) {
    throw `A channel with the username ${username} already exists`;
  }

  const channel = await getChannelByName(username);
  const created = await Channel.create(channel);
  await refreshVideosOnChannel(channel.id);
  return created;
};
