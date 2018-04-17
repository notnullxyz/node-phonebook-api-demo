/**
 * This file forms part of my toolbox repo of boilerplate node api stuff.
 * Pretty print a table of API routes.
 */

const Table = require('cli-table');

const routeScope = (route) => route.spec.scope || 'n/a';

const createRouteRow = (route, version = null) => {
    let {path} = route.spec;
    if (version && version.slice(-2) === '.0') {
        path = `/v${version.replace(new RegExp('.0', 'g'), '')}${path}`;
    }
    return {[route.method]: [route.name, path, routeScope(route)]};
};

/**
 * Prints out a table of Restify routes. Lifted from an old repo. Beware.
 *
 * @param routes An array of Restify routes.
 */
const RouteTable = (routes) => {
    const table = new Table({
        style: {
            head: ['green'],
            compact: true,
        },
        head: ['', 'Name', 'Url', 'Scope'],
    });

    Object.entries(routes).map((route) => route.pop()).forEach((route) => {
        route.versions.forEach((version) => table.push(createRouteRow(route, version)));

        if (!route.versions.length) {
            table.push(createRouteRow(route));
        }
    });

    return table;
};

module.exports = RouteTable;
