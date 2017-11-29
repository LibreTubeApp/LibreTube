import { GraphQLScalarType } from 'graphql';

export default new GraphQLScalarType({
  name: 'Null',
  description: 'A value that is always null',
  parseValue() {
    return null;
  },
  serialize(value) {
    return null;
  },
  parseLiteral(ast) {
    return null;
  },
});
