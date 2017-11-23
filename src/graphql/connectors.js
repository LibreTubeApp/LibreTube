import Sequelize from 'sequelize';
import argon from 'argon2';

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

export const addUser = async args => {
  const matches = await User.findAndCount({
    where: {
      username: args.user.username,
    },
  });

  if (matches.count) {
    throw `A user with the username ${args.user.username} already exists`;
  }

  // Some minor extra hardening
  const hashOptions = {
    timeCost: 20,
    memoryCost: 15,
  };
  const hash = await argon.hash(args.user.password, hashOptions);
  const created = await User.create({
    ...args.user,
    password: hash,
  });
  return created.dataValues;
};

export const verifyLogin = async args => {
  const user = await User.findOne({
    where: {
      username: args.username,
    },
  });

  return await argon.verify(user.password, args.password);
};
