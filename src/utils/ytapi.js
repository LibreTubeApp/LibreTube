import fetch from 'isomorphic-unfetch';
import ytdl from 'ytdl-core';

import { User, Channel, Video, Thumbnail } from '../graphql/connectors';

const prefix = 'https://www.googleapis.com/youtube/v3';

export const getChannelById = async (apiKey, id) => {
  const url = `${prefix}/channels?part=snippet&key=${apiKey}&id=${id}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw await response.text();
  }

  const data = await response.json();
  const { etag, snippet } = data.items[0];
  const { title, description, publishedAt, thumbnails } = snippet;

  return {
    id,
    etag,
    //username,
    title,
    description,
    publishedAt,
  };
};

export const refreshVideosOnChannel = async (apiKey, channelId) => {
  const channel = await Channel.findById(channelId);

  const url = `${prefix}/search?part=snippet&order=date&type=video&key=${apiKey}&channelId=${channelId}&maxResults=50`;
  const response = await fetch(url, {
    headers: {
      'If-None-Match': channel.etag,
    }
  });

  if (!response.ok) {
    throw await response.text();
  }

  const data = await response.json();
  data.items.forEach(async video => {
    try {
      const { etag, id, snippet } = video;
      const { publishedAt, title, description, thumbnails } = snippet;

      await Video.insertOrUpdate({
        id: id.videoId,
        channelId,
        title,
        description,
        publishedAt,
        etag,
      });

      for (const type in thumbnails) {
        const { url, width, height } = thumbnails[type];
        const { count } = await Thumbnail.findAndCount({ where: {
          videoId: id.videoId,
          type,
        }});

        if (!count) {
          Thumbnail.create({ type, url, width, height, videoId: id.videoId });
        } else {
          const thumbnail = await Thumbnail.findOne({ where: {
            videoId: id.videoId,
            type,
          }});

          await thumbnail.update({
            type,
            url,
            width,
            height,
            videoId: id.videoId,
          });
        }
      }
    } catch (error) {
      console.log(`And error occured refreshing videos: ${error}`);
    }
  });
};

export const refreshAllVideos = async () => {
  // Best effort - get the first user's API key
  return // TODO rewrite in RSS
  const { apiToken } = await User.findOne();
  const channels = await Channel.findAll();
  const promises = channels.map(channel => (
    refreshVideosOnChannel(apiToken, channel.id)
  ));

  return Promise.all(promises).catch(error => {
    console.log(`refreshAllVideos failed: ${error}`);
  });
};

export const getDetailsForVideo = async videoId => {
  try {
    return await ytdl.getInfo(`https://www.youtube.com/watch?v=${videoId}`);
  } catch (error) {
    console.error(`Failed to fetch details for video ${videoId}: ${error}`);
  }
};

export const getSubtitlesForVideo = async videoId => {
  try {
    const info = await ytdl.getInfo(`https://www.youtube.com/watch?v=${videoId}`);
    const captions = info.player_response.captions;
    if (!captions) return null;

    const tracks = captions.playerCaptionsTracklistRenderer.captionTracks;

    return tracks.map(track => ({
      name: track.name.simpleText,
      languageCode: track.languageCode,
      remoteUrl: track.baseUrl,
      url: `/subtitles?url=${encodeURIComponent(track.baseUrl)}`,
      vssId: track.vssId,
      isTranslatable: track.isTranslatable,
    }));
  } catch (error) {
    console.error(`Failed to fetch subtitles for video ${videoId}: ${error}`);
  }
};

export const searchForChannels = async (apiKey, user, searchTerm) => {
  if (!user) throw 'Not authorized';
  if (!searchTerm) return [];

  try {
    const response = await fetch(
      `${prefix}/search?part=snippet&type=channel&key=${apiKey}&q=${searchTerm}`
    );

    if (!response.ok) {
      throw await response.text();
    }

    const data = await response.json();
    if (!data.items || !data.items.length) {
      throw 'Found no channels for this search term';
    }

    return data.items.map(channel => {
      const { id, etag, snippet } = channel;
      const { title, description } = snippet;

      return {
        id: id.channelId,
        //username: String!
        title,
        description,
        etag,
      };
    });
  } catch (error) {
    throw `Failed to search for channels: ${error}`;
  }
};
