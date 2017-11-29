import Sequelize from 'sequelize';

export const db = new Sequelize(
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

export const queryInterface = db.getQueryInterface();

db.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(error => {
    console.error('Unable to connect to the database:', error);
    throw error;
  });

export const User = db.define('user', {
  username: Sequelize.STRING,
  password: Sequelize.STRING,
  active: Sequelize.BOOLEAN,
  email: Sequelize.STRING,
});

export const Channel = db.define('channel', {
  id: { type: Sequelize.STRING, primaryKey: true },
  title: Sequelize.STRING,
  description: Sequelize.TEXT,
  username: Sequelize.STRING,
  etag: Sequelize.STRING,
});

export const Video = db.define('video', {
  id: { type: Sequelize.STRING, primaryKey: true },
  title: Sequelize.STRING,
  description: Sequelize.TEXT,
  publishedAt: Sequelize.DATE,
  etag: Sequelize.STRING,
});

export const Thumbnail = db.define('thumbnail', {
  type: Sequelize.STRING,
  url: Sequelize.STRING,
  width: Sequelize.INTEGER,
  height: Sequelize.INTEGER,
});

Channel.hasMany(Video);
Video.belongsTo(Channel);

Channel.hasMany(Thumbnail);
Video.hasMany(Thumbnail);

db.sync();
