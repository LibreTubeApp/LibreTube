import { refreshVideosOnChannel, getChannelById as getChannelFromYouTube } from '../utils/ytapi';
import { getVideoByChannelId } from './video';
import { getThumbnailsByVideoId } from './thumbnail';
import { db, queryInterface, Channel } from '../graphql/connectors';

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

export const removeChannel = async (user, id) => {
  if (!user) throw 'Not authorized';

  const channel = await Channel.findById(id);

  if (!channel) {
    throw 'This channel does not exist';
  }

  const videos = await getVideoByChannelId(user, channel.id);
  videos.forEach(video => {
    queryInterface.bulkDelete('thumbnails', { videoId: video.id });
  });

  await queryInterface.bulkDelete('videos', { channelId: channel.id });
  await queryInterface.bulkDelete('thumbnails', { channelId: channel.id });

  await channel.destroy();
};
