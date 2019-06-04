/* becodeorg/oto
 *
 * /src/oto.js - AWS lambda function to handle OAuth2 Secret
 *
 * coded by leny@BeCode
 * started at 04/06/2019
 */

import sls from "serverless-http";
import Koa from "koa";
import parseurl from "parseurl";
import {parse as parseqs} from "qs";

import providers from "./providers";

const app = new Koa();

app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.status = err.status || 500;
        ctx.body = {
            message: err.message,
        };
    }
});

app.use(async ctx => {
    const {pathname, query} = parseurl(ctx.req);
    const {redirect_uri, state} = parseqs(query);
    const [, service, client, code] = pathname.split("/");

    const credentials = (process.env || []).find(
        ({provider, key}) => provider === service && key === client,
    );

    if (!credentials) {
        ctx.throw(500, `Client ID "${client}" isn't configured!`);
    }

    const {provider, key, secret} = credentials;

    if (!providers[provider]) {
        ctx.throw(500, `Unknown provider "${provider}"`);
    }

    try {
        ctx.body = await providers[provider](
            key,
            secret,
            code,
            redirect_uri,
            state,
        );
    } catch (err) {
        ctx.throw(500, err);
    }
});

export const handler = sls(app);
