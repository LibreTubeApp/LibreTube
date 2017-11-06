import Sequelize from 'sequelize';

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

export const Channel = db.define('channel', {
  id: { type: Sequelize.STRING, primaryKey: true },
  title: Sequelize.STRING,
  description: Sequelize.STRING,
  username: Sequelize.STRING,
  etag: Sequelize.STRING,
});

export const Video = db.define('video', {
  id: { type: Sequelize.STRING, primaryKey: true },
  title: Sequelize.STRING,
  description: Sequelize.STRING,
  publishedAt: Sequelize.DATE,
  etag: Sequelize.STRING,
});

Channel.hasMany(Video);
Video.belongsTo(Channel);

db.sync();

