const axios = require("axios").default;
const base64url = require('base64url');
const logger = require("../config/logger");

const isEmpty = (val) => {
    if (val === null || val === void (0)) {
        return true;
    }
    else if (typeof val === "string" && val.trim().length === 0) {
        return true;
    }
    else {
        return false;
    }
};

const fberror = { redirect_uri: "Error validating verification code. Please make sure your redirect_uri is identical to the one you used in the OAuth dialog request" };
'Error validating verification code. Please make sure your redirect_uri is identical to the one you used in the OAuth dialog request'
class FBGraph {

    constructor() {
        this.graphApi = null;
        this.graphApiVersion = null;
        this.appId = null;
        this.appSecret = null;
        this.appName = null;
    }

    init({ graphApi, graphApiVersion, appId, appSecret, appName }) {
        this.graphApi = graphApi;
        this.graphApiVersion = graphApiVersion;
        this.appId = appId;
        this.appSecret = appSecret;
        this.appName = appName;
    }

    getAppAccessToken() {
        const graphUrl = [
            `${this.graphApi}/',
            'oauth/access_token`,
            `?client_id=${this.appId}`,
            `&client_secret=${this.appSecret}`,
            `&redirect_uri=null`,
            `&grant_type=client_credentials`
        ].join("");

        return axios.get(graphUrl);
    }

    debugUserAccessToken(userAccessToken) {
        const graphUrl = [
            `${this.graphApi}/${this.graphApiVersion}/`,
            `debug_token/`,
            `?input_token=${userAccessToken}`,
            `&access_token=${this.appId + "|" + this.appSecret}`
        ].join("");

        return axios.get(graphUrl);
    }

    getUserProfile(userAccessToken) {
        const graphUrl = [
            `${this.graphApi}/${this.graphApiVersion}/`,
            `me?fields=name,email`,
            `&access_token=${userAccessToken}`
        ].join("");

        return axios.get(graphUrl);
    }

    getAccessToken(authCode) {
        const graphUrl = [
            `${this.graphApi}/${this.graphApiVersion}/`,
            `oauth/access_token?client_id=${this.appId}`,
            `&redirect_uri=http://localhost:3103/&`,
            `client_secret=${this.appSecret}&`,
            `code=${authCode}`
        ].join("");

        return axios.get(graphUrl);
    }

    async parseSignedRequest(signedRequest, correlationId) {

        logger.info(`${correlationId}: GraphApi utils, parseSignedRequest`);
        logger.info(`is empty: ${isEmpty(signedRequest)}`);
        if (!isEmpty(signedRequest)) {
            let decodedPayload = null;
            try {
                let encodeSignAndPayload = signedRequest.split(".");
                let decodedSign = base64url.decode(encodeSignAndPayload[0]);
                decodedPayload = base64url.decode(encodeSignAndPayload[1]);

                logger.info(`${correlationId}: signedRequest is decoded`);
                const authCode = JSON.parse(decodedPayload).code;

                logger.info(`${correlationId}: debug auth code`);
                const fbData = await this.getAccessToken(authCode);
                return fbData;
            }
            catch (ex) {
                if (ex.response && ex.response.data) {

                    //const error = typeof ex.response.data === 'object' ? JSON.stringify(ex.response.data) : ex.response.data;
                    const error = ex.response.data.error;
                    logger.info(`${correlationId}: Error on request access Token: ${error}`);
                    logger.info(` fberror>>>>> ${fberror.redirect_uri}`);
                    logger.info(`>>> error >>> error.message`);
                    if (error.message === fberror.redirect_uri) {
                        //console.log("error redirect URI True");
                        logger.info(`${correlationId}: Redirect_Uri error is ignored`);
                        const userID = JSON.parse(decodedPayload).user_id;
                        logger.info(`${correlationId}: Decoded userId: ${userID}`)
                        return userID;
                    }
                    else {
                        throw ex.response.data.error;
                    }
                }
                throw ex;
            }
        }
    }
}

module.exports = new FBGraph();
