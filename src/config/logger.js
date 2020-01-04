const chalk = require("chalk").default;
const { createLogger, format, transports } = require("winston");

const winstonLogger = createLogger({
    format: format.combine(
        format.json(),
        format.timestamp(),
        format.printf((info) => {            
            if(typeof info.message === "object"){
                return `${info.timestamp}__${info.message.userId}: ${typeof info.message.msg === "string" ? info.message.msg: JSON.stringify(info.message.msg)}`;
            }
            else{
                return `${info.timestamp}: ${info.message}`;
            }            
        })
    ),
    transports: [
        new transports.Console()
    ]
});

module.exports = winstonLogger;