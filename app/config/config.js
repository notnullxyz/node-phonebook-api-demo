const appName = 'project4alpha';
const config = {
  appName,
  webserver: {
    port: process.env.PORT || '8800',
  },
  logging: {
    file: process.env.LOG_PATH || 'logs/project4alpha.log',
    level: process.env.LOG_LEVEL || 'info',
    console: process.env.LOG_ENABLE_CONSOLE || true,
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT || 6379,
    database: process.env.REDIS_DATABASE || 4,
  },
};

module.exports = config;
