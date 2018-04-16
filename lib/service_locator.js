/**
 * This file forms part of my toolbox repo of boilerplate node api stuff.
 */

/**
 * A Service Locator.
 *
 * Used to register and resolve dependency in a recursive manner.
 * @class ServiceLocator
 * @constructor
 */
class ServiceLocator {
  constructor() {
    this.dependencyMap = {};
    this.dependencyCache = {};
  }
  /**
   * Adds a dependency to the container.
   *
   * @method register
   * @param  {String}   dependencyName The dependency name
   * @param  {Function} constructor    The function used for initially instantiating the dependency.
   * @return {void}
   */
  register(dependencyName, constructor) {
    if (typeof constructor !== 'function') {
      throw new Error(`${dependencyName}: Dependency constructor is not a function`);
    }

    if (!dependencyName) {
      throw new Error('Invalid dependency name provided');
    }

    this.dependencyMap[dependencyName] = constructor;
  }
  /**
   * Resolves and returns the dependency requested.
   *
   * @method get
   * @param  {string} dependencyName The name of the dependency to resolve.
   * @return {Object}                The resolved dependency
   */
  get(dependencyName) {
    if (this.dependencyMap[dependencyName] === undefined) {
      throw new Error(`${dependencyName}: Attempting to retrieve unknown dependency`);
    }

    if (this.dependencyCache[dependencyName] === undefined) {
      const dependencyConstructor = this.dependencyMap[dependencyName];
      this.dependencyCache[dependencyName] = dependencyConstructor(this);
    }

    return this.dependencyCache[dependencyName];
  }
  /**
   * Retrieves an object containing the dependency name as the key and the resolved dependency
   * as the object. This object contains all dependencies registered in this container.
   *
   * @method getAll
   * @return {Array} Contain all the dependencies registered in this container after being resolved.
   */
  getAll() {
    Object.keys(this.dependencyMap).forEach((dependency) => this.get(dependency));
    return Object.entries(this.dependencyCache);
  }
  /**
   * Clears all the dependencies from this container and from the cache.
   * @method clear
   * @return {void}
   */
  clear() {
    this.dependencyCache = {};
    this.dependencyMap = {};
  }
}

module.exports = new ServiceLocator();
