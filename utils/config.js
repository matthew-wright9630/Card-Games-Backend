const {
  JWT_SECRET = "super-secret-key",
  DATABASE_URL = "mongodb://127.0.0.1:27017/wtwr_db",
} = process.env;

module.exports = {
  JWT_SECRET,
  DATABASE_URL,
};
