const amqp = require("amqplib");

class RabbitMQ {

    constructor() {        
        this.amqpServer = null;
        this.producer = null;
        this.consumer = null;
    }    

    async config(server) {
        const connection = await amqp.connect(server);
        this.producer = await connection.createChannel();
        this.consumer = await connection.createChannel();        
    }

    getConsumer(){
        return this.consumer;
    }

    getProducer(){
        return this.producer;
    }
}

module.exports = new RabbitMQ();