require('dotenv').config({
  path: process.env.NODE_ENV === 'test'
    ? '.env.test'
    : '.env',
});

module.exports = {
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  dialect: process.env.DB_DIALECT || 'postgres',
  storage: './__tests__/database.sqlite',
  operatorAliases: false,
  logging: false,
  dialectOptions: {
    ssl: true,
  },
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
