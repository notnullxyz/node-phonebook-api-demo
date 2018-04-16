/**
 * This file forms part of my toolbox repo of boilerplate node api stuff.
 */

const redisClient = require('redis');

class Cache {
  /**
   * @param port
   * @param host
   * @constructor
   */
  constructor(port, host) {
    this.client = redisClient.createClient(port, host);
  }

  /**
   * Select bucket to be used
   * @param database
   * @param cb
   */
  select(database, cb) {
    this.client.select(database, cb);
  }

  /**
   * persist value in cache. -1000 for no expiry
   * @param key
   * @param value
   * @param ttl
   */
  set(key, value, ttl) {
    this.client.set(key, value);
    this.client.expire(key, ttl);
  }

  /**
   * Retrieve value from cache
   * @param key
   * @param cb
   */
  get(key, cb) {
    this.client.get(key, (err, data) => {
      if (!err && data) {
        cb(data);
      } else {
        cb(false);
      }
    });
  }
}

module.exports = Cache;
