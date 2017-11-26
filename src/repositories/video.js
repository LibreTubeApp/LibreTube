import { Video } from '../graphql/connectors';

export const getAllVideos = async (user) => {
  if (!user) throw 'Not authorized';

  return Video.findAll();
};

export const getVideoById = async (user, id) => {
  if (!user) throw 'Not authorized';

  return Video.findById(id);
};
