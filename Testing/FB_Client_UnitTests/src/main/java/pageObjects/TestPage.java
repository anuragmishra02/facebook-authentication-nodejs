package pageObjects;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.How;

public class TestPage 
{
	 WebDriver driver;
	 
	 @FindBy(how = How.XPATH, using = "//div[@class='live-zoom-image'][position()=1]")
	 
	 public WebElement article1;
	 
	@FindBy(how = How.XPATH, using = "pwd")
	 
	 public WebElement txtbx_Password;
	 

	@FindBy(how = How.NAME, using = "submit")
	 
	 public WebElement btn_Login ;
	 
	// This is a constructor, as every page need a base driver to find web elements
	 
	public void LogIn_PG_POF(WebDriver driver){ 
	 
	    this.driver = driver; 
	 
	    } 

}
