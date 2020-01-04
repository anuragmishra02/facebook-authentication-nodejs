const amqp = require("./utils/RabbitMQ");
const amqpUtils = require("./config/amqp");
const fbauth = require("./services/facebook-auth");
const logger = require("./config/logger");
const env = require("./config/env_variables").getEnv();

const facebook_error_codes = (message) => {
    if (message === "This authorization code has expired.") {
        return "FB_AUTHCODE_EXPIRED";
    }
    else {
        return message;
    }
};

(async () => {

    try {
        await amqp.config(env.rabbitmq.server);
        logger.info("Facebook auth service started");        

        amqpUtils.FBAuthentication(async ({ accessToken, signedRequest, correlationId }) => {
            try{
                logger.info(`${correlationId}: request FB Graph services to authenticate user`);
                const result = await fbauth({ accessToken, signedRequest, correlationId });

                logger.info(`${correlationId}: user ${result.id} is authenticated`);

                return { data: result, error: null };
            }
            catch(ex){                
                return { data: null, error: ex };
            }
        });        
    }
    catch (ex) {
        logger.info("Error starting rabbit-mq client");
        logger.info(ex);
        process.exit(1);
    }

})();
