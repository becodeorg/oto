/* becodeorg/oto
 *
 * /src/providers/linkedin.js - OAuth Provider: LinkedIN
 *
 * coded by leny@BeCode
 * started at 27/06/2019
 */

import {post} from "got";

export default async (key, secret, code, redirect_uri) => {
    const opts = {
        body: {
            client_id: key,
            client_secret: secret,
            code,
            redirect_uri,
            grant_type: "authorization_code",
        },
        form: true,
    };

    console.log(opts);

    const {error, body} = await post(
        `https://www.linkedin.com/oauth/v2/accessToken`,
        opts,
    );

    console.log(error, body);

    if (error) {
        throw new Error(error);
    }

    return body;
};
