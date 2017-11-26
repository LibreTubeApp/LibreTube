import { refreshVideosOnChannel, getChannelById as getChannelFromYouTube } from '../utils/ytapi';
import { Channel } from '../graphql/connectors';

export const getAllChannels = async (user) => {
  if (!user) throw 'Not authorized';

  return Channel.findAll();
};

export const getChannelById = async (user, id) => {
  if (!user) throw 'Not authorized';

  return Channel.findById(id);
};

export const addChannel = async (user, id) => {
  if (!user) throw 'Not authorized';

  const matches = await Channel.count({ where: { id }});

  if (matches.count) {
    throw `A channel with the username ${username} already exists`;
  }

  const channel = await getChannelFromYouTube(id);
  const created = await Channel.create(channel);
  await refreshVideosOnChannel(id);
  return created;
};
