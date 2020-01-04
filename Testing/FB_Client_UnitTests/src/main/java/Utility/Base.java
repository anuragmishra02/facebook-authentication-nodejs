package Utility;

import java.lang.reflect.Field;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.PageFactory;

import pageObjects.TestPage;

public class Base<T> {
	
  public WebElement getElement(Class<T> className,String ele,WebDriver driver) throws NoSuchFieldException, SecurityException, IllegalArgumentException, IllegalAccessException 
	{
		System.out.println("@@@@@@@@@@@"+ele);
		T t =(T) PageFactory.initElements(driver, className);
		//Field ele1=t.getClass().get;
		//TestPage testPage = PageFactory.initElements(driver, TestPage.class);
		System.out.println(t);
		
		
//		System.out.println(ele1.get(ele));
//		System.out.println("@@@@@@@@@@@"+ele1);
		return null;
	}
	
//	
//	public static void main(String[] args) throws NoSuchFieldException, SecurityException {
//		Base<TestPage> b= new Base<TestPage>();
//		System.setProperty("webdriver.gecko.driver", "C:\\Selenium\\Workspace\\StackerMaven2\\geckodriver.exe");
//		WebDriver driver= new FirefoxDriver();
//		System.out.println("@@@@@@@@@@@");
//		b.getElement(TestPage.class, "article1", driver);
//	}
	}

