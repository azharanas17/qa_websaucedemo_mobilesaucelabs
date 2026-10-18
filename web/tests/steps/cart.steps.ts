import { When, Then } from '@cucumber/cucumber';
import { strict as assert } from 'node:assert';
import { CustomWorld } from '../world';

When('the user adds {string} to the cart', async function (this: CustomWorld, name: string) {
  await this.inventoryPage.addItemByName(name);
});

When('the user opens the cart', async function (this: CustomWorld) {
  await this.inventoryPage.openCart();
  await this.page.waitForURL('**/cart.html');
});

When('the user removes {string} from the cart', async function (this: CustomWorld, name: string) {
  await this.cartPage.removeByName(name);
});

Then('the cart badge should show {string}', async function (this: CustomWorld, count: string) {
  const badge = await this.inventoryPage.getCartBadgeCount();
  assert.equal(badge?.toString(), count);
});

Then('the cart should contain {string}', async function (this: CustomWorld, name: string) {
  await this.page.waitForURL('**/cart.html');
  await this.page.waitForTimeout(500);
  const names = await this.cartPage.getItemNames();
  assert.ok(names.some((n) => n.includes(name)), `Expected cart to contain ${name}, got ${names}`);
});

Then('the cart should not contain {string}', async function (this: CustomWorld, name: string) {
  const names = await this.cartPage.getItemNames();
  assert.ok(!names.some((n) => n.includes(name)));
});
