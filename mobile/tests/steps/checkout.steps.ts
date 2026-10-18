import { Given, When, Then } from '@cucumber/cucumber';
import { MobileWorld } from '../world';
import { CheckoutPage } from '../../pages/CheckoutPage';
import assert from 'assert';

When('I fill in checkout information with first name {string}, last name {string}, zip {string}', async function (this: MobileWorld, firstName: string, lastName: string, zip: string) {
  const checkoutPage = new CheckoutPage(this.driver);
  await checkoutPage.enterInfo(firstName, lastName, zip);
});

When('I continue to checkout overview', async function (this: MobileWorld) {
  const checkoutPage = new CheckoutPage(this.driver);
  await checkoutPage.continueToOverview();
});

Then('I should see the checkout information screen', async function (this: MobileWorld) {
  const checkoutPage = new CheckoutPage(this.driver);
  const displayed = await checkoutPage.isInfoDisplayed();
  assert(displayed, 'Checkout info screen should be displayed');
});

Then('I should see the checkout overview screen', async function (this: MobileWorld) {
  const checkoutPage = new CheckoutPage(this.driver);
  const displayed = await checkoutPage.isOverviewDisplayed();
  assert(displayed, 'Checkout overview screen should be displayed');
});

When('I finish checkout', async function (this: MobileWorld) {
  const checkoutPage = new CheckoutPage(this.driver);
  await checkoutPage.finish();
});

Then('I should see the checkout complete screen', async function (this: MobileWorld) {
  const checkoutPage = new CheckoutPage(this.driver);
  const displayed = await checkoutPage.isCompleteDisplayed();
  assert(displayed, 'Checkout complete screen should be displayed');
});
