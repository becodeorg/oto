/* becodeorg/oto
 *
 * /scripts/clean-sourcemaps.js - Scripts: clean sourcemaps & license files
 *
 * coded by leny@BeCode
 * started at 11/10/2019
 */

/* eslint-disable no-console, global-require */

const rimraf = require("rimraf");
const {promisify} = require("util");

const rimrafAsync = promisify(rimraf);

(async () => {
    console.log("Cleaning sourcemaps & licenses files...");
    await rimrafAsync("./bin/**/*.js.map");
    await rimrafAsync("./bin/**/*.js.LICENSE");
    console.log("Cleaning done.");
})();
