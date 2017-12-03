import { Video } from '../graphql/connectors';

export const getAllVideos = async (user, options) => {
  if (!user) throw 'Not authorized';

  return Video.findAll({
    order: [['publishedAt', 'DESC']],
    ...options,
  });
};

export const getVideoById = async (user, id) => {
  if (!user) throw 'Not authorized';

  return Video.findById(id);
};

export const getVideoByChannelId = async (user, channelId) => {
  if (!user) throw 'Not authorized';

  return Video.findAll({ where: { channelId }});
};
