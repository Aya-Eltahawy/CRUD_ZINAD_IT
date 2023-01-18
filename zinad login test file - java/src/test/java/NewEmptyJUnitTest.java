import static org.junit.Assert.assertTrue;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;

public class NewEmptyJUnitTest {

  @Test
  public void hello() throws InterruptedException {
      System.setProperty("webdriver.chrome.driver","C:\\Users\\Ali\\Desktop\\selenium\\chromedriver.exe");
       WebDriver driver  = new ChromeDriver();
       String server = "http://localhost:";
       String port = "4200";
	 driver.get(server+port);
      WebElement username = driver.findElement(By.id("email"));
      WebElement password = driver.findElement(By.id("password"));
      
      username.sendKeys("admin@zinad-news.com");
      password.sendKeys("password");
      driver.findElement(By.id("submit")).click();
            Thread.sleep(2000);
      assertTrue(driver.getCurrentUrl().equals(server+port+"/news"));
          

  }
}  
