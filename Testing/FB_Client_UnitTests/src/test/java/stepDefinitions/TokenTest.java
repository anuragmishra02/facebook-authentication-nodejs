package stepDefinitions;

import com.jayway.restassured.RestAssured;
import com.jayway.restassured.http.ContentType;
import com.jayway.restassured.response.Response;
import com.jayway.restassured.specification.RequestSpecification;



import java.util.Map;


public class TokenTest {
	Response respbody;
	   RequestSpecification rs= RestAssured.given().contentType(ContentType.URLENC.withCharset("UTF-8"));

	    public Response postrequest(String baseurl,Map<String,String>headers,String body) 
	    {
	    	//respbody= rs.config(RestAssured.config().sslConfig(new SSLConfig().allowAllHostnames())).headers(headers).body(body).when().post(baseurl).then().assertThat().statusCode(401);
		  
	        respbody= rs.formParam("fbUID", "103612127401078").formParam("inputAccessToken", "EAAITchdShlkBAKmvMcHB7jMPOudZBCTZCtkLQyeb79c7Ntr1ZASwJHcMqD4yh3xvB9SH5eW2Rz8CO9PSpwyXmgBoKP7L7EOjID9yZApAGZA7gq1xhQMaRWjF6HDUpRxoz3R25fvp4tpR8H0YLq5wpE1QE5wZAN6ANrEbo3g5lHSBqoQ6trR1mf7aF7RYNsd2FcwZC64YiBZC8kWUZC9aZCxDHS2ilhoevldsPDUFCoZB6rrkm7mRuavd3Af").formParam("emailId", "oiqicjshsq_1547104919@tfbnw.net").when().post(baseurl);
	        
	        
	        System.out.println("response body is "+respbody);
	        return respbody;
	    }
	    
	    public int getResponsecode()
	    {
//	    	int code=200;
//	    	return code;
	    	return respbody.getStatusCode();
	    }
}
