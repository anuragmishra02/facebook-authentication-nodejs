package stepDefinitions;

import java.io.FileInputStream;
import java.util.Properties;

import org.json.JSONObject;
import org.testng.Assert;

import com.rabbitmq.client.AMQP;
import com.rabbitmq.client.AMQP.BasicProperties;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;
import com.rabbitmq.client.DeliverCallback;

import cucumber.api.java.en.Given;
import cucumber.api.java.en.Then;

public class APIStepDefns {
	private static final String REQ_QUEUE_NAME = "@request/authUser_Facebook";
	private static final String RES_QUEUE_NAME = "@response/authUser_Facebook";
	public static Properties CONFIG;
	static String message;

	@cucumber.api.java.Before
	public static void initializationMethod() throws Exception {

		System.out.println("Executing initialization method");
		CONFIG = new Properties();
		FileInputStream CONFIG_FIS = new FileInputStream(System.getProperty("user.dir") + "/CONFIG.properties");
		CONFIG.load(CONFIG_FIS);
	}

	@Given("^I send a Request With ([^\\\\\\\"]*) Input$")
	public void RequestWithRabbitMQ(String input) throws Exception {

		if (input.equalsIgnoreCase("BothValid")) {
			message = CONFIG.getProperty("BothValid");
		} else if (input.equalsIgnoreCase("InvalidAccessToken")) {
			message = CONFIG.getProperty("InvalidAccessToken");
		} else if (input.equalsIgnoreCase("InvalidSignedRequest")) {
			message = CONFIG.getProperty("InvalidSignedRequest");
		} else if (input.equalsIgnoreCase("BothInvalid")) {
			message = CONFIG.getProperty("BothInvalid");
		}
		// TODO Auto-generated method stub
		ConnectionFactory factory = new ConnectionFactory();
		// factory.useSslProtocol();
		factory.setUsername("guest");
		factory.setPassword("guest");
		factory.setVirtualHost("/");
		factory.setHost("localhost");
		factory.setPort(5672);
		factory.setUri("amqp://localhost:5672");

		Connection connection = factory.newConnection();
		Channel channel = connection.createChannel();
		String corrId = java.util.UUID.randomUUID().toString();
		BasicProperties props = new AMQP.BasicProperties().builder().correlationId(corrId).build();
		channel.queueDeclare(REQ_QUEUE_NAME, true, false, false, null);
		channel.basicPublish("", REQ_QUEUE_NAME, props, message.getBytes());
		System.out.println(" [x] Producer : sent '" + message + "'");

		channel.close();
		connection.close();
	}

	@Then("^I get Response For ValidInput$")
	public void ResponseFromRabbitMQ() throws Exception {

		ConnectionFactory factory = new ConnectionFactory();
		factory.setHost("localhost");
		Connection connection = factory.newConnection();
		Channel channel = connection.createChannel();

		// configure message queues as durable
		boolean durable = true;

		channel.queueDeclare(RES_QUEUE_NAME, durable, false, false, null);
		System.out.println(" [*] Consumer : waiting for messages. To exit press CTRL+C");
		DeliverCallback deliverCallback = (consumerTag, delivery) -> {
			String message = new String(delivery.getBody(), "UTF-8");
			System.out.println(" [x] Received '" + message + "'");
			JSONObject jsonObj = new JSONObject(message);
			String error = jsonObj.getString("error");
			Assert.assertEquals("null", error);
		};
		channel.basicConsume(RES_QUEUE_NAME, true, deliverCallback, consumerTag -> {
		});
	}

	@Then("^I get Response For InvalidInputs$")
	public void ResponseFromRabbitMQForInvalid() throws Exception {

		ConnectionFactory factory = new ConnectionFactory();
		factory.setHost("localhost");
		Connection connection = factory.newConnection();
		Channel channel = connection.createChannel();

		// configure message queues as durable
		boolean durable = true;

		channel.queueDeclare(RES_QUEUE_NAME, durable, false, false, null);
		System.out.println(" [*] Consumer : waiting for messages. To exit press CTRL+C");
		DeliverCallback deliverCallback = (consumerTag, delivery) -> {
			String message = new String(delivery.getBody(), "UTF-8");
			System.out.println(" [x] Received '" + message + "'");
			JSONObject jsonObj = new JSONObject(message.toString());
			String data = jsonObj.getString("data");
			Assert.assertEquals("null", data);
		};
		channel.basicConsume(RES_QUEUE_NAME, true, deliverCallback, consumerTag -> {
		});

	}

}
