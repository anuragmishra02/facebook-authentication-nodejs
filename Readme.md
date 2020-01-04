### Environment variables

```
# RabbitMQ
AMPQ_Url=amqp://localhost
AMPQ_Queue_Req_AuthFacebook=@request/authUser_Facebook
AMPQ_Queue_Res_AuthFacebook=@response/authUser_Facebook

# Facebook
FBAPP_ID=584330691905113
FBAPP_NAME="Test App"
FBAPP_SECRET=d3cc53807627810d795f84aaff7d44a3
FBGRAPH_URL=https://graph.facebook.com
FBGRAPH_VERSION=v3.2
```

### Starting the application

- Install dependancies

```bash
npm install
```

- Start the application

```
npm start
```