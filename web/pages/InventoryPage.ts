import { Page, Locator } from 'playwright';

export class InventoryPage {
  readonly title: Locator;
  readonly items: Locator;
  readonly itemNames: Locator;
  readonly itemPrices: Locator;
  readonly sortContainer: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;

  constructor(private readonly page: Page) {
    this.title = page.locator('.title');
    this.items = page.locator('.inventory_item');
    this.itemNames = page.locator('.inventory_item_name');
    this.itemPrices = page.locator('.inventory_item_price');
    this.sortContainer = page.locator('.product_sort_container');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('.shopping_cart_link');
  }

  async getTitle(): Promise<string> {
    return (await this.title.textContent())?.trim() ?? '';
  }

  async itemCount(): Promise<number> {
    return this.items.count();
  }

  async getItemNames(): Promise<string[]> {
    const names = await this.itemNames.allTextContents();
    return names.map((n) => n.trim());
  }

  async getItemPrices(): Promise<string[]> {
    const prices = await this.itemPrices.allTextContents();
    return prices.map((p) => p.trim());
  }

  async sortBy(value: string): Promise<void> {
    await this.sortContainer.selectOption(value);
  }

  async addItemByName(name: string): Promise<void> {
    const item = this.items.filter({ has: this.page.locator('.inventory_item_name', { hasText: name }) });
    await item.locator('button:has-text("Add to cart"), button[id^="add-to-cart"]').click();
  }

  async removeItemByName(name: string): Promise<void> {
    const item = this.items.filter({ has: this.page.locator('.inventory_item_name', { hasText: name }) });
    await item.locator('button:has-text("Remove"), button[id^="remove"]').click();
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }

  async getCartBadgeCount(): Promise<number | null> {
    if (await this.cartBadge.count() === 0) return null;
    const t = await this.cartBadge.textContent();
    return t ? parseInt(t.trim(), 10) : null;
  }

  async isOnInventory(): Promise<boolean> {
    return this.page.url().includes('/inventory.html');
  }

  async waitForInventoryLoaded(): Promise<void> {
    await this.page.waitForURL('**/inventory.html');
    await this.title.waitFor({ state: 'visible' });
    await this.items.first().waitFor({ state: 'visible' }).catch(() => {});
    await this.page.waitForTimeout(500);
  }
}
