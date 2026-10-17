import { When, Then } from '@cucumber/cucumber';
import { strict as assert } from 'node:assert';
import { CustomWorld } from '../world';

When('the user proceeds to checkout', async function (this: CustomWorld) {
  await this.cartPage.checkout();
  await this.page.waitForTimeout(1000);
});

When(
  'the user fills checkout information with first name {string}, last name {string}, postal code {string}',
  async function (this: CustomWorld, first: string, last: string, zip: string) {
    await this.checkoutPage.fillInfo(first, last, zip);
  },
);

When('the user continues to overview', async function (this: CustomWorld) {
  await this.checkoutPage.continue();
});

When('the user finishes the order', async function (this: CustomWorld) {
  await this.page.waitForTimeout(500);
  await this.checkoutPage.finish();
});

Then('the order summary should be displayed', async function (this: CustomWorld) {
  await this.page.waitForTimeout(1000);
  const total = await this.checkoutPage.getTotal();
  assert.ok(total.length > 0);
});

Then('the checkout error message should be {string}', async function (this: CustomWorld, expected: string) {
  const err = await this.checkoutPage.getError();
  assert.equal(err, expected);
});

Then('the order confirmation should show {string}', async function (this: CustomWorld, expected: string) {
  await this.page.waitForTimeout(1500);
  const header = await this.checkoutPage.getCompleteHeader();
  assert.equal(header, expected);
});
