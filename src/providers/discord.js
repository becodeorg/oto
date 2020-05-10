/* becodeorg/oto
 *
 * /src/providers/discord.js - OAuth Provider: Discord
 *
 * coded by leny@BeCode
 * started at 10/05/2020
 */

import {post} from "got";

export default async (key, secret, code, redirect_uri, _, scope) => {
    const opts = {
        form: {
            client_id: key,
            client_secret: secret,
            code,
            grant_type: "authorization_code",
            redirect_uri,
            scope,
        },
        responseType: "json",
    };

    const {error, body} = await post(
        `https://discordapp.com/api/v6/oauth2/token`,
        opts,
    );

    if (error) {
        throw new Error(error);
    }

    return body;
};
