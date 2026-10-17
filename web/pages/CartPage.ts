import { Page, Locator } from 'playwright';

export class CartPage {
  readonly cartItems: Locator;
  readonly itemNames: Locator;
  readonly itemPrices: Locator;
  readonly checkoutButton: Locator;
  readonly removeButtons: Locator;
  readonly continueShopping: Locator;

  constructor(private readonly page: Page) {
    this.cartItems = page.locator('.cart_item');
    this.itemNames = page.locator('.cart_item .inventory_item_name');
    this.itemPrices = page.locator('.cart_item .inventory_item_price');
    this.checkoutButton = page.locator('#checkout');
    this.removeButtons = page.locator('.cart_item button:has-text("Remove")');
    this.continueShopping = page.locator('#continue-shopping');
  }

  async itemCount(): Promise<number> {
    return this.cartItems.count();
  }

  async getItemNames(): Promise<string[]> {
    const names = await this.itemNames.allTextContents();
    return names.map((n) => n.trim());
  }

  async getItemPrices(): Promise<string[]> {
    const prices = await this.itemPrices.allTextContents();
    return prices.map((p) => p.trim());
  }

  async removeFirst(): Promise<void> {
    await this.removeButtons.first().click();
  }

  async removeByName(name: string): Promise<void> {
    const item = this.cartItems.filter({ has: this.page.locator('.inventory_item_name', { hasText: name }) });
    await item.locator('button:has-text("Remove")').click();
  }

  async checkout(): Promise<void> {
    await this.checkoutButton.click();
  }

  async continueShopping(): Promise<void> {
    await this.continueShopping.click();
  }

  async isOnCart(): Promise<boolean> {
    return this.page.url().includes('/cart.html');
  }
}
