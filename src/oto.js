/* becodeorg/oto
 *
 * /src/oto.js - AWS lambda function to handle OAuth2 Secret
 *
 * coded by leny@BeCode
 * started at 04/06/2019
 */

import sls from "serverless-http";
import Koa from "koa";
import cors from "koa2-cors";
import parseurl from "parseurl";
import {parse as parseqs} from "qs";
import * as Sentry from "@sentry/node";

import providers from "./providers";

const {AWS_LAMBDA_FUNCTION_NAME, SENTRY_DSN, IS_OFFLINE = false} = process.env;

const STAGE = AWS_LAMBDA_FUNCTION_NAME.includes("production") ? "prod" : "dev";

if (SENTRY_DSN && !IS_OFFLINE) {
    Sentry.init({dsn: SENTRY_DSN, environment: STAGE});
}

const app = new Koa();

app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        if (SENTRY_DSN && !IS_OFFLINE) {
            Sentry.withScope(scope => {
                scope.addEventProcessor(event =>
                    Sentry.Handlers.parseRequest(event, ctx.request),
                );
                Sentry.captureException(err);
            });
            await Sentry.flush(2000);
        }
        ctx.status = err.status || 500;
        ctx.body = {
            message: err.message,
        };
    }
});

app.use(
    cors({
        origin: "*",
        allowMethods: ["GET", "HEAD", "OPTIONS"],
    }),
);

app.use(async ctx => {
    const {pathname, query} = parseurl(ctx.req);
    const {redirect_uri, state} = parseqs(query);
    const [, service, client, code] = pathname.split("/");

    const secret = process.env[`${service}_${client}`];

    if (!secret) {
        ctx.throw(
            500,
            `Client ID "${client}" for service "${secret}" isn't configured!`,
        );
    }

    if (!providers[service]) {
        ctx.throw(500, `Unknown provider "${service}"`);
    }

    try {
        // eslint-disable-next-line require-atomic-updates
        ctx.body = await providers[service](
            client,
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
