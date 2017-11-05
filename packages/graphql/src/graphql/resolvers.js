import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
import { Video, Channel } from './connectors';

export default {
  Query: {
    videos(_, args) {
      return Video.findAll({ where: args });
    },
    channels(_, args) {
      return Channel.findAll({ where: args });
    },
  },
  Mutation: {
    async addChannel(_, args) {
      const exists = await Channel.findById(args.id);
      if (exists) {
        throw `A channel with the id ${args.id} already exists`;
      }

      const created = await Channel.create(args);
      return created.dataValues;
    }
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
