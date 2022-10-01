module.exports = {
    PORT: process.env.PORT || 3608,
    DB_CONNECT: process.env.DB_CONNECT || "mongodb://127.0.0.1:27017/buonbds",
    env: process.env.NODE_ENV || "development"
}