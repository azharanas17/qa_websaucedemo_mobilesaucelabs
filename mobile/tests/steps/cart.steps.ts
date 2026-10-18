import { Given, When, Then } from '@cucumber/cucumber';
import { MobileWorld } from '../world';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
import assert from 'assert';

When('I open the cart', async function (this: MobileWorld) {
  const inventoryPage = new InventoryPage(this.driver);
  await inventoryPage.openCart();
});

Then('I should see the cart screen', async function (this: MobileWorld) {
  const cartPage = new CartPage(this.driver);
  const displayed = await cartPage.isDisplayed();
  assert(displayed, 'Cart screen should be displayed');
});

When('I continue shopping', async function (this: MobileWorld) {
  const cartPage = new CartPage(this.driver);
  await cartPage.continueShopping();
});

When('I proceed to checkout', async function (this: MobileWorld) {
  const cartPage = new CartPage(this.driver);
  await cartPage.proceedToCheckout();
});

Given('I have proceeded to checkout', async function (this: MobileWorld) {
  const inventoryPage = new InventoryPage(this.driver);
  await inventoryPage.openCart();
  const cartPage = new CartPage(this.driver);
  await cartPage.proceedToCheckout();
  const checkoutPage = new CheckoutPage(this.driver);
  const displayed = await checkoutPage.isInfoDisplayed();
  assert(displayed, 'Checkout info screen should be displayed');
});
