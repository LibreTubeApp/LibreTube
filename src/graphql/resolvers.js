import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
import {
  User,
  Video,
  Channel,
  Thumbnail,
  addUser,
  verifyLogin
} from './connectors';
import {
  getChannelByName,
  refreshVideosOnChannel,
  getDetailsForVideo,
  getSubtitlesForVideo
} from '../utils/ytapi';

const sleep = time => new Promise(resolve => setTimeout(resolve, time));

export default {
  Query: {
    currentUser(_, args, context) {
      if (!context.user) {
        return { loggedIn: false };
      }

      return {
        loggedIn: true,
        user: context.user,
      };
    },
    videos(_, args) {
      return Video.findAll({ where: args });
    },
    video(_, args) {
      return Video.findById(args.id);
    },
    channels(_, args) {
      return Channel.findAll({ where: args });
    },
  },
  Mutation: {
    addUser(_, args) {
      return addUser(args);
    },
    async addChannel(_, args) {
      const matches = await Channel.findAndCount({ where: args });
      if (matches.count) {
        throw `A channel with the username ${args.username} already exists`;
      }

      const channel = await getChannelByName(args.username);
      const created = await Channel.create(channel);
      await refreshVideosOnChannel(channel.id);
      return created;
    },
  },
  Video: {
    channel(obj) {
      return Channel.findById(obj.channelId);
    },
    details(obj) {
      return getDetailsForVideo(obj.id);
    },
    thumbnails(obj) {
      return Thumbnail.findAll({
        where: {
          videoId: obj.id,
        },
      });
    },
    subtitles(obj) {
      return getSubtitlesForVideo(obj.id);
    },
  },
  Channel: {
    async videos(obj) {
      await sleep(1000);
      return Video.findAll({
        where: {
          channelId: obj.id,
        }
      });
    },
  },
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      return value.getTime(); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10); // ast value is always in string format
      }
      return null;
    },
  }),
};
