const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

const PORT = 4000;
var app = express();

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
app.listen(PORT);
