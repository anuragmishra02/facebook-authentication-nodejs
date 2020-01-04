package MyRunner;

import java.io.IOException;

import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.runner.RunWith;

import com.cucumber.listener.ExtentProperties;

import cucumber.api.CucumberOptions;
import cucumber.api.junit.Cucumber;



	@RunWith(Cucumber.class)
	@CucumberOptions(
			features = "Features", //the path of the feature files
			glue= {"BaseClass","stepDefinitions","MyRunner"}, //the path of the step definition files	
			plugin = {"pretty", "junit:target/cucumber-reports/Cucumber.xml"},//the path to generate report in html format "com.cucumber.listener.ExtentCucumberFormatter:output/report.html",
			tags= {"@APITest1"})
	
	public class TestRunner{
		
		
		@BeforeClass
		public static void setup() throws IOException
		{
			ExtentProperties extentProperties = ExtentProperties.INSTANCE;
			extentProperties.setReportPath("output/myreport.html");	
		}
		@AfterClass
		 public static void writeExtentReport() throws Exception{
			
			//com.cucumber.listener.Reporter.loadXMLConfig(new File( System.getProperty("user.dir")+"/extent-config.xml"));
			//com.cucumber.listener.Reporter.setTestRunnerOutput("Sample test runner output message");
			//format={"json:target/Destination/cucumber.json"}
		 }	
		
		
		
		
	}
