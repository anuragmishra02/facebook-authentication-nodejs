const fs = require("fs");

const variables = {    
    FBAPP_ID: "FBAPP_ID",
    FBAPP_SECRET: "FBAPP_SECRET",
    FBAPP_NAME: "FBAPP_NAME",
    FBGRAPH_URL: "FBGRAPH_URL",
    FBGRAPH_VERSION: "FBGRAPH_VERSION",
    AMPQ_Url: "AMPQ_Url",
    AMPQ_Queue_Req_AuthFacebook: "AMPQ_Queue_Req_AuthFacebook",
    AMPQ_Queue_Res_AuthFacebook: "AMPQ_Queue_Res_AuthFacebook",
};

class Env {

    constructor(){
        this.value = {
            facebook: {
                appId: null,
                appSecret: null,
                appName: null,
                graphUrl: null,
                graphVersion: null
            },
            rabbitmq: {
                server: null,
                queue: {
                    req: { authFacebook: null },
                    res: { authFacebook: null }
                }
            }
        };
    }

    updateEnv(key, value){
        switch(key){
            case variables.AMPQ_Queue_Req_AuthFacebook:
                this.value.rabbitmq.queue.req.authFacebook = value;
                break;
            case variables.AMPQ_Queue_Res_AuthFacebook:
                this.value.rabbitmq.queue.res.authFacebook = value;
                break;
            case variables.AMPQ_Url:
                this.value.rabbitmq.server = value;
                break;
            case variables.FBAPP_ID:
                this.value.facebook.appId = value;
                break;
            case variables.FBAPP_NAME:
                this.value.facebook.appName = value;
                break;
            case variables.FBAPP_SECRET:
                this.value.facebook.appSecret = value;
                break;
            case variables.FBGRAPH_URL:
                this.value.facebook.graphUrl = value;
                break;
            case variables.FBGRAPH_VERSION:
                this.value.facebook.graphVersion = value;
                break;    
            default:
                return null;
        }
    }

    parse(){
        Object.keys(variables).forEach((envKey) => {
            const envValue = process.env[envKey];
            if(envValue === null || envValue === void(0)){
                throw `${envKey} is undefined in process.env. 
If the application is started in local environment please add it in the .env file. 
The list of variables with values(dev) is provided in readme file.
`;
            }
            else if(typeof envValue === "string" && envValue.trim().length === 0){
                throw `${envKey} is undefined in process.env. 
If the application is started in local environment please add it in the .env file. 
The list of variables with values(dev) is provided in readme file.
`;
            }
            else{
                this.updateEnv(envKey, envValue);
            }
        });
    }

    getEnv(){
        return {...this.value};
    }    
}

module.exports = new Env();