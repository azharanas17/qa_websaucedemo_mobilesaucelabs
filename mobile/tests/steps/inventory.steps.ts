import { Given, When, Then } from '@cucumber/cucumber';
import { MobileWorld } from '../world';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';
import assert from 'assert';

Given('I am logged in on mobile as {string}', async function (this: MobileWorld, username: string) {
  const loginPage = new LoginPage(this.driver);
  await loginPage.login(username, 'secret_sauce');
  const inventoryPage = new InventoryPage(this.driver);
  const displayed = await inventoryPage.isDisplayed();
  assert(displayed, 'Products screen should be displayed after login');
});

Given('I am on the mobile products screen', async function (this: MobileWorld) {
  const inventoryPage = new InventoryPage(this.driver);
  const displayed = await inventoryPage.isDisplayed();
  assert(displayed, 'Products screen should be displayed');
});

When('I add the first product to cart', async function (this: MobileWorld) {
  const inventoryPage = new InventoryPage(this.driver);
  await inventoryPage.addFirstProductToCart();
});

When('I remove the first product from cart', async function (this: MobileWorld) {
  const inventoryPage = new InventoryPage(this.driver);
  await inventoryPage.removeFirstProductFromCart();
});

Then('the cart badge should show 1', async function (this: MobileWorld) {
  const inventoryPage = new InventoryPage(this.driver);
  const count = await inventoryPage.getCartBadgeCount();
  assert(count === 1, `Cart badge should show 1, but got ${count}`);
});

Then('the cart badge should not be visible', async function (this: MobileWorld) {
  const inventoryPage = new InventoryPage(this.driver);
  const visible = await inventoryPage.isCartBadgeVisible();
  assert(!visible, 'Cart badge should not be visible');
});

Given('I have added the first product to cart', async function (this: MobileWorld) {
  const inventoryPage = new InventoryPage(this.driver);
  await inventoryPage.addFirstProductToCart();
  const count = await inventoryPage.getCartBadgeCount();
  assert(count >= 1, 'Product should be added to cart');
});
