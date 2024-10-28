const {
  JWT_SECRET = "e38799700f6b42c8c2244532b6edcfccc6ba9a5f691d7cbe011829dc44cd2b33",
  DATABASE_URL = "mongodb://127.0.0.1:27017/card-games-mw",
} = process.env;

module.exports = {
  JWT_SECRET,
  DATABASE_URL,
};
