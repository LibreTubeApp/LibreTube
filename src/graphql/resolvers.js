import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
import argon from 'argon2';
import {
  User,
  Channel,
  addUser,
  verifyLogin
} from './connectors';
import {
  getAllVideos,
  getVideoById,
  getVideoByChannelId,
} from '../repositories/video';
import {
  getThumbnailsByVideoId,
} from '../repositories/thumbnail';
import {
  getAllChannels,
} from '../repositories/channel';
import {
  getChannelByName,
  refreshVideosOnChannel,
  getDetailsForVideo,
  getSubtitlesForVideo
} from '../utils/ytapi';

// TODO move more stuff to repositories

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
    videos(_, args, context) {
      return getAllVideos(context.user);
    },
    video(_, args, context) {
      return getVideoById(context.user, id);
    },
    channels(_, args, context) {
      return getAllChannels(context.user);
    },
  },
  Mutation: {
    loginUser(_, { username, password }, context) {
      return new Promise(async (resolve, reject) => {
        try {
          // Always run password validation to impede side channel attacks
          const dummyPassword = '$argon2i$v=19$m=32768,t=20,p=1$cHk+Rc3BPAxdZN2ASo92Mw$31RMbtKtMos7NMgAf0Hq1U6Bh6d4B/pnDNQES2U1tOk';
          const user = await User.findOne({ where: { username }});
          const validPassword = await argon.verify(
            user ? user.password : dummyPassword,
            password,
          );

          if (!user || !validPassword) {
            return reject(
              'The username and password you\'ve given doesn\'t match any ' +
              'account. Try again'
            );
          }

          context.request.login(user, (loginError) => {
            if (loginError) return reject(loginError);

            // OK, logged in
            resolve({
              loggedIn: true,
              user,
            });
          });
        } catch (error) {
          reject(error);
        }
      });
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
    channel(obj, args, context) {
      return getChannelById(context.user, obj.channelId);
    },
    details(obj) {
      return getDetailsForVideo(obj.id);
    },
    thumbnails(obj) {
      return getThumbnailByVideoId(context.user, obj.id);
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
