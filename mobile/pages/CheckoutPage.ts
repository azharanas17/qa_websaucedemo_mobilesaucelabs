import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  constructor(driver: any) {
    super(driver);
  }

  async isInfoDisplayed(): Promise<boolean> {
    try {
      await this.driver.$("//*[@text='CHECKOUT: INFORMATION']").waitForExist({ timeout: 10000 });
      return true;
    } catch (e) {
      return false;
    }
  }

  async isOverviewDisplayed(): Promise<boolean> {
    try {
      await this.driver.$("//*[@text='CHECKOUT: OVERVIEW']").waitForExist({ timeout: 15000 });
      return true;
    } catch (e) {
      return false;
    }
  }

  async isCompleteDisplayed(): Promise<boolean> {
    try {
      await this.driver.$("//*[@text='CHECKOUT: COMPLETE!']").waitForExist({ timeout: 10000 });
      return true;
    } catch (e) {
      return false;
    }
  }

  async enterInfo(firstName: string, lastName: string, zip: string): Promise<void> {
    const fn = await this.driver.$("//*[@content-desc='test-First Name']");
    await fn.waitForExist({ timeout: 10000 });
    await fn.setValue(firstName);
    const ln = await this.driver.$("//*[@content-desc='test-Last Name']");
    await ln.setValue(lastName);
    const z = await this.driver.$("//*[@content-desc='test-Zip/Postal Code']");
    await z.setValue(zip);
  }

  async continueToOverview(): Promise<void> {
    await this.hideKeyboardIfVisible();
    const selector = "//*[@content-desc='test-CONTINUE']";
    await this.scrollIntoView(selector, { maxScrolls: 2 });
    const element = await this.driver.$(selector);
    await element.click();
  }

  async finish(): Promise<void> {
    await this.tapWhenVisible("//*[@content-desc='test-FINISH']", 10000);
  }
}
