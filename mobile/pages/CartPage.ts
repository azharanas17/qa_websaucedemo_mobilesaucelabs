import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  constructor(driver: any) {
    super(driver);
  }

  async isDisplayed(): Promise<boolean> {
    try {
      await this.driver.$("//*[@text='YOUR CART']").waitForExist({ timeout: 10000 });
      return true;
    } catch (e) {
      return false;
    }
  }

  async continueShopping(): Promise<void> {
    const selector = "//*[@content-desc='test-CONTINUE SHOPPING']";
    await this.scrollIntoView(selector);
    const element = await this.driver.$(selector);
    await element.click();
  }

  async proceedToCheckout(): Promise<void> {
    const selector = "//*[@content-desc='test-CHECKOUT']";
    await this.scrollIntoView(selector);
    const element = await this.driver.$(selector);
    await element.click();
  }
}
