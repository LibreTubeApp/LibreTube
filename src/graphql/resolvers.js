import dateScalar from './dateScalar';
import { loginUser } from '../utils/auth';
import { getAllVideos, getVideoById, getVideoByChannelId } from '../repositories/video';
import { addUser } from '../repositories/user';
import { getThumbnailsByVideoId } from '../repositories/thumbnail';
import { getCurrentUser } from '../repositories/currentUser';
import { getAllChannels, getChannelById, addChannel } from '../repositories/channel';
import { getDetailsForVideo, getSubtitlesForVideo, searchForChannels } from '../utils/ytapi';

export default {
  Query: {
    currentUser(_, args, context) {
      return getCurrentUser(context.user);
    },
    videos(_, args, context) {
      return getAllVideos(context.user);
    },
    video(_, args, context) {
      return getVideoById(context.user, args.id);
    },
    channels(_, args, context) {
      return getAllChannels(context.user);
    },
    channelsSearch(_, args, context) {
      return searchForChannels(context.user, args.searchTerm);
    },
  },
  Mutation: {
    loginUser(_, { username, password }, context) {
      return loginUser(context.request, username, password);
    },
    logout(_, args, context) {
      context.request.logout();
      return {
        loggedIn: false,
      };
    },
    addUser(_, args) {
      return addUser(args);
    },
    addChannel(_, args, context) {
      return addChannel(context.user, args.username);
    },
  },
  Video: {
    channel(obj, args, context) {
      return getChannelById(context.user, obj.channelId);
    },
    details(obj) {
      return getDetailsForVideo(obj.id);
    },
    thumbnails(obj, args, context) {
      return getThumbnailsByVideoId(context.user, obj.id);
    },
    subtitles(obj) {
      return getSubtitlesForVideo(obj.id);
    },
  },
  Channel: {
    videos(obj, args, context) {
      return getVideoByChannelId(context.user, obj.id);
    },
  },
  Date: dateScalar,
};
