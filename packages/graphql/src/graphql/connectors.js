const Sequelize = require('sequelize');

const db = new Sequelize(
  process.env.DBDATABASE,
  process.env.DBUSER,
  process.env.DBPASSWORD,
  {
    host: process.env.DBHOST,
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    operatorsAliases: false
  },
);

db.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(error => {
    console.error('Unable to connect to the database:', error);
    throw error;
  });

const Channel = db.define('channel', {
  title: Sequelize.STRING,
  description: Sequelize.STRING,
  username: Sequelize.STRING,
  etag: Sequelize.STRING,
});

const Video = db.define('video', {
  title: Sequelize.STRING,
  description: Sequelize.STRING,
  publishedAt: Sequelize.DATE,
  etag: Sequelize.STRING,
});

Video.belongsTo(Channel);

db.sync();

module.exports = { Channel, Video };
