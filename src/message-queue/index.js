const RabbitMQ = require("../utils/RabbitMQ");
const env = require("../config/env_variables").getEnv();
const logger = require("../config/logger");
let timeout = 3000;
let count = 1;
class AMQPGraphServices extends RabbitMQ {

    validateUserByFBGraph(action) {
        const queueName = env.rabbitmq.queue.req.authFacebook;

        this.consumer.assertQueue(queueName, { durable: true });

        this.consumer.consume(queueName, async (message) => {
            try{
                console.log(message);
                this.consumer.ack(message);
                const { properties: { correlationId }, content } = message;
    
                logger.info(`rabbitMQ__${queueName} validateUserByFBGraph: received message from queue`);
                logger.info(`rabbitMQ__${queueName} validateUserByFBGraph: correlationId=${correlationId}`);
                            
                const reqData = JSON.parse(content);            
                console.log(reqData);
                const result = await action(reqData.accessToken, reqData.signedRequest);
                this.produceResponse(result, correlationId);
            }
            catch (ex) {
                logger.error(`rabbitMQ__${queueName} error when processing facebook auth request`);
                throw ex;
            }
        });
    }

    produceResponse(data, correlationId) {
        const queueName = env.rabbitmq.queue.res.authFacebook;
        count += 1;
        logger.info(`rabbitMQ_${queueName} sending back facebook auth response`);
        console.log(data);

        this.producer.assertQueue(queueName, { durable: true });
        this.producer.sendToQueue(queueName, Buffer.from(JSON.stringify(data)), { correlationId });
    };

}

module.exports = new AMQPGraphServices(env.rabbitmq.server);