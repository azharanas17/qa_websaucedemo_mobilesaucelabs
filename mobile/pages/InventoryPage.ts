import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
  constructor(driver: any) {
    super(driver);
  }

  async isDisplayed(): Promise<boolean> {
    try {
      await this.driver.$("//*[@text='PRODUCTS']").waitForExist({ timeout: 15000 });
      return true;
    } catch (e) {
      return false;
    }
  }

  async openCart(): Promise<void> {
    const el = await this.driver.$("//*[@content-desc='test-Cart']");
    await el.waitForExist({ timeout: 10000 });
    await el.click();
  }

  async getCartBadgeCount(): Promise<number> {
    try {
      const badges = await this.driver.$$(
        "//*[@content-desc='test-Cart']//android.widget.TextView"
      );
      for (const badge of badges) {
        const text = (await badge.getText()).trim();
        if (/^\d+$/.test(text)) {
          return parseInt(text, 10);
        }
      }
    } catch (e) {
      // ignore and fall through to 0
    }
    return 0;
  }

  async isCartBadgeVisible(): Promise<boolean> {
    const count = await this.getCartBadgeCount();
    return count > 0;
  }

  async addFirstProductToCart(): Promise<void> {
    const el = await this.driver.$("(//*[@content-desc='test-ADD TO CART'])[1]");
    await el.waitForExist({ timeout: 10000 });
    await el.click();
  }

  async removeFirstProductFromCart(): Promise<void> {
    try {
      const el = await this.driver.$("//*[@content-desc='test-REMOVE']");
      if (await el.waitForExist({ timeout: 5000 })) {
        await el.click();
      }
    } catch (e) {
      // ignore
    }
  }
}
