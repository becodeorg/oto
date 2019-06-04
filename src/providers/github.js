/* becodeorg/oto
 *
 * /src/providers/github.js - OAuth Provider: GitHub
 *
 * coded by leny@BeCode
 * started at 04/06/2019
 */

import {post} from "got";

export default async (key, secret, code, redirect_uri, state) => {
    const opts = {
        body: {
            client_id: key,
            client_secret: secret,
            code,
        },
        json: true,
    };

    if (redirect_uri) {
        opts.body.redirect_uri = redirect_uri;
    }
    if (state) {
        opts.body.state = state;
    }

    const {error, body} = await post(
        `https://github.com/login/oauth/access_token`,
        opts,
    );

    if (error) {
        throw new Error(error);
    }

    return body;
};
