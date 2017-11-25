import { Thumbnail } from '../graphql/connectors';

export const getThumbnailsByVideoId = async (user, videoId) => {
  if (!user) {
    throw 'Not authorized';
  }

  return Thumbnail.findAll({
    where: { videoId },
  });
};

