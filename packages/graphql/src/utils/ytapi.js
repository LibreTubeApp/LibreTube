import 'isomorphic-fetch';
import { Video } from '../graphql/connectors';

const prefix = 'https://www.googleapis.com/youtube/v3';
const apiKey = 'AIzaSyDeFkttvdLyrHWrxoSS36rhT-YaYuJvfjc';

export const getChannelByName = async username => {
  const url = `${prefix}/channels?part=snippet&key=${apiKey}&forUsername=${username}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw await response.text();
  }

  const data = await response.json();
  const { id, etag, snippet } = data.items[0];
  const { title, description, publishedAt, thumbnails } = snippet;

  return {
    id,
    etag,
    username,
    title,
    description,
    publishedAt,
  };
};

export const refreshVideosOnChannel = async channelId => {
  const url = `${prefix}/search?part=snippet&order=date&type=video&key=${apiKey}&channelId=${channelId}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw await response.text();
  }

  const data = await response.json();
  data.items.forEach(video => {
    const { etag, id, snippet } = video;
    const { publishedAt, title, description, thumbnails } = snippet;

    // This does not await, and that is fine
    Video.create({
      id: id.videoId,
      channelId,
      title,
      description,
      publishedAt,
      etag,
    });
  });
};
