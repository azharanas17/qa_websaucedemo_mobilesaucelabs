import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  private usernameSelector = "//*[@content-desc='test-Username']";
  private passwordSelector = "//*[@content-desc='test-Password']";
  private loginSelector = "//*[@content-desc='test-LOGIN']";
  private errorSelector = "//*[@content-desc='test-Error message']";

  constructor(driver: any) {
    super(driver);
  }

  async isDisplayed(): Promise<boolean> {
    try {
      await this.driver.$(this.usernameSelector).waitForExist({ timeout: 10000 });
      return true;
    } catch (e) {
      return false;
    }
  }

  async enterUsername(username: string): Promise<void> {
    const el = await this.driver.$(this.usernameSelector);
    await el.waitForExist({ timeout: 10000 });
    await el.setValue(username);
  }

  async enterPassword(password: string): Promise<void> {
    const el = await this.driver.$(this.passwordSelector);
    await el.waitForExist({ timeout: 10000 });
    await el.setValue(password);
  }

  async clickLogin(): Promise<void> {
    const el = await this.driver.$(this.loginSelector);
    await el.waitForExist({ timeout: 10000 });
    await el.click();
  }

  async login(username: string, password: string): Promise<void> {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLogin();
  }

  async getErrorMessage(): Promise<string> {
    try {
      const container = await this.driver.$(this.errorSelector);
      await container.waitForExist({ timeout: 8000 });
      const children = await container.$$('//android.widget.TextView');
      if (children.length > 0) {
        return (await children[0].getText()).trim();
      }
      return (await container.getText()).trim();
    } catch (e) {
      return '';
    }
  }
}
