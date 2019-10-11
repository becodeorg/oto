/* becodeorg/oto
 *
 * /scripts/get-release-name.js - Scripts: generate release name for Sentry
 *
 * coded by leny@BeCode
 * started at 11/10/2019
 */

/* eslint-disable no-console, global-require */

const {name, version} = require(`${__dirname}/../package.json`);

console.log(`${name.split("/")[1]}@${version}`);
