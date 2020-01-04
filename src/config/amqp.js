const env = require("./env_variables").getEnv();
const rabbitMq = require("../utils/RabbitMQ");
const logger = require("./logger");

exports.FBAuthentication = async (action) => {
    const [ consumer, producer ] = [ rabbitMq.getConsumer(), rabbitMq.getProducer() ];
    const requestQueue = env.rabbitmq.queue.req.authFacebook;
    const responseQueue = env.rabbitmq.queue.res.authFacebook;

    consumer.assertQueue(requestQueue, { durable: true });
    consumer.consume(requestQueue, async (message) => {
        consumer.ack(message);
        
        const { properties: { correlationId }, content } = message;
        logger.info(`Received request for correlationId: ${correlationId}`);
        const data = JSON.parse(content.toString());
        
        const result = await action({ ...data, correlationId });

        logger.info(`${correlationId}: Sending result to queue ${responseQueue}`);
        producer.assertQueue(responseQueue, { durable: true });
        producer.sendToQueue(responseQueue, Buffer.from(JSON.stringify(result)), { correlationId });
    });
};