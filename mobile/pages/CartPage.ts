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
    const el = await this.driver.$("//*[@content-desc='test-CONTINUE SHOPPING']");
    await el.waitForExist({ timeout: 10000 });
    await el.click();
  }

  async proceedToCheckout(): Promise<void> {
    const el = await this.driver.$("//*[@content-desc='test-CHECKOUT']");
    await el.waitForExist({ timeout: 10000 });
    if (!(await el.isDisplayed().catch(() => false))) {
      await this.swipeUp();
      await this.driver.pause(500);
    }
    await el.click();
  }
}
