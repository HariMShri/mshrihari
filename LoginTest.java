package login;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.annotations.*;

public class LoginTest {
    WebDriver driver;

    @BeforeClass
    public void setup() {
        System.setProperty("webdriver.chrome.driver", "path/to/chromedriver"); // Set path if needed
        driver = new ChromeDriver();
        driver.manage().window().maximize();
    }

    @Test(priority = 1)
    public void testValidLogin() {
        driver.get("https://example.com/login");
        WebElement username = driver.findElement(By.id("username"));
        WebElement password = driver.findElement(By.id("password"));
        WebElement loginBtn = driver.findElement(By.id("loginButton"));

        username.sendKeys("admin");
        password.sendKeys("admin123");
        loginBtn.click();

        // Validate login by checking presence of logout button
        WebElement logout = driver.findElement(By.id("logoutButton"));
        assert logout.isDisplayed();
    }

    @Test(priority = 2)
    public void testInvalidLogin() {
        driver.get("https://example.com/login");
        driver.findElement(By.id("username")).sendKeys("wronguser");
        driver.findElement(By.id("password")).sendKeys("wrongpass");
        driver.findElement(By.id("loginButton")).click();

        WebElement errorMsg = driver.findElement(By.id("error"));
        assert errorMsg.isDisplayed();
    }

    @AfterClass
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
