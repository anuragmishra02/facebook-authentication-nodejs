const base64url = require('base64url');
const axios = require("axios").default;
const { logger } = require("../config/logger");
// const { createLogger, format, transports } = require('winston');

// const logger = createLogger({
//   level: 'info',
//   format: format.combine(format.colorize(), format.simple()),
//   transports: [new transports.Console()]
// });


function parseSignedRequest(signedRequest) {


    if (signedRequest !== null & signedRequest !== "") {
        let encodeSignAndPayload = signedRequest.split(".");
        logger.info(encodeSignAndPayload[0]);
        let decodedSign = base64url.decode(encodeSignAndPayload[0]);
        let decodedPayload = base64url.decode(encodeSignAndPayload[1]);
        let authCode = JSON.parse(decodedPayload).code;
        logger.info(authCode);
        let returnVal =null;
        returnVal = axios.get("https://graph.facebook.com/v3.2/oauth/access_token?client_id=584330691905113&redirect_uri=http://localhost:3103/&client_secret=d3cc53807627810d795f84aaff7d44a3&code=AQB6OIpFCViFaitGcSIFdtp2DSnvNvLz2B1JUUxvEYMN1pTwmN42dcFj-R3-k7ULZ1xeoDDzOq3jCyjaacM1EnAfPShzJhjwWMa8TCCJ5RT2p4WqzZuJ1e_L0MS5BQ33QKO-_Of8g9lqV2hmBbpk6avNboXlkCR5QBjygqtWVVwLFDJ0uYjVI9yadba-IHf2gH4SSAIXSHbQLqGTvUcMo2GlQnlK1uVMgyGGfdrmjbXTova7vRP8D5Ac3r8jmLBr7WQm32AQ0hzhD4YDjj7ddXaBNXZ5Jd6ynuHRy27nr_Z2KJbbGdTnKf0vvgQmFHgXAeIW-AQkrjCRTV89132u4pSV")
            .catch(e => {
                logger.info(e.response.data);
                let errorMsg = e.response.data.error.message;
                logger.info(e.response.data.error.message);
                if (errorMsg === "This authorization code has expired.") {
                    logger.info("expired >>>")
             return errorMsg;
                } else {
                    return JSON.parse(decodedPayload).user_id;
                }
            });
            return returnVal;
    }


}

// function getdata() {
//     // try {
//     axios.get("https://graph.facebook.com/v3.2/oauth/access_token?client_id=584330691905113&redirect_uri=http://localhost:3103/&client_secret=d3cc53807627810d795f84aaff7d44a3&code=AQAnD2FmgHuU1gADzHL21Cq7ZJVTNhUF55t1JvoK0CaxN220i-1c_p6JiVAM3Idtin9C5ipZUkVKw_eQ1Ne6zkGnD2u7I3DPqgmrfuK87upS2zjQjdfuZKfE65aSqW7EHL-G_f8wzV_kRai8WBNTyjt-QLprRKhc7nJ1s81_2_pGCLeAOc1yakDFKC2TaXSE21N4VECgmD3HQr5JBlt7tH_D0mEvPYTOrgwfN-MJVZk43tvgzzOSjNaKc2MyO9rUdkf1MYc8I5rGkjdoTbbjW-6bjdncdXI9FbNe_FaRSnV1oDYC2cA0XkiT4i9IDnKhxuzVYpTYkNOvwDU197ntd2X8")
//         .catch(e => {
//             console.log(e.response.data);
//         });

//     // } catch (ex) {
//     //     console.log(ex.response)
//     // }
// }
var sign ="zlIkWIwM-mUFPAxKq_D3fsbO4VxltRYw-o9IWWSiOAA.eyJhbGdvcml0aG0iOiJITUFDLVNIQTI1NiIsImNvZGUiOiJBUUI2T0lwRkNWaUZhaXRHY1NJRmR0cDJEU252TnZMejJCMUpVVXh2RVlNTjFwVHdtTjQyZGNGai1SMy1rN1VMWjF4ZW9ERHpPcTNqQ3lqYWFjTTFFbkFmUFNoekpoandXTWE4VENDSjVSVDJwNFdxelp1SjFlX0wwTVM1QlEzM1FLTy1fT2Y4ZzlscVYyaG1CYnBrNmF2TmJvWGxrQ1I1UUJqeWdxdFdWVndMRkRKMHVZalZJOXlhZGJhLUlIZjJnSDRTU0FJWFNIYlFMcUdUdlVjTW8yR2xRbmxLMXVWTWd5R0dmZHJtamJYVG92YTd2UlA4RDVBYzNyOGptTEJyN1dRbTMyQVEwaHpoRDRZRGpqN2RkWGFCTlhaNUpkNnludUhSeTI3bnJfWjJLSmJiR2RUbktmMHZ2Z1FtRkhnWEFlSVctQVFrcmpDUlRWODkxMzJ1NHBTViIsImlzc3VlZF9hdCI6MTU0Nzc5MTA4MywidXNlcl9pZCI6IjE5Njc5MjMzNzY2MDE5OTAifQ";
parseSignedRequest(sign).then((value)=>{
    logger.info(value )
});
