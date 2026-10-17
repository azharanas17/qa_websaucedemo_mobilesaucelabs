import { Given, When, Then } from '@cucumber/cucumber';
import { strict as assert } from 'node:assert';
import { CustomWorld } from '../world';

When('the user sorts products by {string}', async function (this: CustomWorld, sort: string) {
  await this.inventoryPage.sortBy(sort);
});

Then('the inventory should show at least one product', async function (this: CustomWorld) {
  const count = await this.inventoryPage.itemCount();
  assert.ok(count > 0, 'Expected at least one product');
});

Then('product names and prices should be visible', async function (this: CustomWorld) {
  const names = await this.inventoryPage.getItemNames();
  const prices = await this.inventoryPage.getItemPrices();
  assert.ok(names.length > 0);
  assert.ok(prices.length > 0);
  assert.ok(names[0].length > 0);
  assert.ok(prices[0].length > 0);
});

Then('product names should be in ascending order', async function (this: CustomWorld) {
  const names = await this.inventoryPage.getItemNames();
  const sorted = [...names].sort((a, b) => a.localeCompare(b));
  assert.deepEqual(names, sorted);
});

Then('product names should be in descending order', async function (this: CustomWorld) {
  const names = await this.inventoryPage.getItemNames();
  const sorted = [...names].sort((a, b) => b.localeCompare(a));
  assert.deepEqual(names, sorted);
});

Then('product prices should be in ascending order', async function (this: CustomWorld) {
  const prices = await this.inventoryPage.getItemPrices();
  const nums = prices.map((p) => parseFloat(p.replace('$', '')));
  const sorted = [...nums].sort((a, b) => a - b);
  assert.deepEqual(nums, sorted);
});

Then('product prices should be in descending order', async function (this: CustomWorld) {
  const prices = await this.inventoryPage.getItemPrices();
  const nums = prices.map((p) => parseFloat(p.replace('$', '')));
  const sorted = [...nums].sort((a, b) => b - a);
  assert.deepEqual(nums, sorted);
});
