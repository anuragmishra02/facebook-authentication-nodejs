const env = require("../config/env_variables").getEnv();
const FB = require("../utils/FBGraph");
const logger = require("../config/logger");

FB.init({
    appId: typeof env.facebook.appId === "string" ? parseInt(env.facebook.appId) : env.facebook.appId,
    appName: env.facebook.appName,
    appSecret: env.facebook.appSecret,
    graphApi: env.facebook.graphUrl,
    graphApiVersion: env.facebook.graphVersion
});

module.exports = async ({ accessToken, signedRequest, correlationId }) => {
    let userId = null;

    try {
        userId = await FB.parseSignedRequest(signedRequest, correlationId);

        logger.info(`${correlationId}: Debug accessToken for user ${userId}`);
        const verifiedToken = await FB.debugUserAccessToken(accessToken);

        if (verifiedToken.data.data.error) {
            throw { ...verifiedToken.data.data.error };
        }
        else {
            const { data } = verifiedToken;
            const _data = data.data;
            // console.log(data.data);

            if (FB.appId !== parseInt(_data.app_id)) {
                logger.info(`${correlationId}_${userId}: appId(${_data.app_id}) does not belong to stacker`);
                throw {
                    type: "GRAPH_API",
                    message: "FB_DATA_UNKNOWN_APPID"
                };
            }
            else if (userId !== _data.user_id) {
                logger.info(`${correlationId}_${userId}: userId(${_data.user_id}) does not belong to user(${userId})`);
                throw {
                    type: "GRAPH_API",
                    message: "FB_DATA_UNKNOWN_APPID"
                };
            }
            else if (_data.is_valid !== true) {
                logger.info(`${correlationId}_${userId}: fb graph services returned invalid flag false for user(${userId})`);
                throw {
                    type: "GRAPH_API",
                    message: "FB_DATA_UNKNOWN_APPID"
                };
            }
        }

        const res = await FB.getUserProfile(accessToken);

        return res.data;
    } catch (er) {
        //console.log(er);
        if (er.response !== undefined && er.response.data.error) {
            logger.info(`${correlationId}: Error in fb-auth ${er.response.data.error}`);
            throw er.response.data.error;
        }
        else {
            logger.info(`${correlationId}: Error in fb-auth ${typeof er === "object" ? JSON.stringify(er) : er}`);
            throw er;
        }
    }
};
