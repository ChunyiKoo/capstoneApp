// backend/config/index.js
//read the environment variables loaded and export them.

module.exports = {
 environment: process.env.NODE_ENV || "development",
 port: process.env.PORT || 8000,
 dbFile: process.env.DB_FILE,
 jwtConfig: {
  secret: process.env.JWT_SECRET,
  expiresIn: process.env.JWT_EXPIRES_IN,
 },
};
